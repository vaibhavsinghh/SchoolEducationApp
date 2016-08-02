(function () {
  'use strict';

  angular
    .module('students')
    .controller('StudentFormController', StudentFormController);

  StudentFormController.$inject = ['$compile','$http','$scope', '$state', '$stateParams','$window', 'Authentication','StudentService','StudentFormsService','FormsService','CategoryService'];

  function StudentFormController($compile,$http, $scope, $state, stateParams, $window, Authentication,StudentService, StudentFormsService,FormsService,CategoryService) {
    var vm = this;

  /*  vm.isForms=false;
    vm.studentForm = studentForm;
    vm.studentForm.studentId=stateParams.studentId;
    vm.authentication = Authentication;
    vm.error = null;
    vm.saveStudentForm = saveStudentForm;
    vm.selForm=null;
    vm.allStudentForms = StudentFormService.query();
    vm.allCategories = CategoryService.query();
    vm.allStudents = StudentService.query();
    vm.allForms = FormService.query();
    console.log(vm.allStudents);

  /********Deleting Student Form*******************************************/
/*   $scope.deleteStudentForm = function(selectedStudentForm) {
      selectedStudentForm.$delete(function() {
      vm.allStudentForms = StudentFormService.query();
    });
};
/********************************************************************/
/********Editing Student Form************************************************/
/*   $scope.editStudentForm = function(selectedStudentForm) {
      console.log(selectedStudentForm);
      vm.studentForm=selectedStudentForm;
};
*/
  }
}());
