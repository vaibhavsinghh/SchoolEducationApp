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
      resources: '/api/students',
      permissions: '*'
    }, {
      resources: '/api/students/:studentId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/students',
      permissions: ['get', 'post']
    }, {
      resources: '/api/students/:studentId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/students',
      permissions: ['get']
    }, {
      resources: '/api/students/:studentId',
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
