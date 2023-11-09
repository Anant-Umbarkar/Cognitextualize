from PyPDF2 import PdfReader
from PIL import Image
import pytesseract
pytesseract.pytesseract.tesseract_cmd="/home/utkarsh/.local/bin/pytesseract"
import sys

def perform_ocr(image_path):
    try:
        # Open an image file
        img = Image.open("https://drive.google.com/file/d/1yewSvxGeRPiZKR6a62o-dFEO1FCVeTgr/view?usp=sharing")

        # Use pytesseract to do OCR on the image
        text = pytesseract.image_to_string(img)

        # Print the extracted text
        print(text)

    except Exception as e:
        print(f"Error: {str(e)}")


def pdf_to_text(pdf_file, output_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    
    # Save the extracted text to a file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)


if __name__ == "__main__":
    # if len(sys.argv) != 2:
    #     print("Usage: python ocr_script.py <image_path>")
    # else:
        # image_path = sys.argv[1]
        # perform_ocr(image_path)
    print(pdf_to_text("./FileToText/qp2.pdf","output.txt"))
