(function () {
  'use strict';

  angular
    .module('reports')
    .controller('ReportsListController', ReportsListController);

  ReportsListController.$inject = ['ReportsService', 'Authentication', '$http', '$state'];

  function ReportsListController(ReportsService, Authentication, $http, $state) {
    var vm = this;
    vm.authentication = Authentication;
    console.log(vm.authentication.user);
    ReportsService.query(function (data) {
      vm.reports = data;
    });
    vm.checkToken = checkToken;

    function checkToken() {
      $http({ url: '/api/checkToken/', method: "GET",}).success(function (data) {
        if(data) {
          $state.go('reports.create');
          console.log(data);
        } else {
          $state.go('authentication.signin');
        }

      });
    };

  }
})();
