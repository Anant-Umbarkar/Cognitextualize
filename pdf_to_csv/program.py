import pdfplumber
import re
import csv

# Load PDF and extract text
with pdfplumber.open("./Samples/Question paper 6/Computer Algorithm.pdf") as pdf:
    full_text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])

# Split by question blocks, separating Q number and subquestion
question_blocks = re.split(r'\n?(Q\d)\s*([A-Da-d]\))', full_text)
questions = []

# Rejoin identifiers with blocks
for i in range(1, len(question_blocks), 3):
    main_q = question_blocks[i].strip()      # Q1
    sub_q = question_blocks[i+1].strip()     # A)
    block = question_blocks[i+2].strip()     # Rest of the question text

    # Extract question type (e.g., Obj, An-S, Desc, An-M)
    q_type = re.search(r'^(Obj|An-S|Desc|An-M)', block)
    q_type = q_type.group(1) if q_type else ""

    # Extract marks
    marks = re.search(r'\b(\d+)\s*CO\d\b', block)
    marks = marks.group(1) if marks else ""

    # Extract Course Outcome
    co = re.search(r'\bCO\d\b', block)
    co = co.group(0) if co else ""

    # Extract Module
    module = re.search(r'Module\s*\d+', block, re.IGNORECASE)
    module = module.group(0) if module else ""

    # Clean question text
    question_text = re.sub(r'(Obj|An-S|Desc|An-M)\s*', '', block, count=1)
    question_text = re.sub(r'\b\d+\s*CO\d\b.*', '', question_text)
    question_text = question_text.strip().replace('\n', ' ')

    questions.append({
        "Question_No": main_q,
        "Subquestion": sub_q,
        "Type": q_type,
        "Question": question_text,
        "Marks": marks,
        "CO": co,
        "Module": module
    })

# Save to CSV with custom delimiter (pipe |)
with open("computer algorithm.csv", "w", newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["Question_No", "Subquestion", "Type", "Question", "Marks", "CO", "Module"], delimiter='|')
    writer.writeheader()
    writer.writerows(questions)

print("✅ iot.csv created successfully with custom delimiter '|'.")
print("Questions extracted:")
