(function () {
  'use strict';

  angular
    .module('reports')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Reports',
      state: 'reports',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'reports', {
      title: 'List Reports',
      state: 'reports.list'
    });
  }
})();
