//Forms service used to communicate Forms REST endpoints
(function () {
  'use strict';

var app = angular
    .module('forms')
    .factory('FormsService', FormsService);

  FormsService.$inject = ['$resource'];

  function FormsService($resource) {
    return $resource('api/forms/:formId', {
      formId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  app.factory('CategoryService', CategoryService);
  function CategoryService($resource) {
    return $resource('api/category/:categoryId', {
      categoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  };

})();
