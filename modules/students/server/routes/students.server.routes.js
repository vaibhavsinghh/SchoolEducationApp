'use strict';

/**
 * Module dependencies
 */
var studentsPolicy = require('../policies/students.server.policy'),
    students = require('../controllers/students.server.controller'),
    studentFormsPolicy = require('../policies/studentForms.server.policy'),
    studentForms = require('../controllers/studentForms.server.controller');

module.exports = function (app) {
  // Category collection routes
 app.route('/api/students').all(studentsPolicy.isAllowed)
    .get(students.list)
    .post(students.create);

  // Single category routes
 app.route('/api/students/:studentId').all(studentsPolicy.isAllowed)
    .get(students.read)
    .put(students.update)
    .delete(students.delete);

 // Finish by binding the form middleware
 app.param('studentId', students.studentByID);

 // Student Form collection routes
 app.route('/api/studentForms').all(studentFormsPolicy.isAllowed)
   .get(studentForms.list)
   .post(studentForms.create);

 //Single Student Form  routes
 app.route('/api/studentForms/:studentFormId').all(studentFormsPolicy.isAllowed)
   .get(studentForms.read)
   .put(studentForms.update)
   .delete(studentForms.delete);

// Finish by binding the Student Form  middleware
 app.param('studentFormId', studentForms.studentFormByID);

 app.route('/api/getAllStudentFormsStudentWise/:student').get(studentForms.getAllStudentFormsStudentWise);
 app.route('/api/getContentOfSelectedStudentForm/:studentForm').get(studentForms.getContentOfSelectedStudentForm);
 app.route('/api/downloadStudentForm/').post(studentForms.downloadStudentForm);


};
