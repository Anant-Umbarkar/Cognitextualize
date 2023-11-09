const path = require("path");
const { spawn } = require("child_process");
const {Structurize}=require("../core/Regex/Regex");
const PaperInfo = require("../Model/PaperInfo");
const { createObjectCsvWriter } = require("csv-writer");
const XLSX = require("xlsx");

exports.convertToText = async (req, res) => {
    if (!req.file) {
        res.status(500).send("Error while uploading file");
    }
    const fileType = req.file.mimetype;
    const inputFileName = req.file.originalname; // Get the name of the input file

    // Generate a timestamp to make the filename unique
    const timestamp = Date.now();

    // Construct the full path to the output text file with a unique filename
    const outputFileName = `${path.basename(inputFileName, path.extname(inputFileName))}_${timestamp}.txt`;
    const outputFilePath = path.join(__dirname, '../Converted', outputFileName);

    // switch between types to extract file to text
    let childPython;
    switch (fileType) {
        case "application/pdf": {
            childPython = spawn('python', ["core/FileToText/PdfToText.py", req.file.path, outputFilePath]);
            break;
        }
        case "text/csv": {
            childPython = spawn('python', ["core/FileToText/CSVToText.py", req.file.path, outputFilePath]);
            break;
        }
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
            childPython = spawn('python', ["core/FileToText/XlsxToText.py", req.file.path, outputFilePath]);
            break;
        }
        case "image/jpeg":
        case "image/png": {
            childPython = spawn('python', ["core/FileToText/ImageToText.py", req.file.path, outputFilePath]);
            break;
        }
        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
            console.log("Word it is")
            childPython = spawn('python', ["core/FileToText/WordToText.py", req.file.path, outputFilePath]);
            break;
        }
        default: {
            console.log("Not Valid");
        }
    }

    
    // event listeners
    if (childPython) {
        childPython.stdout.on("data", (data) => {
          console.log(`fol data ${data}`);
          const structurizedData = Structurize(req.body.Sequence, outputFilePath);
          const parsedFormData = JSON.parse(req.body.FormData);
    
          // Convert structurizedData to CSV
          const csvFilePath = path.join(__dirname, '../Result', `${parsedFormData["College Name"]}_${timestamp}.csv`);
          const csvWriter = createObjectCsvWriter({
            path: csvFilePath,
            header: Object.keys(structurizedData[0]).map(key => ({ id: key, title: key })),
          });
          csvWriter.writeRecords(structurizedData)
            .then(() => console.log('CSV file written successfully'));

    
            // Convert structurizedData to XLSX
        const xlsxFilePath = path.join(__dirname, '../Result', `${parsedFormData["College Name"]}_${timestamp}.xlsx`);
        const ws = XLSX.utils.json_to_sheet(structurizedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, xlsxFilePath);
        console.log('XLSX file written successfully');


          // Save to MongoDB
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
            "Time in Hrs": parsedFormData["Time in Hrs"],
            Sequence: req.body.Sequence,
            "Collected Data": structurizedData,
          });
    
          paper.save()
            .then(() => {
              console.log('Data saved to MongoDB');
              res.send(structurizedData);
            })
            .catch((error) => {
              console.error('Error saving to MongoDB:', error);
              res.send([]);
            });
        });

        childPython.stderr.on("data", (data) => {
            console.log(`error: ${data}`);
        });

        childPython.on("close", (code) => {
            // res.send(Structurize(req.body,outputFilePath));
        });
    } else {
        console.log("Child process is undefined.");
    }

    // res.send("working");
};
