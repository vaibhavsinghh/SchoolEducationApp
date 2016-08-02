'use strict';

/*
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Role = mongoose.model('Role'),
  fs = require('fs'),
  // pdf = require('html-pdf'),
  // options = { format: 'Letter' },
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/*
 * Create role
 */
// exports.downloadToPdf = function(req, res) {
//

//   pdf.create(html, options).toFile('./modules/roles/client/views/role2.pdf', function(err, res) {
//     if (err) return console.log(err);
//     console.log(res); // { filename: '/app/businesscard.pdf' }
//   });
// };
exports.create = function (req, res) {

    // function buildHtml(req) {
    //   console.log('inside buildHtml');
    //   console.log(req.name);
    //   console.log('over');
    //   var header = '';
    //   var body = req.name;
    //
    //   // concatenate header string
    //   // concatenate body string
    //
    //   return '<!DOCTYPE html>'
    //        + '<html><header>' + header + '</header><body>' + body + '</body></html>';
    // };
    //
    // var fileName = './modules/roles/client/views/role1.html';
    // var stream = fs.createWriteStream(fileName);
    //
    // stream.once('open', function(fd) {
    //   var html = buildHtml(req.body);
    //
    //   stream.end(html);
    // });
    // var html1 = fs.readFileSync(fileName, 'utf8');
    // pdf.create(html1, options).toFile('./modules/roles/client/views/role1.pdf', function(err, res) {
    //   if (err) return console.log(err);
    //   console.log(res); // { filename: '/app/businesscard.pdf' }
    // });
  // console.log('inside create');
  // console.log(req.body);
  // console.log('over');
  var role = new Role(req.body);
  console.log('body above');
  console.log(req.body);
  console.log('body below');
  console.log(role);
  role.user = req.user;
  console.log(role.user);
  role.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(role);
    }
  });
};

/*
 * Show the current role
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var role = req.role ? req.role.toJSON() : {};

  // Add a custom field to the Role, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Role model.
  role.isCurrentUserOwner = !!(req.user && role.user && role.user._id.toString() === req.user._id.toString());

  res.json(role);
  };
/**
 * Update an role
 */
exports.update = function (req, res) {
  var role = req.role;

  role.name = req.body.name;
  role.displayName = req.body.displayName;

  role.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(role);
    }
  });
};

/**
 * Delete role
 */
exports.delete = function (req, res) {
  var role = req.role;

  role.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(role);
    }
  });
};

/**
 * List of Roles
 */
exports.list = function (req, res) {
  Role.find().sort('-created').populate('user', 'firstName').exec(function (err, roles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log('under list');
      console.log(roles);
      res.json(roles);
    }
  });
};

/**
 * Role middleware
 */
exports.roleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Role is invalid'
    });
  }

  Role.findById(id).populate('user', 'displayName').exec(function (err, role) {
    if (err) {
      return next(err);
    } else if (!role) {
      return res.status(404).send({
        message: 'No role with that identifier has been found'
      });
    }
    req.role = role;
    next();
  });
};
