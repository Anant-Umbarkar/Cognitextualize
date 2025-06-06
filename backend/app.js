import createError from 'http-errors'; // Module for handling HTTP errors
import express from 'express'; // Express framework
import path from 'path'; // Module for handling file paths
import cookieParser from 'cookie-parser'; // Middleware for parsing cookies
import logger from 'morgan'; // Middleware for logging requests
import cors from 'cors'; // CORS middleware
import mongoose from 'mongoose'; // MongoDB ODM (Object Data Modeling)

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Importing route handlers
import fileRouter from './routes/file.js';
import usersRouter from './routes/users.js';


var app = express(); // Initialize Express application

// Define the server port, using environment variable if available
let PORT = process.env.PORT || 80;

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS with specified options
app.use(cors(corsOptions));
app.options('*', cors()); // Allow preflight requests for all routes

// Connect to MongoDB
mongoose.connect("mongodb+srv://anantkumarumbarkar:Umbarkar1234@cluster0.susii7h.mongodb.net/cognitextualize?retryWrites=true&w=majority&appName=Cluster0");

// Handle MongoDB connection events
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit the application if there's a connection error
});
db.once('open', () => {
  console.log('Connected to MongoDB');
  
  // Set up view engine
  app.set('views', path.join(__dirname, 'views')); // Set views directory
  app.set('view engine', 'jade'); // Set view engine to Jade

  // Middleware setup
  app.use(logger('dev')); // Log requests
  app.use(express.json()); // Parse JSON request bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
  app.use(cookieParser()); // Parse cookies
  app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

  // Define route handlers
  app.use('/', fileRouter); // Main file handling route
  app.use('/users', usersRouter); // User-related routes

  // Catch 404 errors and forward to error handler
  // app.use(function (req, res, next) {
  //   next(createError(404));
  // });

  // Error handling middleware
  // app.use(function (err, req, res, next) {
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  //   res.status(err.status || 500);
  //   res.render('error', { title: 'Error', message: err.message, error: err });
  // });

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});

export default app; // Export the Express app for external usage