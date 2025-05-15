var express = require('express');
var router = express.Router();
let fileController=require("../controllers/fileController");
const multer = require('multer');
const path = require('path');
const auth=require("../Middleware/auth")

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

// JWT secret
const JWT_SECRET = 'Cognitextualize@123';

/* GET home page. */
router.post('/totext',auth,upload.single('file'), fileController.convertToText);

module.exports = router;
