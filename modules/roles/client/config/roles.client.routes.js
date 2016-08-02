(function () {
  'use strict';

  angular
    .module('roles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('roles', {
        abstract: true,
        url: '/roles',
        template: '<ui-view/>'
      })
      .state('roles.list', {
        url: '/',
        templateUrl: 'modules/roles/client/views/list-roles.client.view.html',
        controller: 'RolesController',
        controllerAs: 'vm',
        resolve: {
          roleResolve: newRole
        },
        data: {
           roles: ['super_admin'],
          pageTitle: 'Roles List'
        }
      })
      .state('roles.list1', {
        url: '/',
        templateUrl: 'modules/roles/client/views/list-roles.client.view.html',
        controller: 'RolesController',
        controllerAs: 'vm',
        resolve: {
           roles: ['super_admin'],
          roleResolve: newRole
        },
        data: {
           roles: ['super_admin'],
          pageTitle: 'Roles List'
        }
      });
  }

  getRole.$inject = ['$stateParams', 'RolesService'];

  function getRole($stateParams, RolesService) {
    return RolesService.get({
      roleId: $stateParams.roleId
    }).$promise;
  }

  newRole.$inject = ['RolesService'];

  function newRole(RolesService) {
    return new RolesService();
  }
}());
