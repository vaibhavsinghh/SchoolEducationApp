'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$filter', '$state', 'Authentication', 'userResolve', 'Admin', 'RolesService', 'DistrictsService',
  function ($scope, $filter, $state, Authentication, userResolve, Admin, RolesService, DistrictsService) {
      $scope.authentication = Authentication;
      $scope.user = userResolve;
      var delUser=null;
      jQuery(document).ready(function($) {
        $('#multiselect').multiselect();
      });

      $scope.allDistricts  = DistrictsService.query();

      Admin.query(function (data) {
        $state.go('admin.user');
        $scope.allUsers = data;
      });
      RolesService.query(function (data) {
        $scope.allRoles = data;
        console.log($scope.allRoles);
      });
      // $scope.permission = function (){
      //   if($scope.user.write){
      //     $scope.user.roles = 'superAdmin';
      //     console.log($scope.user.roles);
      //   } else {
      //     $scope.user.roles = 'user';
      //     console.log($scope.user.roles);
      //   }
      // };

      $scope.saveUser = function(isValid){
        console.log(isValid);
        $scope.error = null;
       /* if (!isValid) {
          console.log($scope.user);
          console.log('form error');
          $scope.$broadcast('show-errors-check-validity', 'userForm');

          return false;
         }*/
         var myEl = angular.element('#multiselect_to');
           console.log("vvvvdd>> "+myEl);
           $scope.user.roles = [];
           for(var i=0; i<myEl.val().length; i++){
              $scope.user.roles.push(myEl.val()[i]);
           }
        if ($scope.user._id) {

           console.log('before update');
           console.log($scope.user);

           $scope.user.$update(successCallback, errorCallback);
           console.log('after update');
           console.log($scope.user);
        } else {
           console.log('below save');
           console.log($scope.user);
         
           $scope.user.$save(successCallback, errorCallback);
          //  $scope.authentication.user = $scope.user;
           $scope.user={};
          //  $scope.allUsers = Admin.query();
           Admin.query(function (data) {
            //  $state.go('roles.list');
             $scope.allUsers = data;
           });
        }

         function successCallback(res) {
           $state.go('admin.users');
           $scope.user={};
           Admin.query(function (data) {
             $scope.allUsers = data;
           });
          //  $scope.userRoles = RolesService.query();
         }
         function errorCallback(res) {
          $scope.error = res.data.message;
         }

      };
      $scope.openDeleteModal = function(selectedUser) {
        delUser=selectedUser;
        console.log(delUser);
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

      $scope.deleteUser = function() {
        delUser.$delete(function() {
        $scope.allUsers = Admin.query();
        $('#deleteConfirmModal').modal('toggle');
      });
      }; // Delete a movie. Issues a DELETE to /api/users/:id
        

      $scope.editUser = function(selectedUser) {
        console.log(selectedUser);
        //vm.category.districtId=selectedCategory._id;
        console.log('edit');
        $scope.user=selectedUser;
       // $state.go('admin.edit');
      };
   

      // $scope.pageChanged = function () {
      //   $scope.figureOutItemsToDisplay();
      // };

  }
]);
