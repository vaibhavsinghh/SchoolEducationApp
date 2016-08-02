(function () {
  'use strict';

  angular
    .module('uploads')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Uploads',
      state: 'uploads.uploads',
      type: 'dropdown',
      roles: ['super_admin']
    });


    Menus.addSubMenuItem('topbar', 'uploads.uploads', {
      title: 'Download StudentForm',
      state: 'uploads.downloadExcel',
      roles: ['super_admin']
    });
    Menus.addSubMenuItem('topbar', 'uploads.uploads', {
      title: 'Upload StudentForm',
      state: 'uploads.uploads',
      roles: ['super_admin']
    });
    // Add the dropdown list item
  /*  Menus.addSubMenuItem('topbar', 'uploads', {
      title: 'List Uploads',
      state: 'uploads.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'uploads', {
      title: 'Create Upload',
      state: 'uploads.create',
      roles: ['user']
    });*/
  }
})();
