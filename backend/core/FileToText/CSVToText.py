import sys
import csv

def csv_to_text(csv_file, output_file):
    text = ""
    with open(csv_file, 'r', newline='') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            text += ','.join(row) + '\n'
    
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python ocr_script.py <image_path>")
    else:
        file_path = sys.argv[1]
        output_path = sys.argv[2]
        csv_to_text(file_path,output_path)