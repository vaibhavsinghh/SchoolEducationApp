(function () {
  'use strict';

  angular
    .module('schools')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Schools',
      state: 'schools',
      type: 'dropdown',
      roles: ['super_admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'schools', {
      title: 'Create School',
      state: 'schools.create',
      roles: ['super_admin']
    });

  }
})();
