(function () {
  'use strict';

  angular
    .module('forms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('forms', {
        abstract: true,
        url: '/forms',
        template: '<ui-view/>'
      })
      .state('forms.category', {
        url: '/category',
        templateUrl: 'modules/forms/client/views/category.client.view.html',
        controller: 'CategoryController',
        controllerAs: 'vm',
         resolve: {
          categoryResolve: newCategory,
          formResolve: newForm
        },
        data: {
          roles: ['super_admin'],
          pageTitle: 'New Category'
        }
      }).state('forms.generateForm', {
        url: '/generateForm',
        templateUrl: 'modules/forms/client/views/generate-form.client.view.html',
        controller: 'FormController',
        controllerAs: 'vm',
         resolve: {
          categoryResolve: newCategory,
          formResolve: newForm
        },
        data: {
          roles: ['super_admin'],
          pageTitle: 'New Form'
        }
      });
  }

  newForm.$inject = ['FormsService'];

  function newForm(FormsService) {
    return new FormsService();
  }


  newCategory.$inject = ['CategoryService'];

    function newCategory(CategoryService) {
      return new CategoryService();
    }


})();
