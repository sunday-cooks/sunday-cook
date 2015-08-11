angular.module("createEvent", ['ngMaterial'])
 
  .controller("createCtrl", function ($scope, $mdUtil, $log) {
    $scope.toggleStep = buildToggler('stepOne');
    function buildToggler(stepID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    }
  });
  // .directive('createEvent', function () {
  //   return {
  //     restrict: 'EA',
  //     templateUrl: 'app/create/create-controller.html'
  //   };
  // });