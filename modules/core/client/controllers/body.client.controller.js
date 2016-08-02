'use strict';

angular.module('core').controller('BodyController', ['$scope', '$http', 'Authentication', 'Menus',
    function($scope, $http, Authentication, Menus) {

        $scope.authentication = Authentication;
        $scope.topbarActive = true;

        // $scope.checkToken = function(selectedSchool) {
        //   $http({ url: '/api/token/', method: "GET",}).success(function (data) {
        //     console.log(data);
        //   });
        // };

}]);
