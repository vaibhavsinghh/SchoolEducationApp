(function () {
  'use strict';

  angular
    .module('roles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Roles',
      state: 'roles',
      type: 'dropdown'
      // roles: ['super_admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'roles', {
      title: 'Manage Roles',
      state: 'roles.list'
      // roles: ['super_admin']
    });
  }
}());
