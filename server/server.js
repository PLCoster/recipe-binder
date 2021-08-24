// Import required node modules
const express = require('express');
const path = require('path');

// Create express App
const app = express();

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Start App listening on port 3000
app.listen(3000, () => { console.log('Listening on port 3000') });
