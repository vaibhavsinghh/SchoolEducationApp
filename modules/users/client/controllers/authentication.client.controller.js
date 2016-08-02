'use strict';

angular.module('users').controller('AuthenticationController', ['$rootScope', '$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($rootScope, $scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        //$state.go($state.previous.state.name || 'home', $state.previous.params);
        $state.go('districts.show',$state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

      $http({ url: '/api/getDistrict/'+response.district, method: "GET", params: { districtId: response.district }}).success(function (data) {
        $scope.authentication.user.district=data;
        console.log($scope.authentication.user.district.districtName);
        console.log($scope.authentication.user.roles );
       var isAdmin = $.inArray('super_admin', $scope.authentication.user.roles) > -1;
        if(isAdmin){
           $state.go('districts.show',$state.previous.params);
         } else {
           $rootScope.districtChosen=$scope.authentication.user.district.districtName;
           $state.go('students.students');
         }
       });//End of GetDistrict Ajax call


      }).error(function (response) {
        $scope.error = response.message;
      });
    };//end of sign In function

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
