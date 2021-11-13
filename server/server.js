// Import required node modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotEnv = require('dotenv').config();

// Import express routers
const apiRouter = require('./routes/api');

// Import controllers
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

// Create express App
const app = express();

// Connect to MongoDB Database via Mongoose:
// const MONGO_URI =
//   'mongodb+srv://SWAdmin:bnOeCDErmUl1C4DM@cluster0.tf5mb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.tf5mb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

console.log('MONGO_URI IS: ', MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// Render ejs pages correctly when using res.render on ejs file
app.set('view engine', 'ejs');

// Parse body and querystrings of requests sent to server:
app.use('/public', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // -> parses cookies onto req.cookies

// Serve webpack files from build folder
app.use('/build', express.static(path.join(__dirname, '../build')));

// Route Handlers
app.use('/api', apiRouter);

// Login, Logout and SignUp Routes
app.get('/login', (req, res) => {
  res.render('./../client/ejs/login', { error: 'OMG HUGE ERROR' });
});

app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    // If login is successful redirect to main app page:
    res.redirect('/');
  }
);

app.get('/signup', (req, res) => {
  res.render('./../client/ejs/signup', { error: 'OMG HUGE ERROR' });
});

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    // Redirect user to main app page once signed up:
    res.redirect('/');
  }
);

app.get(
  '/logout',
  sessionController.validateSession,
  sessionController.deleteSession,
  (req, res) => {
    res.redirect('/login');
  }
);

// Main App route only accessible if logged in
app.get('/', sessionController.validateSession, (req, res) => {
  console.log('SENDING MAIN APP PAGE');
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// 404 - Invalid Route Handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Express internal server error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start App listening on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
