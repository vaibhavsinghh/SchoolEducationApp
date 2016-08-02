(function () {
  'use strict';

  angular
    .module('districts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Districts',
      state: 'districts',
      type: 'dropdown',
      roles: ['super_admin']
    })

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'districts', {
      title: 'List Districts',
      state: 'districts.list',
      roles: ['super_admin']
    });
  }
})();
