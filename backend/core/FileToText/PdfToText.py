from PyPDF2 import PdfReader
from PIL import Image
import sys

def pdf_to_text(pdf_file, output_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    
    # Save the extracted text to a file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python ocr_script.py <image_path>")
    else:
        file_path = sys.argv[1]
        output_path = sys.argv[2]
        print(file_path,output_path)
        pdf_to_text(file_path,output_path)
