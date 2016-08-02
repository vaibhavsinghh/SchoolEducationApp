'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Form = mongoose.model('Form'),
  Category = mongoose.model('Category'),
  District = mongoose.model('District'),
  FormAttribute = mongoose.model('FormAttribute'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an category
 */
exports.create = function (req, res) {
console.log("CREATE FORM SERVER SIDE");
var id =req.body.categoryId;
var form = new Form(req.body);
form.createdBy = req.user;
Category.findById(id).exec(function (err, category) {
  if (err) {
    return next(err);
  } else if (!category) {
    return res.status(404).send({
      message: 'No district with that identifier has been found'
    });
  }
form.category = category;
form.save(function (err) {
 if (err) {
   return res.status(400).send({
     message: errorHandler.getErrorMessage(err)
   });
 } else {
   var elementsMap=req.body.formElementsArray;
   for(var i=0;i<elementsMap.length;i++){
   var attrObj = new FormAttribute ();
   attrObj.form = form._id
   console.log(elementsMap[i]);
   attrObj.elementName   = elementsMap[i];
   attrObj.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {

      }
   });
  }
   res.json(form);
 }
});

});


};


exports.read = function (req, res) {
  console.log("in readddddd");
  // convert mongoose document to JSON
  var form = req.category ? req.form.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(form);
};

exports.update = function (req, res) {
  var id =req.body.categoryId;
  var form = req.form;
  form.formName=req.body.formName;
  form.formContent=req.body.formContent;
  Category.findById(id).exec(function (err, category) {
      if (err) {
        return next(err);
      } else if (!category) {
        return res.status(404).send({
          message: 'No category with that identifier has been found'
        });
      }
    form.category = category;
    console.log("updating in server side");
    form.save(function (err) {
     if (err) {
       return res.status(400).send({
         message: errorHandler.getErrorMessage(err)
       });
     } else {
       console.log(req.form);
       var existingFormId = req.form;
       if(existingFormId){
       FormAttribute.remove({'form': {$eq: existingFormId}}, function(err) {
                     if (err) {
                         console.log(err)
                     } else {
                       var elementsMap=req.body.formElementsArray;
                       for(var i=0;i<elementsMap.length;i++){
                       var attrObj = new FormAttribute ();
                       attrObj.form = existingFormId;
                      // attrObj.elementId     = elementsMap[i].id;
                       attrObj.elementName   = elementsMap[i];
                      // attrObj.elementType   = elementsMap[i].type
                      // attrObj.elementValue  = elementsMap[i].value;
                       attrObj.save(function (err) {
                          if (err) {
                            return res.status(400).send({
                              message: errorHandler.getErrorMessage(err)
                            });
                          } else {
                          //  console.log(attrObj);
                          }
                       });
                      }

                     }
                 }
             );

       }
       console.log("FormAttribute Added")
       res.json(form);
     }
    });
    });
};

exports.delete = function (req, res) {
var form = req.form;
form.remove(function (err) {
  if (err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  } else {
    res.json(form);
  }
});
};


exports.getFormsCatWise = function (req, res) {

 Form.find({'category': {$eq: req.params.categoryId}}).sort('-created').populate('createdBy', 'firstName').populate('category', 'categoryName').exec(function (err, allForms) {
    console.log("in server side List function");
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(allForms);
      console.log(allForms);
    }
  });
};




exports.list = function (req, res) {
  Form.find().sort('-created').populate('createdBy', 'firstName').populate('category', 'categoryName').exec(function (err, allForms) {
    console.log("in server side List function");
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(allForms);
    }
  });
};

exports.getForm = function (req, res) {
var id=req.params.formId;
  Form.findById(id).populate('createdBy', 'firstName').populate('category', 'categoryName').exec(function (err, form) {
    if (err) {
      return next(err);
    } else if (!form) {
      return res.status(404).send({
        message: 'No form with that identifier has been found'
      });
    }
      res.json(form);

  });
};


exports.formByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Form is invalid'
    });
  }

  Form.findById(id).populate('createdBy', 'firstName').populate('category', 'categoryName').exec(function (err, form) {
    if (err) {
      return next(err);
    } else if (!form) {
      return res.status(404).send({
        message: 'No form with that identifier has been found'
      });
    }
    req.form = form;
    next();
  });
};
