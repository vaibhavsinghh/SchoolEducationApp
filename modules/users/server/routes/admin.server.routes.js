'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  adminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin.server.controller'),
  users= require('../controllers/users.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Setting up the users password api
  app.route('/api/auth/forgot').post(users.forgot);
  app.route('/api/auth/reset/:token').get(users.validateResetToken);
  app.route('/api/auth/reset/:token').post(users.reset);

  // Setting up the users authentication api
  //app.use('/api/auth/signin', function (req, res, next) {
    // check header or url parameters or post parameters for token
   // var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    /*
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });

    }*/

  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/signin').post(users.signin);
  app.route('/api/auth/signout').get(users.signout);

  // Users collection routes
  app.route('/api/users').all(adminPolicy.isAllowed)
    .get(admin.list)
    .post(admin.create);

  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
};
