const Session = require('../models/sessionModel');

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
        return res.redirect('/signup');
      }
      return next();
    } catch (err) {
      return next({
        log: `Error in sessionController.validateSession: ERROR: ${err}`,
        message: { err: 'Error finding Session from cookie SSID - see server logs' },
      });
    }
  }
};

/*
* startSession - creates and save a new Session into the database.
* when users try to access App pages session is checked before giving
* access
*/
sessionController.startSession = async (req, res, next) => {
  // Create new session based on the authenticated user id
  const { id } = res.locals.authUser;
  if (id) {
    try {
      const result = await Session.findOneAndUpdate(
        { cookieId: id },
        { cookieId: id },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      console.log('CREATED NEW SESSION: ', result);
      return next();
    } catch (err) {
      return next({
        log: `Error in sessionController.startSession: ERROR: ${err}`,
        message: { err: 'Error creating Session - see server logs' },
      });
    }
  } else {
    return next({
      log: 'Error in sessionController.startSession: ERROR: No user SSID in res.locals.authUser',
      message: { err: 'Error creating Session - see server logs' },
    });
  }
};

module.exports = sessionController;
