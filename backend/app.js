var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose

var fileRouter = require('./routes/file');
var usersRouter = require('./routes/users');

var app = express();

let PORT = process.env.PORT || 80;

const corsOptions = {
  origin: ['https://cognitextualize-dh07a07sj-utkarshmhubs-projects.vercel.app', 'https://cognitextualize.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors());


// Connect to MongoDB
mongoose.connect('mongodb+srv://UtMandape:1BGR3QO2fcFmFHXw@cluster0.akibk.mongodb.net/CogniTextualize?retryWrites=true&w=majority');

// Check connection and start the server only if connected successfully
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit the application if there's a connection error
});
db.once('open', () => {
  console.log('Connected to MongoDB');
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', fileRouter);
  app.use('/users', usersRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // Set locals, providing error details only in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Render the error page with a title
    res.status(err.status || 500);
    res.render('error', {
      title: 'Error', // Provide a title for the error page
      message: err.message,
      error: err,
    });
  });
  

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});

module.exports = app;
