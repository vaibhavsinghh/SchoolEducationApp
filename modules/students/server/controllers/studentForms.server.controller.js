'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  StudentForm = mongoose.model('StudentForm'),
  Form = mongoose.model('Form'),
  Student = mongoose.model('Student'),
  fs = require('fs'),
  pdf = require('html-pdf'),
  options = { format: 'Letter' },
  StudentFormAttribute = mongoose.model('StudentFormAttribute'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.downloadStudentForm = function (req, res) {
console.log(req.query.studentFormId);
  console.log("====================DOWNLOAD FORM SERVER SIDE ======================");
  var studentFormContent=req.query.studentFormContent;

  function buildHtml(req) {
    console.log('inside buildHtml');
  //  console.log(req.name);
    console.log('over');
    var header = '';
    var body = req.name;

    // concatenate header string
    // concatenate body string

    return '<!DOCTYPE html>'
         + '<html><header>' + header + '</header><body>' + body + '</body></html>';
  };

  /*var fileName = studentFormContent;
  var stream = fs.createWriteStream(fileName);

  stream.once('open', function(fd) {
    var html = buildHtml(req.body);

    stream.end(html);
  });*/
//  var html1 = fs.readFileSync(studentFormContent, 'utf8');

  console.log(studentFormContent);
  var fileLocation='./modules/students/client/attachments/'+req.query.studentFormId+'.pdf';
  pdf.create(studentFormContent, options).toFile(fileLocation, function(err, ress) {
    if (err) return console.log(err);
      console.log("*****PDf*******");
    console.log(ress); // { filename: '/app/businesscard.pdf' }
    res.json(fileLocation);
  });
  //console.log(req.body);

}






/**
 * Create an category
 */
exports.create = function (req, res) {
var existingStudFormId=req.body.studentForm;
//console.log(req.body.studentForm)
if(existingStudFormId){
StudentFormAttribute.remove({'studentForm': {$eq: existingStudFormId}}, function(err) {
              if (err) {
                  console.log(err)
              } else {
                var elementsMap=req.body.elementsMap;
                for(var i=0;i<elementsMap.length;i++){
                var attrObj = new StudentFormAttribute ();
                attrObj.studentForm = existingStudFormId;
                attrObj.elementId     = elementsMap[i].id;
                attrObj.elementName   = elementsMap[i].name;
                attrObj.elementType   = elementsMap[i].type
                attrObj.elementValue  = elementsMap[i].value;

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
   return true;
}


  var studentId =req.body.student;
  var form =req.body.form;
  var studentForm = new StudentForm(req.body);
  studentForm.createdBy = req.user;
  Form.findById(form).exec(function (err, form) {
    if (err) {
      return next(err);
    } else if (!form) {
      return res.status(404).send({
        message: 'No form with that identifier has been found'
      });
    }
  studentForm.form = form;
        Student.findById(studentId).exec(function (err, student) {
          if (err) {
            return next(err);
          } else if (!student) {
            return res.status(404).send({
              message: 'No student with that identifier has been found'
            });
          }
          studentForm.student = student;
          studentForm.save(function (err) {
             if (err) {
               return res.status(400).send({
                 message: errorHandler.getErrorMessage(err)
               });
             } else {

                 var elementsMap=req.body.elementsMap;
                 for(var i=0;i<elementsMap.length;i++){
                 var attrObj = new StudentFormAttribute ();
                 //attrObj.studentFormId    = existingStudFormId ? existingStudFormId: studentForm._id;
                 attrObj.studentForm = studentForm._id
                 attrObj.elementId     = elementsMap[i].id;
                 attrObj.elementName   = elementsMap[i].name;
                 attrObj.elementType   = elementsMap[i].type
                 attrObj.elementValue  = elementsMap[i].value;

                 attrObj.save(function (err) {
                    if (err) {
                      return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                      });
                    } else {

                    }
                 });
                }
               res.json(studentForm);
             }
          });//stdeuntform Save end
      });//end of studentfind by

});

};


exports.read = function (req, res) {
  // convert mongoose document to JSON
  var studentForm = req.studentForm ? req.studentForm.toJSON() : {};
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(studentForm);
};

exports.update = function (req, res) {

};

exports.delete = function (req, res) {
var studentForm = req.studentForm;
studentForm.remove(function (err) {
  if (err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  } else {
    res.json(studentForm);
  }
});
};

exports.getAllStudentFormsStudentWise = function (req, res) {

  StudentForm.find({'student': {$eq: req.params.student}}).sort('-created').
  populate('createdBy', 'firstName').
  populate({ path: 'form', model: 'Form', populate: { path: 'category', model: 'Category' } }).
  populate('student').exec(function (err, studentForms) {

    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(studentForms);
    }
  });
};

exports.list = function (req, res) {

  StudentForm.find().sort('-created').
  populate('createdBy', 'firstName').
  populate({ path: 'form', model: 'Form', populate: { path: 'category', model: 'Category' } }).
  populate('student').exec(function (err, studentForms) {

    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(studentForms);
    }
  });
};

exports.getContentOfSelectedStudentForm = function (req, res) {
  console.log("--------------");
  //console.log(req.params.studentForm);

  StudentFormAttribute.find({'studentForm': {$eq: req.params.studentForm}}).sort('-created').
  populate('createdBy', 'firstName').exec(function (err, studentFormAttributes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //console.log(studentFormAttributes);
      res.json(studentFormAttributes);
    }
  });
};




exports.studentFormByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'studentForm is invalid'
    });
  }

  StudentForm.findById(id).populate('createdBy', 'firstName').exec(function (err, studentForm) {
    if (err) {
      return next(err);
    } else if (!studentForm) {
      return res.status(404).send({
        message: 'No student with that identifier has been found'
      });
    }
    req.studentForm = studentForm;
    next();
  });
};
