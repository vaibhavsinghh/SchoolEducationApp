'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  School = mongoose.model('School'),
  District = mongoose.model('District'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create an category
*/
exports.create = function (req, res) {

var id =req.body.districtId;
var school = new School(req.body);
school.createdBy = req.user;
District.findById(id).exec(function (err, district) {
if (err) {
  return next(err);
} else if (!district) {
  return res.status(404).send({
    message: 'No district with that identifier has been found'
  });
}
school.district = district;
school.save(function (err) {
if (err) {
 return res.status(400).send({
   message: errorHandler.getErrorMessage(err)
 });
} else {
 res.json(school);
}
});

});


};


exports.read = function (req, res) {
console.log("in readddddd");
// convert mongoose document to JSON
var school = req.school ? req.school.toJSON() : {};

// Add a custom field to the Article, for determining if the current User is the "owner".
// NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

res.json(school);
};

exports.update = function (req, res) {
var id =req.body.districtId;
var school = req.school;
school.schoolName=req.body.schoolName;

District.findById(id).exec(function (err, district) {
    if (err) {
      return next(err);
    } else if (!district) {
      return res.status(404).send({
        message: 'No district with that identifier has been found'
      });
    }
  school.district = district;
  console.log("updating in server side");
  school.save(function (err) {
   if (err) {
     return res.status(400).send({
       message: errorHandler.getErrorMessage(err)
     });
   } else {
     res.json(school);
   }
  });
  });
};

exports.delete = function (req, res) {
console.log(req.school);
var school = req.school;
school.remove(function (err) {
if (err) {
  return res.status(400).send({
    message: errorHandler.getErrorMessage(err)
  });
} else {
  res.json(school);
}
});
};


exports.list = function (req, res) {
School.find().sort('-created').populate('createdBy', 'firstName').populate('district').exec(function (err, schools) {
  console.log("in server side List function");
  if (err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  } else {
    res.json(schools);
  }
});
};

exports.schoolByID = function (req, res, next, id) {
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).send({
    message: 'School is invalid'
  });
}

School.findById(id).populate('createdBy', 'firstName').populate('district').exec(function (err, school) {
  if (err) {
    return next(err);
  } else if (!school) {
    return res.status(404).send({
      message: 'No school with that identifier has been found'
    });
  }
  req.school = school;
  next();
});
};
