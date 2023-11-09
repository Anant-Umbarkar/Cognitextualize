import openpyxl
import sys

def xlsxtotext(xlsx_file_path,output_file_path):
    # Open the XLSX file
    workbook = openpyxl.load_workbook(xlsx_file_path)

    # Select a specific worksheet or the default one (e.g., the first sheet)
    worksheet = workbook.active

    # Initialize a variable to store the extracted text
    extracted_text = ''

    # Iterate through the rows and cells to extract text
    for row in worksheet.iter_rows():
        for cell in row:
            cell_value = cell.value
            if cell_value is not None:
                # Convert cell content to text and append it to the extracted_text
                extracted_text += str(cell_value) + ' '

    # Close the workbook
    workbook.close()

    # Write the extracted text to the text file
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        output_file.write(extracted_text)

if __name__ == "__main__":
    # if len(sys.argv) != 2:
    #     print("Usage: python ocr_script.py <image_path>")
    # else:
        # image_path = sys.argv[1]
        # perform_ocr(image_path)
    print(xlsxtotext(sys.argv[1],sys.argv[2]))
