'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.user', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/main-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['Admin', function (Admin) {
            return new Admin();
          }]
        },
        data: {       
          roles: ['super_admin'],
          pageTitle: 'Users'
        }
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/main-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['Admin', function (Admin) {
            return new Admin();
          }]
        },
        data: {  
          roles: ['super_admin'],      
          pageTitle: 'Users'
        }
      });
  }
]);
