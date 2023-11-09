import sys
from docx import Document

def word_to_text(word_file, output_file):
    doc = Document(word_file)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'
    
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python ocr_script.py <image_path>")
    else:
        file_path = sys.argv[1]
        output_path = sys.argv[2]
        word_to_text(file_path,output_path)