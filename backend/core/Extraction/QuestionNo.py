import re
import sys

# Open the file for reading
with open(sys.argv[1], 'r') as file:
    text = file.read()
  
specific_alphabet = sys.argv[2]  # Replace with your specific alphabet

# Use a regular expression to extract the desired pattern (specific alphabet + integer within the specified range)
pattern = rf'{specific_alphabet}(?:[1-9]|10)'
question_numbers = re.findall(pattern, text)

# Print the extracted and filtered question numbers
print(question_numbers)
