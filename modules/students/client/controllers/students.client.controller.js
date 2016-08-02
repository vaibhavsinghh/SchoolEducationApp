(function () {
  'use strict';

  angular
    .module('students')
    .controller('StudentController', StudentController);

  StudentController.$inject = ['$compile', '$http', '$rootScope', '$scope', '$state','$stateParams', 'studentResolve','studentFormResolve','$window', 'Authentication','StudentsService','SchoolsService','CategoryService','StudentFormsService'];

  function StudentController($compile, $http, $rootScope, $scope, $state, stateParams, student,studentForm, $window, Authentication, StudentsService, SchoolsService, CategoryService, StudentFormsService) {
    var vm = this;
    console.log($rootScope.districtChosen);
    vm.student = student;
    vm.studentForm=studentForm;
    vm.authentication = Authentication;
    vm.error = null;
    vm.saveStudent = saveStudent;
    vm.saveStudentForm = saveStudentForm;
    vm.downloadStudentForm = downloadStudentForm;
    vm.allStudents = StudentsService.query($rootScope.districtChosen);
    //vm.allStudentForms = StudentFormsService.query();
    vm.allSchools = SchoolsService.query();
    vm.allCategories = CategoryService.query();

   if(!$rootScope.districtChosen){
      $state.go('districts.show');
    }

    /*** show selectedStudent's StudentForms****/
    if(stateParams.studentId){
      $http({ url: '/api/getAllStudentFormsStudentWise/'+stateParams.studentId, method: "GET", params: { studentId: stateParams.studentId }}).success(function (data) {
        vm.allStudentForms=data;
     });
    }

  $scope.openGenStudentFormModal = function(studentObj) {
    //$('#generateStudentFormModal').find('.btn-primary').attr('data-student-id',studentObj._id);
    // console.log('inside student form model');

    $('#generateStudentFormModal').modal('show');
    vm.allCategories = CategoryService.query();
  };

  $scope.openViewStudentFormModal = function(studentFormObj) {

  console.log(studentFormObj);
    $http({ url: '/api/getForm/'+studentFormObj.form._id, method: "GET", params: { formId: studentFormObj.form._id }}).success(function (data) {
      $("#formContent").html(data.formContent);
      $http({ url: '/api/getContentOfSelectedStudentForm/'+studentFormObj._id, method: "GET", params: { studentForm: studentFormObj._id }}).success(function (data) {
           console.log(data);
           var formContentJson={};
           for(var i=0;i<data.length;i++){
             formContentJson[data[i].elementName]=data[i].elementValue;
           }
           populateForm(formContentJson);
      });//End of getFormContent of Particular StudentForm Ajax Call

      $('#saveStudentFormModal').find('.btn-primary').attr('data-studentForm-id',studentFormObj._id);
      $('#saveStudentFormModal').modal('show');
    });//End of getForm Ajax Call
  };

  $scope.closeModal = function() {
    $('#saveStudentFormModal').find('.btn-primary').attr('data-studentForm-id','');
  };


  $scope.getRelevantForms = function() {

   if(vm.selForm) {
     vm.selForm=null;
   }
   $("#formContent").empty();
   $('#showRelForms').empty();

   $http({ url: '/api/getFormsCatWise/'+vm.studentForm.categoryId, method: "GET", params: { categoryId: vm.studentForm.categoryId }}).success(function (data) {

   if(data.length>0) {
     vm.isForms=true;
     for (var i = 0; i < data.length; i++) {
       var radioBtn = $('<input type="radio" class="selForm" name="radioGroup" ng-model="vm.selForm" id='+data[i]._id+' value='+data[i]._id+'>&nbsp;<span>'+data[i].formName+'</span></br>');
       var radioBtntemp = $compile(radioBtn)($scope);
       angular.element($('#showRelForms')).append(radioBtntemp);
    }
   } else{
       $('#showRelForms').html("No Forms Assigned To this Category");
   }
   vm.allForms=data;
   });
  };

  $scope.getFormContent = function() {
    if(!vm.selForm) {
      return false;
    }
    $http({ url: '/api/getForm/'+vm.selForm, method: "GET", params: { formId: vm.selForm }}).success(function (data) {
      $('#generateStudentFormModal').modal('toggle');
      $("#formContent").html(data.formContent);
      $('#saveStudentFormModal').modal('show');
    });
  };

/********Save New StudentForm********************************************/
    function saveStudentForm() {
      var studentForm=$('#saveStudentFormModal').find('.btn-primary').attr('data-studentForm-id');
      if(studentForm){
        vm.studentForm.studentForm=studentForm;
      }
      vm.studentForm.student=$rootScope.selectedStudent;
      vm.studentForm.form=vm.selForm;
          var elementType=null;
          var elementId=null;
          var items = $("form :input(#vm.studentFormForm)").serializeArray();
          var elementsMap=[];
          for(var i=0;i<items.length;i++){
            elementType = $("[name='"+items[i].name+"']").attr( "type" );
            items[i].id=items[i].name;
            items[i].type=elementType;
            elementsMap.push(items[i]);
          }

       vm.studentForm.elementsMap=elementsMap;
       StudentFormsService.save(vm.studentForm);
       $('#saveStudentFormModal').find('.btn-primary').attr('data-studentForm-id','');
       //$state.go('students.viewStudent');
       $('#saveStudentFormModal').modal('toggle');
       console.log(stateParams.studentId);
       $http({ url: '/api/getAllStudentFormsStudentWise/'+stateParams.studentId, method: "GET", params: { studentId: stateParams.studentId }}).success(function (data) {
         vm.allStudentForms=data;
      });

      vm.studentForm={};
      $state.go('students.viewStudent');
    }

    /********save Studen ofmr End ***********/

  /*****Download StuentForm*********/
    function downloadStudentForm() {

      console.log("inside download client");
      var studentFormContent = $("#formContent").html();
      var studentFormId=$('#saveStudentFormModal').find('.btn-primary').attr('data-studentForm-id');
      $http({ url: '/api/downloadStudentForm/', method: "POST", params: { studentFormContent: studentFormContent,studentFormId:studentFormId}}).success(function (data) {
        console.log(data);
          $window.open(data,"_blank");
          //$window.open(data, 'PDF File', 'width=500,height=400');
     });
       $('#saveStudentFormModal').modal('toggle');
    }

/*******end of Download Student Form*******/

/********Deleting Student*******************************************/
   $scope.deleteStudent = function(selectedStudent) {
      selectedStudent.$delete(function() {
        vm.allStudents = StudentsService.query();
      });
   };
/********************************************************************/

  $scope.viewStudent = function(selectedStudent) {
    vm.student=selectedStudent;
    $rootScope.selectedStudent=selectedStudent;
  //  vm.allStudentForms = StudentFormsService.query();
    $state.go('students.viewStudent', {
      studentId: selectedStudent._id
    });
    //vm.student.show=true;
  };

/********Editing Student************************************************/
  $scope.editStudent = function(selectedStudent) {
    vm.student=selectedStudent;
  };
/*********************************************************************/

/********Save New Student********************************************/
    function saveStudent(isValid) {
      vm.student.districtId=$rootScope.districtChosen;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.studentForm');
        return false;
      }

      if (vm.student._id) {
          vm.student.$update(successCallback, errorCallback);
      } else {
          StudentsService.save(vm.student);
        //vm.student={};
        vm.allStudents = StudentsService.query($rootScope.districtChosen);
      }
      function successCallback(res) {
        $state.go('students.students');
        vm.student={};
      }
      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
/*********************************************************************/
  }
}());
