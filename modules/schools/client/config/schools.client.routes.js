(function () {
  'use strict';

  angular
    .module('schools')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('schools', {
        abstract: true,
        url: '/schools',
        template: '<ui-view/>'
      })
      .state('schools.create', {
        url: '/create',
        templateUrl: 'modules/schools/client/views/school.client.view.html',
        controller: 'SchoolsController',
        controllerAs: 'vm',
        resolve: {
          schoolResolve: newSchool
        },
        data: {
          roles: ['super_admin'],
          pageTitle : 'Schools Create'
        }
      })
      .state('schools.list', {
        url: '/create',
        templateUrl: 'modules/schools/client/views/school.client.view.html',
        controller: 'SchoolsController',
        controllerAs: 'vm',
        resolve: {
          schoolResolve: newSchool
        },
        data: {
          roles: ['super_admin'],
          pageTitle : 'Schools Create'
        }
      });
  }

  getSchool.$inject = ['$stateParams', 'SchoolsService'];

  function getSchool($stateParams, SchoolsService) {
    return SchoolsService.get({
      schoolId: $stateParams.schoolId
    }).$promise;
  }

  newSchool.$inject = ['SchoolsService'];

  function newSchool(SchoolsService) {
    return new SchoolsService();
  }
})();
