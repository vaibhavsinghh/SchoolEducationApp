(function () {
  'use strict';

  // Schools controller
  angular
    .module('schools')
    .controller('SchoolsController', SchoolsController);

  SchoolsController.$inject = ['$scope', '$state', 'Authentication', 'schoolResolve','SchoolsService','DistrictsService'];

  function SchoolsController ($scope, $state, Authentication, school, SchoolsService, DistrictsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.school = school;
    vm.error = null;
    vm.form = {};
    vm.saveSchool = saveSchool;

    vm.allSchools = SchoolsService.query();
    vm.allDistricts  = DistrictsService.query();

/********Deleting Category*******************************************/
   $scope.deleteSchool = function(selectedSchool) {
      selectedSchool.$delete(function() {
      vm.allSchools = SchoolsService.query();
    });
};
/********************************************************************/

/********Editing CAtegory************************************************/
   $scope.editSchool = function(selectedSchool) {
     console.log(selectedSchool);
     vm.school=selectedSchool;
};
/*********************************************************************/

/********Save New Category********************************************/
    function saveSchool(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.schoolForm');
        return false;
      }

     if (vm.school._id) {
          vm.school.$update(successCallback, errorCallback);
        } else {
          console.log(vm.school);
          SchoolsService.save(vm.school);
          vm.school={};
          vm.allSchools = SchoolsService.query();
      }

        function successCallback(res) {
          $state.go('schools.create');
          vm.school={};
        }
        function errorCallback(res) {
          vm.error = res.data.message;
        }
    }

  }
})();
