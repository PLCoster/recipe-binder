const Session = require('../models/sessionModel');
const bcrypt = require('bcryptjs');

const sessionController = {};

/*
 * validateSession checks if the request contains a cookie with an id
 * that corresponds to a valid session in the mongoDB database
 */
sessionController.validateSession = async (req, res, next) => {
  console.log('CHECKING IF USER IS LOGGED IN');
  // If there is a cookie with the request, check its ssid:
  if (req.cookies.ssid) {
    try {
      const result = await Session.findOne({ cookieId: req.cookies.ssid });
      // if session is not found, redirect user to login page
      if (!result) {
        return res.redirect('/login');
      }
      return next();
    } catch (err) {
      return next({
        log: `Error in sessionController.validateSession: ERROR: ${err}`,
        message: {
          err: 'Error finding Session from cookie SSID - see server logs',
        },
      });
    }
  }
  console.log('USER NOT LOGGED IN, RETURNING TO LOGIN PAGE');
  return res.redirect('/login');
};

/*
 * startSession - creates and save a new Session into the database.
 * when users try to access App pages session is checked before giving
 * access
 */
sessionController.startSession = async (req, res, next) => {
  // Generate a unique random SSID using bcrypt:
  let unique = false;
  let ssid;
  while (!unique) {
    try {
      ssid = await bcrypt.hash(
        `${res.locals.authUser.id} + ${Date.now()} +${10e16 * Math.random()}`,
        5
      );

      console.log(ssid);

      // Check SSID not already in DB, if it is generate a new one:
      const result = await Session.findOne({ cookieId: ssid });
      if (!result) {
        unique = true;
      }
    } catch (err) {
      return next({
        log: `Error in sessionController.startSession: ERROR: could not generate unique SSID: ERROR: ${err}`,
        message: { err: 'Error creating Session - see server logs' },
      });
    }
  }

  res.locals.ssid = ssid;
  // Update / Create Session in DB:
  try {
    const result = await Session.findOneAndUpdate(
      { cookieId: ssid },
      { cookieId: ssid },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('CREATED NEW SESSION: ', result);
    return next();
  } catch (err) {
    return next({
      log: `Error in sessionController.startSession: ERROR: ${err}`,
      message: { err: 'Error creating Session - see server logs' },
    });
  }
};

/**
 *  deleteSession - deletes a users session so they have to log back in
 *  in order to view the app
 */
sessionController.deleteSession = async (req, res, next) => {
  // Find session based on users id
  if (req.cookies.ssid) {
    console.log('DELETING SESSION IN DATABASE');
    try {
      const result = await Session.findOneAndDelete({
        cookieId: req.cookies.ssid,
      });
      console.log('DELETED SESSION: ', result);
      return next();
    } catch (err) {
      return next({
        log: `Error in sessionController.deleteSession: ERROR: ${err}`,
        message: { err: 'Error deleting Session - see server logs' },
      });
    }
  }
  return next();
};

module.exports = sessionController;
