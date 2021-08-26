const User = require('../models/userModel');

const userController = {};

/**
 * createUser - create and save a new user into the database
 * adds the new user object to req.body.authUser
 */
userController.createUser = (req, res, next) => {
  // Check for valid user details before creating user:
  const { password, username, email } = req.body;
  if (password && username && email) {
    User.create(req.body, (err, result) => {
      if (err) {
        res.render('./../client/signup', { error: 'Could not create new user, please try again' });
      } else {
        // Store some credentials on response
        res.locals.authUser = {
          id: result._id,
          username: result.username,
        };
        // Redirect Client to secret endpoint store
        return next();
      }
    });
  } else {
    // Otherwise signup info is not valid, return to page with error:
    res.render('./../client/signup', { error: 'Please complete all fields to signup' });
  }
};

/**
 * verifyUser - on login takes email and password
 * checks there is a matching valid user in the database
 * if there is authenticates the password against password stored in DB
 */
userController.verifyUser = async (req, res, next) => {
  console.log('Trying to verify user!', req.body);
  // Validate login information -> must have email and password:
  const { email, password } = req.body;
  if (!email || !password) {
    // If login info invalid return to login page
    return res.render('./../client/login', { error: 'Please enter both email and password.' });
  }

  try {
    console.log('Trying to verify user');
    // Access collection and check if username exists
    const user = await User.findOne({ email: email });
    //console.log(result.password, result.username);
    // If no user found go to signup page
    if (!user) {
      return res.redirect('/signup');
    }

    // Check if passwords match:
    const match = user.comparePassword(password, (err, isMatch) => {
      console.log('trying to match passwords', err, isMatch);
      if (err) {
        return next({
          log: `Error in userController.verifyUser when trying to compare Passwords: ERROR: ${err} `,
          message: { err: 'Error comparing Passwords during verification' },
        });
      }
      // If passwords match, go to next middleware
      if (isMatch) {
        console.log('PASSWORDS MATCH, LOGGING IN');
        res.locals.authUser = {
          id: user._id,
          username: user.username,
        };
        return next();
      }
      console.log('Passwords do not match!');
      // Passwords don't match, return to login page
      return res.render('./../client/ejs/login', { error: 'Invalid Password or Email, please try again!' });
    });
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser: ERROR: ${err} `,
      message: { err: 'Error verifying user on login - see server logs' },
    });
  }
};

module.exports = userController;
