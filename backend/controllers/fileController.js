import path from "path";
import PaperInfo from "../Model/PaperInfo.js";
import Evaluate from "../core/evaluate/evaluate.js";
import fs from "fs";
import { csvToJson } from "../core/CSV_2_Json/program.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import { spawn } from "child_process";
// import { Structurize } from "../core/Regex/Regex.js";
// import { createObjectCsvWriter } from "csv-writer";
// import XLSX from "xlsx";
// import {fileConverter} from "../core/FileToText/Converter.js";


// Function to handle file conversion and saving to database
async function convertToText (req, res) {
    // Check if a file is uploaded
    if (!req.file) {
        res.status(500).send("Error while uploading file");
        return;
    }

    const fileType = req.file.mimetype;  // Get the MIME type of the uploaded file
    const inputFileName = req.file.originalname;  // Get the original file name

    const timestamp = Date.now();  // Generate timestamp for the output file
    const outputFileName = `${path.basename(inputFileName, path.extname(inputFileName))}_${timestamp}.txt`;  // Generate output file name
    const outputFilePath = path.join(__dirname, '../Converted', outputFileName);  // Set the output file path

    try {
        // Determine conversion logic based on file type
        // switch (fileType) {
        //     case "application/pdf":
        //         await fileConverter.convertPDFToText(req.file.path, outputFilePath);  // Convert PDF to text
        //         break;
        //     case "text/csv":
        //         await fileConverter.convertCSVToText(req.file.path, outputFilePath);  // Convert CSV to text
        //         break;
        //     case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        //         await fileConverter.convertXLSXToText(req.file.path, outputFilePath);  // Convert XLSX to text
        //         break;
        //     case "image/jpeg":
        //     case "image/png":
        //         await fileConverter.convertImageToText(req.file.path, outputFilePath);  // Convert image to text
        //         break;
        //     case "application/msword":
        //     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        //         await fileConverter.convertWordToText(req.file.path, outputFilePath);  // Convert Word to text
        //         break;
        //     default:
        //         res.send("Invalid File Format");  // Handle invalid file format
        //         return;
        // }

        // Save the data to the database after conversion
        const data = await saveToDB(req.body.FormData, req.file.path, req.body.ModuleInfo, req.body.COPref);

        // Delete the uploaded file after processing
        fs.unlink(req.file.path, (err) => {
            if (err) console.error(`Error deleting uploaded file: ${err.message}`);
            else console.log("Uploaded file deleted successfully.");
        });

        // Delete the output file after processing
        // fs.unlink(outputFilePath, (err) => {
        //     if (err) console.error(`Error deleting output file: ${err.message}`);
        //     else console.log("Output file deleted successfully.");
        // });

        // Send the result back to the client
        res.send(data);
    } catch (error) {
        // Catch errors and send an error response
        console.error('Error converting file or saving to DB:', error);
        res.status(500).send("Error converting file or saving to DB");
    }
};

// Function to save converted data to the database
const saveToDB = async (FormData, filepath, ModuleInfo, COPref) => {
    try {
        // Parse the preferences, sequence, form data, and module info from the request body
        let pre_data = JSON.parse(COPref);
        let structurizedData=csvToJson(filepath,"|")   // Structure the data after conversion
        // console.log("------Data------\n",structurizedData,"\n------end------")
        const timestamp = Date.now();
        const parsedFormData = JSON.parse(FormData);
        let moduleInfo = JSON.parse(ModuleInfo);

        // console.log("structurized: ",structurizedData)

        // Evaluate the structured data based on the provided form data, sequence, and preferences
        let result = Evaluate(structurizedData, pre_data, moduleInfo);


         // SAVE TO CSV
        
        // const csvFilePath = path.join(__dirname, '../Result', `${parsedFormData["College Name"]}_${timestamp}.csv`);
        // const csvWriter = createObjectCsvWriter({
        //     path: csvFilePath,
        //     header: Object.keys(structurizedData[0]).map(key => ({ id: key, title: key })),
        // });
        // await csvWriter.writeRecords(structurizedData);
        // console.log('CSV file written successfully');


        // SAVE TO XLSX

        // const xlsxFilePath = path.join(__dirname, '../Result', `${parsedFormData["College Name"]}_${timestamp}.xlsx`);
        // const ws = XLSX.utils.json_to_sheet(structurizedData);
        // const wb = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        // XLSX.writeFile(wb, xlsxFilePath);
        // console.log('XLSX file written successfully');

        // Save the paper data to MongoDB
        const paper = new PaperInfo({
            "College Name": parsedFormData["College Name"],
            "Branch": parsedFormData.Branch,
            "Year Of Study": parsedFormData["Year Of Study"],
            "Semester": parsedFormData.Semester,
            "Course Name": parsedFormData["Course Name"],
            "Course Code": parsedFormData["Course Code"],
            "Course Teacher": parsedFormData["Course Teacher"],
            "No. Of Questions": parsedFormData["No. Of Questions"],
            "Total Marks": parsedFormData["Total Marks"],
            "Collected Data": structurizedData,  // Store the structured data
        });

        // Save the paper information to the database
        await paper.save();

        // Return the evaluation result after saving to the database
        return result;
    } catch (error) {
        // Catch any errors during the database save process
        console.error('Error saving to MongoDB:', error);
        return [];
    }
};


export default convertToText;