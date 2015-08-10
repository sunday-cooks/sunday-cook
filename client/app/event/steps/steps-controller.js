angular.module("steps", [])
  .controller("stepsCtrl", function ($scope) {

  })
  .directive('steps', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/steps/steps.html'
    };
  });

