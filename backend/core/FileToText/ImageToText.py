import sys
from PIL import Image
import pytesseract

def image_to_text(image_file, output_file):
    img = Image.open(image_file)
    text = pytesseract.image_to_string(img)

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python ocr_script.py <image_path>")
    else:
        file_path = sys.argv[1]
        output_path = sys.argv[2]
        image_to_text(file_path,output_path)