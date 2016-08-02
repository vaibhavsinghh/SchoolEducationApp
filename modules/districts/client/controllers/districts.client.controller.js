(function () {
  'use strict';

  angular
    .module('districts')
    .controller('DistrictsController', DistrictsController);

  DistrictsController.$inject = ['$rootScope','$scope', '$state', 'districtResolve', '$window', 'Authentication','DistrictsService'];

  function DistrictsController($rootScope,$scope, $state, district, $window, Authentication,DistrictsService) {
    var vm = this;
    var delDistrict=null;
    vm.authentication = Authentication;
    vm.district = district;
    vm.error = null;
    vm.saveDistrict = saveDistrict;
    vm.allDistricts = DistrictsService.query();


    $scope.openDeleteModal = function(districtObj) {
        delDistrict=districtObj;
        console.log(delDistrict);
        //$('#deleteConfirmModal').find('.btn-danger').attr('data-district-id',districtObj);
        $('#deleteConfirmModal').modal('show');
    };

  /********Deleting Student*******************************************/
    $scope.deleteDistrict = function() {
        delDistrict.$delete(function() {
          vm.allDistricts = DistrictsService.query();
          $('#deleteConfirmModal').modal('toggle');
        });
       vm.allDistricts = DistrictsService.query();
    };
  /********************************************************************/
    $scope.viewDistrict = function(selectedDistrict) {
      vm.district=selectedDistrict;
    };

    /********Editing Student************************************************/
    $scope.editDistrict = function(selectedDistrict) {
      console.log(selectedDistrict);
      vm.district=selectedDistrict;
    };

    function saveDistrict(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.districtForm');
        return false;
      }

      // move create/update logic to service
      if (vm.district._id) {      
        vm.district.$update(successCallback, errorCallback);
      } else {
        console.log(vm.district)
        DistrictsService.save(vm.district);
        vm.district={};
        vm.allDistricts = DistrictsService.query();
        console.log(vm.allDistricts);
      }

      function successCallback(res) {        
        vm.district={};
        $state.go('districts.list', {
          districtId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  /* to show district first page*/
    $scope.loadDashboard = function(districtChosen) {
      console.log(districtChosen);
      $rootScope.districtChosen=districtChosen;
      $state.go('students.students');
    };
  }
})();
