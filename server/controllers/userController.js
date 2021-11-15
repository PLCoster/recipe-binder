const User = require('../models/userModel');

const userController = {};

/**
 * createUser - check that user details are valid and that email address not
 * already in database when trying to sign up a new user
 */
userController.checkEmailExists = async (req, res, next) => {
  const { password, username, email } = req.body;
  // If no email then return to signup
  if (!email || !username || !password) {
    return res.render('./../client/signup', {
      error: 'Please complete all fields to signup',
    });
  }

  try {
    // Otherwise check that email does not already exist in DB:
    const user = await User.findOne({ email });
    if (user) {
      return res.render('./../client/ejs/signup', {
        error: 'Email already in use!',
      });
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.checkEmailExists when trying to check if an email is already in use: ERROR: ${err} `,
      message: { err: 'Error checking for user email in DB' },
    });
  }
};

/**
 * createUser - create and save a new user into the database
 * adds the new user object to req.body.authUser
 */
userController.createUser = async (req, res, next) => {
  // Check for valid user details before creating user:
  const { password, username, email } = req.body;
  try {
    const user = await User.create({ password, username, email });
    // Store some credentials on response
    res.locals.authUser = {
      id: user._id,
      username: user.username,
    };
    // Redirect Client to secret endpoint store
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.createUser when trying to create a new User: ERROR: ${err} `,
      message: { err: 'Error creating new User in DB' },
    });
  }
};

/**
 * verifyUser - on login takes email and password
 * checks there is a matching valid user in the database
 * if there is authenticates the password against password stored in DB
 */
userController.verifyUser = async (req, res, next) => {
  // Validate login information -> must have email and password:
  const { email, password } = req.body;
  if (!email || !password) {
    // If login info invalid return to login page
    return res.render('./../client/login', {
      error: 'Please enter both email and password.',
    });
  }

  try {
    // Access collection and check if username exists
    const user = await User.findOne({ email });

    // If no user found return to login page
    if (!user) {
      return res.render('./../client/ejs/login', {
        error: 'Invalid Password or Email, please try again!',
      });
    }

    // Check if passwords match:
    const match = user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return next({
          log: `Error in userController.verifyUser when trying to compare Passwords: ERROR: ${err} `,
          message: { err: 'Error comparing Passwords during verification' },
        });
      }
      // If passwords match, go to next middleware
      if (isMatch) {
        res.locals.authUser = {
          id: user._id,
          username: user.username,
        };
        return next();
      }
      // Passwords don't match, return to login page
      return res.render('./../client/ejs/login', {
        error: 'Invalid Password or Email, please try again!',
      });
    });
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser: ERROR: ${err} `,
      message: { err: 'Error verifying user on login - see server logs' },
    });
  }
};

module.exports = userController;
