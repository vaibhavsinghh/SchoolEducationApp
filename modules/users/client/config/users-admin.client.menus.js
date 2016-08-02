'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.user',
      roles: ['super_admin']    
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Roles',
      state: 'roles.list',
      roles: ['super_admin']    
    });

  }
]);
