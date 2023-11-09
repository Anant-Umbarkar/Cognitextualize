import re
from prettytable import PrettyTable

# Define Bloom's Taxonomy verbs and their synonyms
blooms_taxonomy_verbs = {
    "remember": ["recall", "give", "reproduce", "memorize", "define", "identify", "describe", "label", "list", "name", "state", "match", "recognize", "examine", "draw", "write", "locate", "quote", "read", "record", "repeat", "retell", "visualize", "copy", "duplicate", "enumerate", "listen", "observe", "omit", "tabulate", "tell", "what", "why", "when", "where", "which"],
    "understand": ["explain", "how", "interpret", "paraphrase", "summarize", "classify", "compare", "differentiate", "discuss", "distinguish", "extend", "predict", "associate", "contrast", "convert", "demonstrate", "estimate", "identify", "infer", "relate", "restate", "translate", "generalize", "group", "illustrate", "judge", "observe", "order", "report", "represent", "research", "review", "rewrite", "show", "trace"],
    "apply": ["solve", "apply", "modify", "use", "calculate", "change", "demonstrate", "experiment", "relate", "show", "complete", "manipulate", "practice", "simulate", "transfer"],
    "analyze": ["analyze", "compare", "classify", "contrast", "distinguish", "infer", "separate", "categorize", "differentiate", "correlate", "deduce", "devise", "dissect", "estimate", "evaluate"],
    "evaluate": ["evaluate", "judge", "assess", "appraise", "appraise", "critique", "criticize", "discern", "discriminate", "consider", "weigh", "measure", "estimate", "rate", "grade", "score", "rank", "test", "appraise", "recommend", "decide", "conclude", "argue", "debate", "justify", "persuade", "defend", "support", "summarize", "editorialize", "predict", "distinguish"],
    "create": ["design", "compose", "create", "plan", "combine", "formulate", "invent", "hypothesize", "substitute", "compile", "construct", "develop", "generalize", "integrate", "modify", "organize", "prepare", "produce", "rearrange", "rewrite", "adapt", "arrange", "assemble", "choose", "collaborate", "facilitate", "imagine", "intervene", "manage", "originate", "propose", "simulate", "solve", "support", "test", "validate"],
}

# Define the Bloom's Taxonomy level for each category
blooms_taxonomy_levels = {
    "remember": "Knowledge",
    "understand": "Comprehension",
    "apply": "Application",
    "analyze": "Analysis",
    "evaluate": "Evaluation",
    "create": "Synthesis",
}

def extract_blooms_taxonomy_level(verb):
    for level, verbs in blooms_taxonomy_verbs.items():
        if verb in verbs:
            return blooms_taxonomy_levels[level]
    return "Unknown"

def extract_blooms_taxonomy_verbs(question_text):
    verbs = []
    question_text_lower = question_text.lower()
    for verb_category, synonyms in blooms_taxonomy_verbs.items():
        for synonym in synonyms:
            if synonym.lower() in question_text_lower:
                verbs.append(synonym)
    return ", ".join(verbs)

def extract_question_info(input_file, output_file):
    with open(input_file, "r") as file:
        text = file.read()

    question_pattern = re.compile(
        r'(Q\d+)\s+([A-Z])\)\s+(.*?)\s*(\d+)\s*CO(\d+)\s*Module\s*(\d+)', re.DOTALL)
    matches = question_pattern.findall(text)

    with open(output_file, "w") as output:
        for match in matches:
            question_number, subquestion, question_text, marks, co, module = match
            question_number = f"{question_number} {subquestion}"
            output.write(
                f"Question: {question_number}\nMarks: {marks}\nCO: {co}\nModule: {module}\n\n")

# Usage: Call the function with the input file and output file names
input_file = sys.argv[1]
output_file = sys.argv[2]
extract_question_info(input_file, output_file)

def extract_questions(input_text):
    question_pattern = r'(?P<QuestionType>Obj|An-S|Desc|An-M)\s+(?P<QuestionNumber>Q\d+\s+[A-Z])\)\s*(?P<QuestionText>.*?)(?=(?:\s*Q\d+\s+[A-Z]|\Z|\d+\s*CO\d+ Module \d+))'
    matches = re.finditer(question_pattern, input_text, re.DOTALL)
    questions = []

    for match in matches:
        question_type = match.group('QuestionType')
        question_number = match.group('QuestionNumber')
        question_text = match.group('QuestionText').strip()

        blooms_verbs = extract_blooms_taxonomy_verbs(question_text)

        questions.append([question_type, question_number,
                         question_text, blooms_verbs])

    return questions

# Read the input from the 'output_text_file.txt' file
with open("output_text_file.txt", "r") as file:
    text = file.read()

questions = extract_questions(text)

question_info = {}
with open("que.txt", "r") as que_file:
    que_lines = que_file.read().split("\n\n")
    for que_info in que_lines:
        que_info_lines = que_info.strip().split("\n")
        if len(que_info_lines) >= 4:
            question_number = que_info_lines[0].replace("Question: ", "")
            marks = que_info_lines[1].replace("Marks: ", "")
            co = que_info_lines[2].replace("CO: ", "")
            module = que_info_lines[3].replace("Module: ", "")
            question_info[question_number] = (marks, co, module)

# Create a table to display the extracted data with an empty row after each subquestion
table = PrettyTable()
table.field_names = ["Question Type", "Question Number",
                     "Question Text", "Marks", "CO", "Module", "Bloom's Verbs", "Bloom's Taxonomy Level"]

for question in questions:
    question_type, question_number, question_text, blooms_verbs = question
    marks, co, module = question_info.get(question_number, ("", "", ""))
    
    # Split the verbs and get their Bloom's Taxonomy levels
    verb_levels = [extract_blooms_taxonomy_level(verb.strip()) for verb in blooms_verbs.split(', ')]
    
    table.add_row([question_type, question_number,
                  question_text, marks, co, module, blooms_verbs, ", ".join(verb_levels)])
    
    # Add an empty row after every subquestion
    if question_type in ("An-S", "An-M", "Desc", "Obj"):
        table.add_row(["", "", "", "", "", "", "", ""])

# Save the table to a text file
output_file = "output_questions.txt"
with open(output_file, "w") as file:
    file.write(str(table))