const cookieController = {};

/**
 * setSSID Cookie - stores user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // Set cookie on response with SSID of user's mongoDB ID
  res.cookie('ssid', res.locals.authUser.id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
