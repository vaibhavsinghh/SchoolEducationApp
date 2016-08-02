//Students service used to communicate Students REST endpoints
(function () {
  'use strict';

var app= angular
    .module('students')
    .factory('StudentsService', StudentsService);

  StudentsService.$inject = ['$resource'];

  function StudentsService($resource) {
    return $resource('api/students/:studentId', {
      studentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
  app.factory('StudentFormsService', StudentFormsService);

   StudentFormsService.$inject = ['$resource'];

   function StudentFormsService($resource) {
     return $resource('api/studentForms/:studentFormId', {
       studentFormId: '@_id'
     }, {
       update: {
         method: 'PUT'
       }
     });
   }




})();
