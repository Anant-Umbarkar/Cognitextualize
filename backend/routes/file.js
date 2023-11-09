var express = require('express');
var router = express.Router();
let fileController=require("../controllers/fileController");
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    const fileExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
  },
});
const upload = multer({ storage: storage });

/* GET home page. */
router.post('/totext',upload.single('file'), fileController.convertToText);

module.exports = router;
