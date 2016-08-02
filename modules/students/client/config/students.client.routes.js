(function () {
  'use strict';

  angular
    .module('students')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('students', {
        abstract: true,
        url: '/students',
        template: '<ui-view/>'
      })
      .state('students.students', {
        url: '/',
        templateUrl: 'modules/students/client/views/student.client.view.html',
        controller: 'StudentController',
        controllerAs: 'vm',
         resolve: {
          studentResolve: newStudent,
          studentFormResolve: newStudentForm
        },
        data: {
          pageTitle: 'New Student'
        }
      })

      .state('students.viewStudent', {
        url: '/:studentId',
        templateUrl: 'modules/students/client/views/view-student.client.view.html',
        controller: 'StudentController',
        controllerAs: 'vm',
         resolve: {
          studentResolve: newStudent,
          studentFormResolve: newStudentForm
        },
        data: {
          pageTitle: 'New Student'
        }
      });
      /*.state('students.createStudentForm', {
        url: '/:studentId',
        templateUrl: 'modules/students/client/views/studentForm.client.view.html',
        controller: 'StudentFormController',
        controllerAs: 'vm',
         resolve: {
          studentFormResolve: newStudentForm
        },
        data: {
          pageTitle: 'New Student Form'
        }
      });*/
  }

  getStudent.$inject = ['$stateParams', 'StudentsService'];

  function getStudent($stateParams, StudentsService) {
    return StudentsService.get({
      studentId: $stateParams.studentId
    }).$promise;
  }

  /*getStudentForm.$inject = ['$stateParams', 'StudentFormsService'];

  function getStudentForm($stateParams, StudentFormsService) {
    return StudentFormsService.get({
      studentFormId: $stateParams.studentFormId
    }).$promise;
  }
*/
  newStudent.$inject = ['StudentsService'];

  function newStudent(StudentsService) {
    return new StudentsService();
  }

  newStudentForm.$inject = ['StudentsService'];

  function newStudentForm(StudentsService) {
    return new StudentsService();
  }



})();
