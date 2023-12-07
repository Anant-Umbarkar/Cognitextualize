const fs = require('fs');

const bloomsTaxonomyVerbs = {
    "remember": ["recall", "give", "reproduce", "memorize", "define", "identify", "describe", "label", "list", "name", "state", "match", "recognize", "examine", "draw", "write", "locate", "quote", "read", "record", "repeat", "retell", "visualize", "copy", "duplicate", "enumerate", "listen", "observe", "omit", "tabulate", "tell", "what", "why", "when", "where", "which"],
    "understand": ["explain", "how", "interpret", "paraphrase", "summarize", "classify", "compare", "differentiate", "discuss", "distinguish", "extend", "predict", "associate", "contrast", "convert", "demonstrate", "estimate", "identify", "infer", "relate", "restate", "translate", "generalize", "group", "illustrate", "judge", "observe", "order", "report", "represent", "research", "review", "rewrite", "show", "trace"],
    "apply": ["solve", "apply", "modify", "use", "calculate", "change", "demonstrate", "experiment", "relate", "show", "complete", "manipulate", "practice", "simulate", "transfer"],
    "analyze": ["analyze", "compare", "classify", "contrast", "distinguish", "infer", "separate", "categorize", "differentiate", "correlate", "deduce", "devise", "dissect", "estimate", "evaluate"],
    "evaluate": ["evaluate", "judge", "assess", "appraise", "appraise", "critique", "criticize", "discern", "discriminate", "consider", "weigh", "measure", "estimate", "rate", "grade", "score", "rank", "test", "appraise", "recommend", "decide", "conclude", "argue", "debate", "justify", "persuade", "defend", "support", "summarize", "editorialize", "predict", "distinguish"],
    "create": ["design", "compose", "create", "plan", "combine", "formulate", "invent", "hypothesize", "substitute", "compile", "construct", "develop", "generalize", "integrate", "modify", "organize", "prepare", "produce", "rearrange", "rewrite", "adapt", "arrange", "assemble", "choose", "collaborate", "facilitate", "imagine", "intervene", "manage", "originate", "propose", "simulate", "solve", "support", "test", "validate"],
  };
  
  const bloomsTaxonomyLevels = {
    "remember": "Knowledge",
    "understand": "Comprehension",
    "apply": "Application",
    "analyze": "Analysis",
    "evaluate": "Evaluation",
    "create": "Synthesis",
  };

  function findBloomLevel(word) {
    for (const level in bloomsTaxonomyVerbs) {
        if (bloomsTaxonomyVerbs[level].includes(word)) {
            return bloomsTaxonomyLevels[level];
        }
    }
    return "Not Found";
  }
  
  function findBloomLevelsInText(text) {
      const words = text.split(/\s+/);
      const wordResult = [];
      const levelResult = [];
  
      for (const word of words) {
          const level = findBloomLevel(word.toLowerCase());
          if (level !== "Not Found") {
              wordResult.push(word);
              levelResult.push(level);
          }
      }
  
      const wordsString = wordResult.join(", ");
      const levelsString = levelResult.join(", ");
  
      return { words: wordsString, levels: levelsString };
  }

exports.GetRegex = (data) => {
    let RegexData = [];
    const regex = {
        "QN": {
            "Q": 'Q\\d+(?![)])',
            "R": '[IVXLCDM]+\\)',
            "A": '[A-Z]\\)',
            "I": '\\d+\\)'
        },
        "CO": 'CO\\d+(?!\\w)'
    };

    const seq = JSON.parse(data);
    seq.forEach((item, index) => {
        if (item.FieldType == 'QN') {
            RegexData.push([item.FieldTitle,regex[item.FieldType][item.DenotedBy]]);
        } else if(item.FieldType=='MO'){
            let modRegex=new RegExp(/Module\s+\d+/i);
            RegexData.push([item.FieldTitle,modRegex]);
        } else if (item.FieldType == 'QT') {
            const arrayOfStrings = item.DenotedBy.split(" "); // Replace with your array of strings

            // Escaping each string and joining them with the | operator for alternation
            const regexPattern = new RegExp(arrayOfStrings.map((input)=>{
                    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }).join('|'));
            RegexData.push([item.FieldTitle,regexPattern]);
        } else if (item.FieldType == 'CO') {
            RegexData.push([item.FieldTitle,regex[item.FieldType]]);
        }else if (item.FieldType == 'Mrk') {
            let MrkRegex = '\\s*(\\d+)\\s*'; // Fix the regular expression syntax
            if (index > 0) {
                if (seq[index - 1].FieldType == 'QN') {
                    MrkRegex = regex['QN'][seq[index - 1].DenotedBy] + MrkRegex;
                } else if (seq[index - 1].FieldType == 'CO') {
                    MrkRegex = regex['CO'] + MrkRegex;
                }
            }

            // Access next element (if not the last one)
            if (index < seq.length - 1) {
                if (seq[index + 1].FieldType == 'QN' || seq[index + 1].FieldType == 'CO') {
                    if (seq[index + 1].FieldType == 'QN') {
                        MrkRegex = MrkRegex + regex['QN'][seq[index + 1].DenotedBy];
                    } else if (seq[index + 1].FieldType == 'CO') {
                        MrkRegex = MrkRegex + regex['CO'];
                    }
                }
            }
            RegexData.push([item.FieldTitle,MrkRegex]);
        } else {
            let QRegex = '([\s\S]*)/';
            if (index > 0) {
                if (seq[index - 1].FieldType == 'QN') {
                    QRegex = regex['QN'][seq[index - 1].DenotedBy] + QRegex;
                } else if (seq[index - 1].FieldType == 'CO') {
                    QRegex = regex['CO'] + QRegex;
                }
            }
            RegexData.push([item.FieldTitle,QRegex]);
        }
    });

    return RegexData;
}


exports.QuestionData = (data, inputFile) => {
    const regexData = this.GetRegex(data);
    console.log(regexData,data)
    let previousFieldRegex = regexData[0][1];

    const text = fs.readFileSync(inputFile, 'utf8');

    const previousFieldPattern = new RegExp(previousFieldRegex, 'g');
    const previousFieldMatches = [...text.matchAll(previousFieldPattern)];

    const questions = [];

    for (let i = 0; i < previousFieldMatches.length; i++) {
        const startIndex = previousFieldMatches[i].index;
        const endIndex = i < previousFieldMatches.length - 1 ? previousFieldMatches[i + 1].index : text.length;
        const questionText = text.slice(startIndex, endIndex).trim();
        questions.push(questionText);
    }

    return { questions, regexData };
}

exports.Structurize = (data, inputFile) => {
    const { questions, regexData } = this.QuestionData(data, inputFile);
    let StructurizedData = [];
    questions.forEach((item) => {
        let structuredItem = {};

        regexData.forEach((currentRegex) => {
            console.log(currentRegex)
            // Using a regular expression to extract the desired information
            let match = item.match(currentRegex[1])
            if(match==null) match=[item];
            if (match) {
                structuredItem[currentRegex[0]] = match[1]==undefined?match[0]:match[1]; // Store the matching value
            }
        });
        
        const bloom=findBloomLevelsInText(item);
        structuredItem["Bloom's Verbs"]=bloom.words;
        structuredItem["Bloom's Texonomy Level"]=bloom.levels;

        StructurizedData.push(structuredItem);
    });

    return StructurizedData;
}