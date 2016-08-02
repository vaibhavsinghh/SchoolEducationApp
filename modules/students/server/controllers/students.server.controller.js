'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Student = mongoose.model('Student'),
    District = mongoose.model('District'),
      School = mongoose.model('School'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an category
 */
exports.create = function (req, res) {
var distId =req.body.districtId;
var schId =req.body.schoolId;

var student = new Student(req.body);

District.findById(distId).exec(function (err, district) {
  if (err) {
    return next(err);
  } else if (!district) {
    return res.status(404).send({
      message: 'No district with that identifier has been found'
    });
  }
student.district = district;
      School.findById(schId).exec(function (err, school) {
        if (err) {
          return next(err);
        } else if (!school) {
          return res.status(404).send({
            message: 'No school with that identifier has been found'
          });
        }
      student.school = school;
      console.log(student);
student.save(function (err) {
 if (err) {
   return res.status(400).send({
     message: errorHandler.getErrorMessage(err)
   });
 } else {
   res.json(student);
 }
});//end of student dave

});//end of  school find by id
});//end of distrci find by id
};


exports.read = function (req, res) {
  // convert mongoose document to JSON
  var student = req.student ? req.student.toJSON() : {};
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(student);
};

exports.update = function (req, res) {

  var student = req.student;
  student.studentName=req.body.studentName;

  console.log("updating in server side");
    student.save(function (err) {
     if (err) {
       return res.status(400).send({
         message: errorHandler.getErrorMessage(err)
       });
     } else {
       res.json(student);
     }
    });

};

exports.delete = function (req, res) {
var student = req.student;
student.remove(function (err) {
  if (err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  } else {
    res.json(student);
  }
});
};

/*** select only student who belongs to particular district*/
exports.list = function (req, res) {
  //console.log(req.query._id);
  Student.find({'district': {$eq: req.query._id}}).sort('-created').populate('createdBy', 'firstName').populate('district', 'districtName').populate('school', 'schoolName').exec(function (err, students) {
    console.log("In Server side Stdudent List function");
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(students);
    }
  });
};

exports.studentByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Student is invalid'
    });
  }

  Student.findById(id).populate('createdBy', 'displayName').exec(function (err, student) {
    if (err) {
      return next(err);
    } else if (!student) {
      return res.status(404).send({
        message: 'No student with that identifier has been found'
      });
    }
    req.student = student;
    next();
  });
};
