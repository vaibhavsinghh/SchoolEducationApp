(function () {
  'use strict';

  angular
    .module('forms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Forms',
      state: 'forms',
      type: 'dropdown',
      roles: ['super_admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'forms', {
      title: 'Create Category',
      state: 'forms.category',
      roles: ['super_admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'forms', {
      title: 'Generate Form',
      state: 'forms.generateForm',
      roles: ['super_admin']
    });
  }
})();
