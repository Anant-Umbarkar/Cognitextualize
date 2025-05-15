import express from 'express';
import fileController from '../controllers/fileController.js';
import multer from 'multer';
import path from 'path';
import auth from '../Middleware/auth.js';

const router = express.Router();

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
