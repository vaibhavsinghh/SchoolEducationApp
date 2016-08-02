(function () {
  'use strict';

  angular
    .module('students')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Students',
      state: 'students.students',
        roles: ['super_admin']
    });
  }
})();
