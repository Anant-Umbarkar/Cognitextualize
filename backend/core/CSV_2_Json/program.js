import fs from 'fs';
import path from 'path';


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
        "distill", "interrogate", "outline","prove"
    ],
    "evaluate": [
        "evaluate", "judge", "assess", "appraise", "critique", "criticize", "discern", 
        "discriminate", "consider", "weigh", "measure", "estimate", "rate", "grade", 
        "score", "rank", "test", "appraise", "recommend", "decide", "conclude", "argue", 
        "debate", "justify", "persuade", "defend", "support", "summarize", "editorialize", 
        "predict", "distinguish", "prioritize", "validate", "choose", "mediate", 
        "approve", "verify", "moderate", "determine", "examine", "assure", "resolve", 
        "question", "certify"
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


function findBloomLevel(word) {
    for (const level in bloomsTaxonomyVerbs) {
        if (bloomsTaxonomyVerbs[level].includes(word)) {
            return level;
        }
    }
    return "Not Found";
}

function getBloomLevelIndex(level) {
    return bloomLevels[level] || 0; // Return 0 for "Not Found"
}

function FindBloomLevelsInText(text){

    // console.log("###  Question: ",text)
    const words = text.split(/\W+/); // Split by word characters
        const wordResult = [];
        const levelResult = [];
        let highestLevel = 0; // Initialize highest level
      
        for (const word of words) {
          const level = findBloomLevel(word.toLowerCase());
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

export function csvToJson(filePath, delimiter = ',') {
  const csv = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(delimiter).map(h => h.trim());

  const json = lines.slice(1).map(line => {
    const values = line.split(delimiter).map(v => v.trim());
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });

//   console.log(json)

  const StructurizedData = [];

  json.forEach(item=>{
    // console.log("$$$ Question: ",item)
    console.log(item)
    const bloom = FindBloomLevelsInText(item.Question);
    let structuredItem = item;
    structuredItem["Bloom's Verbs"] = bloom.words;
    structuredItem["Bloom's Taxonomy Level"] = bloom.highestLevel;

    // Clean question text by removing numbering prefixes
    structuredItem.Question = item.Question.replace(/^[\s\S]*?\)\s*/, "");
    StructurizedData.push(structuredItem);
  })

  return StructurizedData;
}
