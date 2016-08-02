(function () {
  'use strict';

  angular
    .module('reports')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('reports', {
        abstract: true,
        url: '/reports',
        template: '<ui-view/>'
      })
      .state('reports.list', {
        url: '',
        templateUrl: 'modules/reports/client/views/list-reports.client.view.html',
        controller: 'ReportsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reports List'
        }
      })
      .state('reports.create', {
        url: '/create',
        templateUrl: 'modules/reports/client/views/form-report.client.view.html',
        controller: 'ReportsController',
        controllerAs: 'vm',
        resolve: {
          reportResolve: newReport
        },
        data: {
          roles: ['super_admin'],
          pageTitle : 'Reports Create'
        }
      });
  }

  getReport.$inject = ['$stateParams', 'ReportsService'];

  function getReport($stateParams, ReportsService) {
    return ReportsService.get({
      reportId: $stateParams.reportId
    }).$promise;
  }

  newReport.$inject = ['ReportsService'];

  function newReport(ReportsService) {
    return new ReportsService();
  }
})();
