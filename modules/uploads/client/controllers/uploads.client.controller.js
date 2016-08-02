(function () {
  'use strict';

  // Uploads controller
  angular
    .module('uploads')
    .controller('UploadsController', UploadsController);

  UploadsController.$inject = ['FileSaver','Blob','$location','$compile','$http','$window', '$timeout', '$scope', '$state', 'Authentication', 'uploadResolve', 'FileUploader', 'CategoryService'];

  function UploadsController (FileSaver, Blob, $location,$compile,$http, $window, $timeout, $scope, $state, Authentication, upload, FileUploader, CategoryService) {

    var vm = this;
    vm.allCategories = CategoryService.query();
    /********* getgetRelevantForms on chnage of category**********/
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
/***********End of getRelevantForms************/
/***********Beginning of download Form ***********/
  $scope.downloadForm = function() {
    if(!vm.selForm) {
      return false;
    }

   $http({ url: '/api/uploads/downloadForm/'+vm.selForm, method: "GET", params: { formId: vm.selForm }}).success(function (data) {
      console.log(data.location);
      $window.open(data.location,"_self");
    });

  }
  $scope.exportToExcel =  function() {

    // You have to use http GET, otherwise browsers will not download the excel
    $http({method: 'GET', url: "/api/uploads/downloadForm/exportToExcel/",
        // This is important! Tell it to expect an arraybuffer
        responseType: "arraybuffer"}).
        success(function(data, status, headers, config) {
            // use the saveAs library to save the buffer as a blob on the user's machine. Use the correct MIME type!
            saveAs(new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), "excel.xlsx");
        }).
        error(function(data, status, headers, config) {

        });
}
/********************end of download Form ***********/
/***********Upload Excel Logic***********************/
      $scope.user = Authentication.user;
      $scope.fileURL = $scope.user.fileURL;
      $scope.uploader = new FileUploader({
        url: 'api/uploa/uploadExcelFile',
        alias: 'newExcelFile'
      });

      $scope.uploader.filters.push({
        name: 'customFilter',
          fn: function(item, options) {
              return this.queue.length < 10;
          }
      });

      $scope.uploader.onAfterAddingFile = function (fileItem) {
        if ($window.FileReader) {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(fileItem._file);

          fileReader.onload = function (fileReaderEvent) {
            $timeout(function () {
              $scope.fileURL = fileReaderEvent.target.result;
            }, 0);
          };
        }
      };

      $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
        $scope.success = true;
        $scope.user = Authentication.user = response;
        //  $window.open($scope.fileURL, 'Excel File', 'width=500,height=400');
      //  $scope.cancelUpload();
      };


      $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
        //$scope.cancelUpload();
        $scope.error = response.message;
      };

    /*  $scope.uploadProfilePicture = function () {
        $scope.success = $scope.error = null;
        $scope.uploader.uploadAll();
      };*/

      $scope.cancelUpload = function () {
        $scope.uploader.clearQueue();
      };
/*********End of Upload Excel Logic************/
  }
})();
