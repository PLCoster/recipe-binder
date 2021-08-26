const mongoose = require('mongoose');

/*
* sessionModel stores user sessions
* These expire after a given time, requiring user to log back in
*/
const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 1500, default: Date.now },
});

module.exports = mongoose.model('session', sessionSchema);
