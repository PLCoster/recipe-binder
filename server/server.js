// Import required node modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Import express routers
const apiRouter = require('./routes/api');

// Create express App
const app = express();

// Connect to MongoDB Database via Mongoose:
const MONGO_URI = 'mongodb+srv://SWAdmin:bnOeCDErmUl1C4DM@cluster0.tf5mb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'cs-solo-db',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// Serve webpack files from build folder
app.use('/build', express.static(path.join(__dirname, '../build')));

// Route Handlers
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/login', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
});

app.get('/signup', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/signup.html'));
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
  const errorObj = { ...defaultErr, err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start App listening on port 3000
app.listen(3000, () => { console.log('Listening on port 3000'); });
