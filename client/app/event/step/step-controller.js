angular.module('step', ['ngMaterial', 'stepPercent'])
  .controller('stepCtrl', function ($scope, $log, stepsModel) {
      var totalSteps = stepsModel.GetData();
      var currentStep = stepsModel.steps.currentStep;
      $scope.stepsLength = totalSteps.length;

      var init = function () {
        $scope.step = totalSteps[currentStep -1];
        $scope.tabs = totalSteps[currentStep -1].tabs;
        $scope.about = totalSteps[currentStep -1][0];
        $scope.ingredients = totalSteps[currentStep -1][1];
        $scope.tools = totalSteps[currentStep -1][2];
      };

      $scope.markComplete = function () {
        totalSteps[currentStep -1].isComplete = true;
        //console.log(totalSteps[currentStep -1]);
        $scope.nextStep(currentStep);
      };

      $scope.prevStep = function () {
        if (currentStep - 1 > 0) {
          currentStep -= 1;
          init();
          $scope.$emit('stepChange', currentStep);
        } else {
          console.log('this is the first step');
        }
      };

      $scope.nextStep = function () {
        if (currentStep < totalSteps.length ) {
          currentStep += 1;
          console.log('current step is ', currentStep);
          init();
          $scope.$emit('stepChange', currentStep);
        } else {
          console.log('this is the last step');
        }
      };

      $scope.$on('goToStep', function(event, mass) {
        currentStep = mass;
        init();
      });

      var selected = null,
          previous = null;
      $scope.selectedIndex = 2;
      $scope.$watch('selectedIndex', function(current, old){
        previous = selected;
        selected = totalSteps[currentStep].tabs[current];
      });

      init();
  })
  .directive('step', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/event/step/step.html'
    };
  })
;

