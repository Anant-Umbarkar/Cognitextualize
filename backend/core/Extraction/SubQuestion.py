import re
import sys

# Open the file for reading
with open(sys.argv[1], 'r') as file:
    text = file.read()

regex_map = {
    "R": r'[IVXLCDM]+\)',
    "I": r'\d+\)',
    "A": r'[A-Z]+\)'
}

subquestions = re.findall(regex_map[sys.argv[2]], text)

# Print the extracted subquestions
print(subquestions)
