angular.module('stepPercent', ['ngMaterial', 'event'])
    .controller('progressCtrl', function ($scope, stepsModel) {
      $scope.mode = 'query';
      var currentStep = stepsModel.currentStep;
      var stepsLength = stepsModel.steps.length;


      function init() {
        $scope.determinateValue = currentStep / stepsLength * 100;
        //console.log('PARTY CITYTTTETEFSE', percentage);
      }

      init();
      $scope.determinateValue2 = 45;
      $scope.$on('changedStep', function(event, mass) {
        currentStep = mass;
        init();
      });

      $scope.$on('regressBar', function(event, mass) {
        currentStep = mass;
        init();
      });
      $scope.$on('progressBar', function(event, mass) {
        currentStep = mass;
        init();
      });

    })
    .directive('stepPercent', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/event/step/progress-bar.html'
      };
    })
  ;