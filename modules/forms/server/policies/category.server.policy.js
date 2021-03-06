'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
     roles: ['super_admin'],
    allows: [{
      resources: '/api/category',
      permissions: '*'
    }, {
      resources: '/api/category/:categoryId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/category',
      permissions: ['get', 'post']
    }, {
      resources: '/api/category/:categoryId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/category',
      permissions: ['get']
    }, {
      resources: '/api/category/:categoryId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
//console.log(req.category);
  // If an article is being processed and the current user created it then allow any manipulation
  if (req.user) {
    return next();
  }
// && req.user && req.category.createdBy && req.category.createdBy.id === req.user.id
  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};

exports.isAllowed1 = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an article is being processed and the current user created it then allow any manipulation
  if (req.form && req.user && req.form.createdBy && req.form.createdBy.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
