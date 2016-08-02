(function () {
  'use strict';

  angular
    .module('forms')
    .controller('FormController', FormController);

  FormController.$inject = ['$scope', '$state', 'categoryResolve','formResolve', '$window', 'Authentication','CategoryService','FormsService','DistrictsService'];

  function FormController($scope, $state, category,form, $window, Authentication,CategoryService,FormsService,DistrictsService) {
    var vm = this;
    vm.form = form;
    vm.authentication = Authentication;
    vm.error = null;
    vm.saveForm = saveForm;
  //  vm.getCkEditorHtml = getCkEditorHtml;

    vm.allCategories = CategoryService.query();
    vm.allForms      = FormsService.query();

/********Deleting From************************************************/
// Delete a category. Issues a DELETE to /api/category/:categoryId
   $scope.deleteForm = function(selectedForm) {
      selectedForm.$delete(function() {
      vm.allForms = FormsService.query();
    });
};

/********Editing Form***********************************************/
   $scope.editForm = function(selectedForm) {
      console.log(selectedForm);
      CKEDITOR.instances['formEditor'].setData(selectedForm.formContent);
      vm.form=selectedForm;
};

/********Save New Form************************************************/
    function saveForm(isValid) {
      vm.form.formContent = CKEDITOR.instances['formEditor'].getData();
      //var HTMLSTRING1 = '<img src="visa-src" /> or your <img src="mc-src" />';
      //console.log($.parseHTML(vm.form.formContent).find("p"));
      var formElementsArray=[];

      $($.parseHTML(vm.form.formContent)).each(function(){
              //console.log($(this).find("input").attr("name"));
              //formElementsArray.push($(this).find("input").attr("name"));
              if($(this).find("input").attr("name")){
              formElementsArray.push($(this).find("input").attr("name"));
            }
          });
      //console.log(formElementsArray);
      vm.form.formElementsArray=formElementsArray;
      console.log(isValid);
      console.log(vm.form);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.formForm');
        return false;
      }

     if (vm.form._id) {
       console.log(vm.form);
          vm.form.$update(successCallback, errorCallback);
          CKEDITOR.instances['formEditor'].setData("Design Your Form");

      } else {
         FormsService.save(vm.form);
         vm.form={};
         vm.allForms = FormsService.query();
         CKEDITOR.instances['formEditor'].setData("Design Your Form Here !!")
         console.log(vm.allForms);
      }

      function successCallback(res) {
        $state.go('forms.generateForm');
        vm.form={};
      }
      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
/*********************************************************************/

/*********CK Editor****************/
  CKEDITOR.replace( 'formEditor' );
/*********End of CK***************/
  }
}());
