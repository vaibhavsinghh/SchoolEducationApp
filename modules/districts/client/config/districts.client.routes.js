(function () {
  'use strict';

  angular
    .module('districts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('districts', {
        abstract: true,
        url: '/districts',
        template: '<ui-view/>'
      })
      .state('districts.list', {
        url: '/',
        templateUrl: 'modules/districts/client/views/list-districts.client.view.html',
        controller: 'DistrictsController',
        controllerAs: 'vm',
        resolve: {
          districtResolve: newDistrict
        },
        data: {
          roles: ['super_admin'],
          pageTitle : 'Districts list'
        }
      })
      .state('districts.show', {//Dont Delete this Main page after Login
        url: '/show',
        templateUrl: 'modules/districts/client/views/show-district.client.view.html',
        controller: 'DistrictsController',
        controllerAs: 'vm',
         resolve: {
          districtResolve: newDistrict
        },
        data: {
          roles: ['super_admin']
        }
      });
  }

    newDistrict.$inject = ['DistrictsService'];

    function newDistrict(DistrictsService) {
      return new DistrictsService();
    }
})();
