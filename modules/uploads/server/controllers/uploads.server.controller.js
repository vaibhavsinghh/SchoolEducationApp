'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Upload = mongoose.model('Upload'),
  Form = mongoose.model('Form'),
  Student = mongoose.model('Student'),
  StudentForm = mongoose.model('StudentForm'),
  StudentFormAttribute = mongoose.model('StudentFormAttribute'),
  FormAttribute = mongoose.model('FormAttribute'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Upload
 */
exports.create = function(req, res) {
  var upload = new Upload(req.body);
  upload.user = req.user;

  upload.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(upload);
    }
  });
};


exports.downloadForm = function (req, res) {

  var id=req.params.formId;
    Form.findById(id).populate('createdBy', 'firstName').populate('category', 'categoryName').exec(function (err, form) {
      if (err) {
        return next(err);
      } else if (!form) {
        return res.status(404).send({
          message: 'No form with that identifier has been found'
        });
      }

  /**** Get the Form Attr of the sleected Form********/
      FormAttribute.find({'form': {$eq: req.params.formId}}).sort('-created').
      populate('createdBy', 'firstName').exec(function (err, formAttributes) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
                //  console.log(formAttributes);
                var Excel = require('exceljs');
                var workbook = new Excel.Workbook();
                var sheet = workbook.addWorksheet(form.formName);
                var columnsArray=[];
                var columnsMap={};
                columnsMap.header = ''+form._id+'';
                columnsMap.key = " ";
                columnsMap.width = 100;
                columnsArray.push(columnsMap);
                columnsMap={};

                for(var i=0;i<formAttributes.length;i++){
                    columnsMap.header = formAttributes[i].elementName;
                    columnsMap.key = formAttributes[i].elementName;
                    columnsMap.width = 50;
                    columnsArray.push(columnsMap);
                    columnsMap={};
                  }

                  sheet.columns=columnsArray;

                  var row = sheet.lastRow;
                  // Set a specific row height

                  row.font = { name: 'Arial', size: 10, bold: true, color: { argb: '000000' } };
                  row.eachCell(function(cell, colNumber) {
                 //console.log('Cell ' + colNumber + ' = ' + cell.value);


                  cell.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                var filename='./modules/uploads/client/attachments/'+form.formName+'.xlsx'
              /*  var path = require('path');
                  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                  res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                  res.setHeader('responseType','arraybuffer');
                  res.download(filename);*/


                  workbook.xlsx.writeFile(filename)
                      .then(function() {

                      /*  var mime = require('mime');
                        var fs = require('fs') ;
                        var mimetype = mime.lookup(filename);
                        console.log(mimetype);
                        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                        res.setHeader('Content-Type',mimetype);
                        res.download(filename);*/
                        return res.status(200).send({
                         message: 'Downloaded',
                         location:filename
                       });
                        //  res.download(fileDetails.path + '/' + fileDetails.fileName);

                        //var filestream = fs.createReadStream(filename);
                          //filestream.pipe(res);
                        //  return res;
                            /*  return res.status(200).send({
                              message: 'Downloaded',
                              location:filename
                            });*/

                          /*var fs = require('fs') ;
                          var file = fs.readFileSync(filename, 'binary');
                          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                          res.setHeader('Content-Disposition', "attachment; filename=" + "out.xlsx")
                          return res.end(file, 'binary');

 */
                      });








          //res.json(formAttributes);
        }
      });
      /**** End of get the Form Attr of the sleected Form********/
    });
};

exports.uploadExcelFile = function (req, res) {

  console.log("Upload Excel  Server Side");
  var user = req.user;
  var message = null;
  var upload = multer(config.excelUploads.bulkUpload).single('newExcelFile');
  //var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  // Filtering to upload only images
  //upload.fileFilter = profileUploadFileFilter;
  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading Student Form Excel'
        });
      } else {

        user.fileURL = config.excelUploads.bulkUpload.dest + req.file.filename;
        var Excel = require('exceljs');
        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile(user.fileURL)
            .then(function() {
              var worksheet = workbook.getWorksheet(1);
              var fieldRowLength=0;
              var allFields=[];
              worksheet.eachRow(function(row, rowNumber) {
                  if(rowNumber==1){
                  fieldRowLength=row.values.length-1;
                    row.eachCell(function(cell, colNumber) {
                      console.log('Cell ' + colNumber + ' = ' + cell.value);
                      allFields.push(cell.value);
                    });
                  }else{
                    var studentId=row.getCell(1).value;
                    var studentForm = new StudentForm(req.body);
                    studentForm.createdBy = req.user;
                    var elementsArray=[];
                    var elementsMap={};
                    for(var i=2;i<=fieldRowLength;i++){
                      elementsMap.value=row.getCell(i).value;
                      elementsMap.id=allFields[i-1];
                      elementsMap.name=allFields[i-1];
                      elementsMap.type="text";
                      elementsArray.push(elementsMap);
                      elementsMap={};
                    }
                    var formId=allFields[0];
                    Form.findById(formId).exec(function (err, form) {
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
                      console.log(studentForm);
                      studentForm.save(function (err) {
                         if (err) {
                           return res.status(400).send({
                             message: errorHandler.getErrorMessage(err)
                           });
                         } else {
                             //var elementsMap=req.body.elementsMap;
                             for(var i=0;i<elementsArray.length;i++){
                             var attrObj = new StudentFormAttribute ();
                             attrObj.studentForm = studentForm._id;
                             attrObj.elementId     = elementsArray[i].id;
                             attrObj.elementName   = elementsArray[i].name;
                             attrObj.elementType   = elementsArray[i].type
                             attrObj.elementValue  = elementsArray[i].value;
                             console.log(attrObj);
                             attrObj.save(function (err) {
                                if (err) {
                                  return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                  });
                                } else {

                                }
                             });
                           }
                          // res.json(studentForm);
                         }
                      });//stdeuntform Save end
                  });//end of studentfind by
                  });
                }
                  //console.log(row.values);
              });
            });
        res.json(user);
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};



/**
 * Show the current Upload
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var upload = req.upload ? req.upload.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  upload.isCurrentUserOwner = req.user && upload.user && upload.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(upload);
};

/**
 * Update a Upload
 */
exports.update = function(req, res) {
  var upload = req.upload ;

  upload = _.extend(upload , req.body);

  upload.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(upload);
    }
  });
};

/**
 * Delete an Upload
 */
exports.delete = function(req, res) {
  var upload = req.upload ;

  upload.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(upload);
    }
  });
};

/**
 * List of Uploads
 */
exports.list = function(req, res) {
  Upload.find().sort('-created').populate('user', 'displayName').exec(function(err, uploads) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(uploads);
    }
  });
};

/**
 * Upload middleware
 */
exports.uploadByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Upload is invalid'
    });
  }

  Upload.findById(id).populate('user', 'displayName').exec(function (err, upload) {
    if (err) {
      return next(err);
    } else if (!upload) {
      return res.status(404).send({
        message: 'No Upload with that identifier has been found'
      });
    }
    req.upload = upload;
    next();
  });
};
