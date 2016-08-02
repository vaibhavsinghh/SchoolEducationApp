(function () {
  'use strict';

  angular
    .module('roles.services')
    .factory('RolesService', RolesService);

  RolesService.$inject = ['$resource'];

  function RolesService($resource) {
    return $resource('api/roles/:roleId', {
      roleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
