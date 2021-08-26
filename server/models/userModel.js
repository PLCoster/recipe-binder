const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// set bcrypt salt parameter
const SALT_WORK_FACTOR = 10; // -> hashing salt + password 2^10 times

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  // Inside middleware 'this' is the model being saved
  // console.log('MONGOOSE MIDDLEWARE THIS:', this);
  const user = this;

  // Encrypt password with bcrypt before moving to next mongoose middleware
  // Generate bcrypt salt
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, passHash) {
    if (err) {
      return next(err);
    }
    user.password = passHash;
    return next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
