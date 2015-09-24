angular.module('stepPercent', ['ngMaterial', 'event'])
    .controller('progressCtrl', function ($scope, stepsModel) {
      $scope.mode = 'determinate';
      var currentStep = stepsModel.currentStep;
      var stepsLength = stepsModel.steps.length;

      $scope.determinateValue = currentStep / stepsLength * 100;

      $scope.determinateValue2 = 45;
      $scope.$on('goToStep', function(event, currentStep) {
        $scope.determinateValue = currentStep / stepsLength * 100;
      });

      $scope.$on('stepChange', function(event, currentStep) {
        $scope.determinateValue = currentStep / stepsLength * 100;
      });

    })
    .directive('stepPercent', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/event/step/progress-bar.html'
      };
    })
  ;