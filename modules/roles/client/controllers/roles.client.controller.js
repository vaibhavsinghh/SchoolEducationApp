(function () {
  'use strict';

  angular
    .module('roles')
    .controller('RolesController', RolesController);

  RolesController.$inject = ['$scope', '$state', 'roleResolve', '$window', 'Authentication', 'RolesService'];

  function RolesController($scope, $state, role, $window, Authentication, RolesService) {
    var vm = this;

    vm.role = role;
    console.log(vm.role);
    vm.authentication = Authentication;
    vm.error = null;
    vm.saveRole = saveRole;

    RolesService.query(function (data) {
      //$state.go('roles.list');
      vm.allRoles = data;
    });
    var delRole=null;

    $scope.openDeleteModal = function(selectedRole) {
      delRole=selectedRole;
      console.log(delRole);
      //$('#deleteConfirmModal').find('.btn-danger').attr('data-district-id',districtObj);
      $('#deleteConfirmModal').modal('show');
    };

    /********Deleting Student*******************************************/
    $scope.deleteRole = function() {
      delRole.$delete(function() {
      vm.allRoles = RolesService.query();
        $('#deleteConfirmModal').modal('toggle');
    });
    vm.allRoles = RolesService.query();
    };
    // $scope.deleteRole = function(selectedRole) {
    //   console.log(selectedRole);
    //   console.log(selectedRole.name);
    //   var result = confirm("Sure you want to delete "+ selectedRole.name);
    //   if(result){
    //     selectedRole.$delete(function() {
    //     vm.allRoles = RolesService.query();
    //     // $state.go('roles.list');
    //     });
    //   } else {
    //     $state.go('roles.list');
    //   }
    //
    // };
/********************************************************************/

/********Editing CAtegory************************************************/
    $scope.editRole = function(selectedRole) {
      console.log(selectedRole);
      vm.role=selectedRole;
    };

    function saveRole(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.categoryForm');
        return false;
      }

     if (vm.role._id) {
          vm.role.$update(successCallback, errorCallback);
      } else {
        RolesService.save(vm.role);
        console.log(vm.role);
        vm.role={};
        vm.allRoles = RolesService.query();
      }

      function successCallback(res) {
        //$state.go('roles.list');
        vm.role={};
      }
      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
