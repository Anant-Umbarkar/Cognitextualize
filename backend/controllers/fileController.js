const path = require("path");
const { spawn } = require("child_process");
const { Structurize } = require("../core/Regex/Regex");
const PaperInfo = require("../Model/PaperInfo");
const { createObjectCsvWriter } = require("csv-writer");
const XLSX = require("xlsx");
const fileConverter = require('../core/FileToText/Converter');
const { Evaluate } = require("../core/evaluate/evaluate");

exports.convertToText = async (req, res) => {
    if (!req.file) {
        res.status(500).send("Error while uploading file");
        return;
    }
    const fileType = req.file.mimetype;
    const inputFileName = req.file.originalname;

    const timestamp = Date.now();
    const outputFileName = `${path.basename(inputFileName, path.extname(inputFileName))}_${timestamp}.txt`;
    const outputFilePath = path.join(__dirname, '../Converted', outputFileName);

    try {
        switch (fileType) {
            case "application/pdf":
                await fileConverter.convertPDFToText(req.file.path, outputFilePath);
                break;
            case "text/csv":
                await fileConverter.convertCSVToText(req.file.path, outputFilePath);
                break;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                await fileConverter.convertXLSXToText(req.file.path, outputFilePath);
                break;
            case "image/jpeg":
            case "image/png":
                await fileConverter.convertImageToText(req.file.path, outputFilePath);
                break;
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                await fileConverter.convertWordToText(req.file.path, outputFilePath);
                break;
            default:
                res.send("Invalid File Format");
                return;
        }

        const data = await saveToDB(req.body.Sequence, req.body.FormData, outputFilePath);
        res.send(data);
    } catch (error) {
        console.error('Error converting file or saving to DB:', error);
        res.status(500).send("Error converting file or saving to DB");
    }
};

const saveToDB = async (Sequence, FormData, outputFilePath) => {
    try {
        // key = actually CO belongs to
        // 
        let pre_data={
            1:{
                level:3,
                score:30,
            },
            2:{
                level:1,
                score:30,
            },
            3:{
                level:4,
                score:40,
            },            
        }
        const structurizedData=await Structurize(Sequence,outputFilePath);
        const timestamp = Date.now();
        const parsedFormData = JSON.parse(FormData);
        let sequence=JSON.parse(Sequence)
        // console.log(structurizedData)

        // Evaluate
        Evaluate(parsedFormData,structurizedData,sequence,pre_data)

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

        // const paper = new PaperInfo({
        //     "College Name": parsedFormData["College Name"],
        //     "Branch": parsedFormData.Branch,
        //     "Year Of Study": parsedFormData["Year Of Study"],
        //     "Semester": parsedFormData.Semester,
        //     "Course Name": parsedFormData["Course Name"],
        //     "Course Code": parsedFormData["Course Code"],
        //     "Course Teacher": parsedFormData["Course Teacher"],
        //     "No. Of Questions": parsedFormData["No. Of Questions"],
        //     "Total Marks": parsedFormData["Total Marks"],
        //     "Time in Hrs": parsedFormData["Time in Hrs"],
        //     Sequence: Sequence,
        //     "Collected Data": structurizedData,
        // });
        // console.log(structurizedData)
        // await paper.save();
        // console.log('Data saved to MongoDB');
        return structurizedData;
    } catch (error) {
        console.error('Error saving to MongoDB:', error);
        return [];
    }
};
