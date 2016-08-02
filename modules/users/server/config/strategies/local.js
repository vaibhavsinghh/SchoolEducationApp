'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User'),
  jwt  = require('jwt-simple');
  var secret = 'xxx';

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    User.findOne({
      username: username.toLowerCase()
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid username or password'
        });
      } else {

        if(user.token) {
          console.log('inside user.token');
          var decoded = jwt.decode(user.token, secret);
          //console.log(decoded);
          //console.log(decoded.district.districtName);
          //user.password = undefined;
          return done(null, user);
        } else {
            console.log('inside else of user.token');
          // create a token
            var token = jwt.encode(user, secret);
            user.token = token;
            user.save(function(err) {
              if (err) throw err;

              console.log('User saved successfully');
              //user.password = undefined;
              return done(null, user);
           });
        }
      }
    });
  }));
};
