(function () {
  'use strict';

  angular
    .module('forms')
    .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$scope', '$state', 'categoryResolve','formResolve', '$window', 'Authentication','CategoryService','FormsService','DistrictsService'];

  function CategoryController($scope, $state, category,form, $window, Authentication,CategoryService,FormsService,DistrictsService) {
    var vm = this;

    vm.category = category;
    vm.form = form;
    vm.authentication = Authentication;
    vm.error = null;
    vm.saveCategory = saveCategory;


    vm.allCategories = CategoryService.query();
    vm.allDistricts  = DistrictsService.query();

/********Deleting Category*******************************************/
   $scope.deleteCategory = function(selectedCategory) {
      selectedCategory.$delete(function() {
      vm.allCategories = CategoryService.query();
    });
};
/************************************************************************/
/********Editing CAtegory************************************************/
   $scope.editCategory = function(selectedCategory) {
      console.log(selectedCategory);
      vm.category.districtId=selectedCategory._id;
      vm.category=selectedCategory;
};
/*********************************************************************/

/********Save New Category********************************************/
    function saveCategory(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.categoryForm');
        return false;
      }

     if (vm.category._id) {
        vm.category.$update(successCallback, errorCallback);
      } else {
        CategoryService.save(vm.category);
        console.log(vm.category);
        vm.category={};
        vm.allCategories = CategoryService.query();
      }
      function successCallback(res) {
        $state.go('forms.category');
        vm.category={};
      }
      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
/*********************************************************************/

// Save FormCategory
   /* function saveNewForm() {
     console.log(vm.newForm);
      vm.newForm.$save(successCallback, errorCallback);
      //vm.allCategories = FormCategoryService.query();

      function successCallback(res) {
        $state.go('forms.createFormCategory', {
          formId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
/*Survey Ediotr*/

 /*function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        url = url.toLowerCase(); // This is just to avoid case sensitiveness
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var editor = new SurveyEditor.SurveyEditor("editor");
    var surveyId = getParameterByName("surveyid");
    if(surveyId) {
        editor.loadSurvey(surveyId);
    }*/
/* end of survey Ediotr */
/*$(document).ready(function() {
    $('#example').DataTable();
} );
*/

  }
}());
