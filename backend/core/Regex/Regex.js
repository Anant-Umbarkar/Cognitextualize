import fs from "fs"

// Bloom's Taxonomy configuration objects
// Maps verbs to their respective cognitive levels
    const bloomsTaxonomyVerbs = {
        "remember": [
            "recall", "give", "reproduce", "memorize", "define", "identify", "describe", "label", 
            "list", "name", "state", "match", "recognize", "examine", "draw", "write", "locate", 
            "quote", "read", "record", "repeat", "retell", "visualize", "copy", "duplicate", 
            "enumerate", "listen", "observe", "omit", "tabulate", "tell", "what", "why", "when", 
            "where", "which", "retrieve", "outline", "highlight", "recapitulate", "sketch", 
            "remember", "scan", "find", "sort"
        ],
        "understand": [
            "explain", "how", "interpret", "paraphrase", "summarize", "classify", "compare", 
            "differentiate", "discuss", "distinguish", "extend", "predict", "associate", 
            "contrast", "convert", "demonstrate", "estimate", "identify", "infer", "relate", 
            "restate", "translate", "generalize", "group", "illustrate", "judge", "observe", 
            "order", "report", "represent", "research", "review", "rewrite", "show", "trace", 
            "exemplify", "clarify", "describe", "sequence", "diagram", "expand", "categorize", 
            "validate", "deduce", "elaborate", "summarize", "articulate", "simplify", "outline"
        ],
        "apply": [
            "solve", "apply", "modify", "use", "calculate", "change", "demonstrate", "experiment", 
            "relate", "show", "complete", "manipulate", "practice", "simulate", "transfer", 
            "implement", "illustrate", "utilize", "execute", "operate", "integrate", "adapt", 
            "choose", "develop", "organize", "assemble", "map", "model", "activate", "test", 
            "practice", "prepare", "configure", "construct"
        ],
        "analyze": [
            "analyze", "compare", "classify", "contrast", "distinguish", "infer", "separate", 
            "categorize", "differentiate", "correlate", "deduce", "devise", "dissect", 
            "estimate", "evaluate", "break down", "organize", "scrutinize", "investigate", 
            "deconstruct", "diagnose", "probe", "prioritize", "interpret", "inspect", 
            "quantify", "diagram", "sequence", "map", "trace", "detect", "justify", 
            "distill", "interrogate", "outline"
        ],
        "evaluate": [
            "evaluate", "judge", "assess", "appraise", "critique", "criticize", "discern", 
            "discriminate", "consider", "weigh", "measure", "estimate", "rate", "grade", 
            "score", "rank", "test", "appraise", "recommend", "decide", "conclude", "argue", 
            "debate", "justify", "persuade", "defend", "support", "summarize", "editorialize", 
            "predict", "distinguish", "prioritize", "validate", "choose", "mediate", 
            "approve", "verify", "moderate", "determine", "examine", "assure", "resolve", 
            "question", "certify","prove"
        ],
        "create": [
            "design", "compose", "create", "plan", "combine", "formulate", "invent", 
            "hypothesize", "substitute", "compile", "construct", "develop", "generalize", 
            "integrate", "modify", "organize", "prepare", "produce", "rearrange", "rewrite", 
            "adapt", "arrange", "assemble", "choose", "collaborate", "facilitate", 
            "imagine", "intervene", "manage", "originate", "propose", "simulate", 
            "solve", "support", "test", "validate", "innovate", "brainstorm", 
            "engineer", "devise", "generate", "compose", "invent", "orchestrate", 
            "program", "construct", "synthesize", "refine", "execute", "facilitate"
        ]
    };
    
    const bloomsTaxonomyLevels = {
        "remember": "Knowledge",
        "understand": "Comprehension",
        "apply": "Application",
        "analyze": "Analysis",
        "evaluate": "Evaluation",
        "create": "Synthesis",
    };

    let bloomLevels = {
        "remember": 1,
        "understand": 2,
        "apply": 3,
        "analyze": 4,
        "evaluate": 5,
        "create": 6,
    };

    // Helper function to find Bloom's level for a given word
    function findBloomLevel(word) {
        for (const level in bloomsTaxonomyVerbs) {
            if (bloomsTaxonomyVerbs[level].includes(word)) {
                return level;
            }
        }
        return "Not Found";
    }
    
    // Main function to analyze text for Bloom's taxonomy verbs
    exports.FindBloomLevelsInText = (text) => {
        const words = text.split(/\W+/); // Split by word characters
        const wordResult = [];
        const levelResult = [];
        let highestLevel = 0; // Initialize highest level
      
        for (const word of words) {
          const level = findBloomLevel(word.toLowerCase());

        //   if(level=="Not Found"){
        //     const levelIndex=1;
        //     wordResult.push(word);
        //     levelResult.push(levelIndex);
        //     highestLevel = Math.max(highestLevel, levelIndex);
        //   }

          if (level !== "Not Found") {
            const levelIndex = getBloomLevelIndex(level);
            wordResult.push(word);
            levelResult.push(levelIndex);
            highestLevel = Math.max(highestLevel, levelIndex); // Update highest level
          }
        }
      
        const wordsString = wordResult.join(", ");
        const levelsString = levelResult.join(", ");
      
        return { words: wordsString, levels: levelsString, highestLevel };
      };
      
      function getBloomLevelIndex(level) {
        
        return bloomLevels[level] || 0; // Return 0 for "Not Found"
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
            "CO": 'CO\\s*\\d'
            // "CO": 'CO\d'
        };

        const seq = JSON.parse(data);
        seq.forEach((item, index) => {
            // Handle different field types to create appropriate regex patterns
            if (item.FieldType == 'QN') {
                 // Question number patterns
                RegexData.push([item.FieldTitle,regex[item.FieldType][item.DenotedBy]]);
            } else if(item.FieldType=='MO'){
                // Module regex pattern
                let modRegex=new RegExp(/Module\s+\d+/i);
                RegexData.push([item.FieldTitle,modRegex]);
            } else if (item.FieldType == 'QT') {
                // Question type patterns from DenotedBy field
                const arrayOfStrings = item.DenotedBy.split(" "); // Replace with your array of strings

                // Escaping each string and joining them with the | operator for alternation
                const regexPattern = new RegExp(arrayOfStrings.map((input)=>{
                        return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }).join('|'));
                RegexData.push([item.FieldTitle,regexPattern]);
            } else if (item.FieldType == 'CO') {
                 // Course outcome pattern  
                RegexData.push([item.FieldTitle,regex[item.FieldType]]);
            }else if (item.FieldType == 'Mrk') {
                 // Marks pattern with context-aware construction   
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
                // Default question content pattern
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
        console.log(RegexData)
        return RegexData;
    }


// Question extraction module
exports.QuestionData = (data, inputFile) => {
    const regexData = this.GetRegex(data);
    const text = fs.readFileSync(inputFile, 'utf8');
    const previousFieldPattern = new RegExp(regexData[0][1], 'g');
    const previousFieldMatches = [...text.matchAll(previousFieldPattern)];
    
    // Split text into individual questions using regex boundaries
    const questions = [];
    previousFieldMatches.forEach((match, i) => {
        const startIndex = match.index;
        const endIndex = i < previousFieldMatches.length - 1 
            ? previousFieldMatches[i + 1].index 
            : text.length;
        questions.push(text.slice(startIndex, endIndex).trim());
    });

    return { questions, regexData };
};

// Main processing function to structure question data
exports.Structurize = (data, inputFile) => {
    return new Promise((resolve, reject) => {
        try {
            const { questions, regexData } = this.QuestionData(data, inputFile);
            const StructurizedData = [];

            questions.forEach((item) => {
                let structuredItem = {};

                // Apply all regex patterns to extract structured data
                regexData.forEach(([fieldTitle, pattern]) => {
                    const match = item.match(pattern);
                    structuredItem[fieldTitle] = match 
                        ? (match[1] ?? match[0]) 
                        : null;
                });

                // Add Bloom's taxonomy analysis
                const bloom = this.FindBloomLevelsInText(item);
                structuredItem["Bloom's Verbs"] = bloom.words;
                structuredItem["Bloom's Taxonomy Level"] = bloom.highestLevel;

                // Clean question text by removing numbering prefixes
                structuredItem.Q = item.replace(/^[\s\S]*?\)\s*/, "");

                StructurizedData.push(structuredItem);
            });

            resolve(StructurizedData);
        } catch (error) {
            reject(error);
        }
    });
};
