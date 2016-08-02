'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Category = mongoose.model('Category'),
   District = mongoose.model('District'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an category
 */
exports.create = function (req, res) {
var id =req.body.districtId;
var category = new Category(req.body);
category.createdBy = req.user;
District.findById(id).exec(function (err, district) {
  if (err) {
    return next(err);
  } else if (!district) {
    return res.status(404).send({
      message: 'No district with that identifier has been found'
    });
  }
category.district = district;
category.save(function (err) {
 if (err) {
   return res.status(400).send({
     message: errorHandler.getErrorMessage(err)
   });
 } else {
   res.json(category);
 }
});

});


};


exports.read = function (req, res) {
  console.log("in readddddd");
  // convert mongoose document to JSON
  var category = req.category ? req.category.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(category);
};

exports.update = function (req, res) {
  var id =req.body.districtId;
  var category = req.category;
  category.categoryName=req.body.categoryName;

  District.findById(id).exec(function (err, district) {
      if (err) {
        return next(err);
      } else if (!district) {
        return res.status(404).send({
          message: 'No district with that identifier has been found'
        });
      }
    category.district = district;
    console.log("updating in server side");
    category.save(function (err) {
     if (err) {
       return res.status(400).send({
         message: errorHandler.getErrorMessage(err)
       });
     } else {
       res.json(category);
     }
    });
    });
};

exports.delete = function (req, res) {
  console.log(req.category);
var category = req.category;
category.remove(function (err) {
  if (err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  } else {
    res.json(category);
  }
});
};


exports.list = function (req, res) {
  Category.find().sort('-created').populate('createdBy', 'firstName').populate('district', 'districtName').exec(function (err, categories) {
    console.log("in server side List function");
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categories);
    }
  });
};

exports.categoryByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Category is invalid'
    });
  }

  Category.findById(id).populate('createdBy', 'firstName').populate('district', 'districtName').exec(function (err, category) {
    if (err) {
      return next(err);
    } else if (!category) {
      return res.status(404).send({
        message: 'No category with that identifier has been found'
      });
    }
    req.category = category;
    next();
  });
};
