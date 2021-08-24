// Import required node modules
const express = require('express');
const path = require('path');

// Create express App
const app = express();

// Serve webpack files from build folder
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/login', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
});

app.get('/signup', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/signup.html'));
});

// Start App listening on port 3000
app.listen(3000, () => { console.log('Listening on port 3000') });
