angular.module('step', ['ngMaterial', 'stepPercent'])
  .controller('stepCtrl', function ($scope, $log, stepsModel) {
    var step = stepsModel.steps;
    var currentStep = stepsModel.currentStep;
    $scope.stepsLength = step.length;

    function init() {
      $scope.step = step[currentStep -1];
      $scope.tabs = step[currentStep -1].tabs;
      $scope.about = step[currentStep -1][0];
      $scope.ingredients = step[currentStep -1][1];
      $scope.tools = step[currentStep -1][2];
    }

    $scope.markComplete = function () {
      console.log('current is: ', currentStep);
      step[currentStep -1].isComplete = true;
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
      console.log('I should be fired');
      if (step[currentStep] ) {
        currentStep += 1;
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
      selected = step[currentStep].tabs[current];
      // if ( old + 1 && (old !== current)) $log.debug('Goodbye ' + previous.title + '!');
      // if ( current + 1 ) $log.debug('Hello ' + selected.title + '!');
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

