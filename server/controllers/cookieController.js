const cookieController = {};

/**
 * setSSID Cookie - creates a new user SSID and stores it in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // Set cookie on response with SSID of user's mongoDB ID
  res.cookie('ssid', res.locals.ssid, { httpOnly: true });
  return next();
};

module.exports = cookieController;
