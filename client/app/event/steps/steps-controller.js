angular.module('steps', ['ngMaterial', 'event'])
  // .config(function($mdIconProvider) {
  //  $mdIconProvider
  //    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
  //    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
  //    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
  //    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  // })
  .controller('ListCtrl', function ($scope, stepsModel) {
    var steps = stepsModel.steps;
    $scope.steps = stepsModel.steps;
    //$scope.isComplete = stepsModel.steps;
    //$scope.markComplete = stepsModel.steps[currentStepNumber].isComplete;
    $scope.changeToStep = function (clickedStep) {
      stepsModel.goToStep(clickedStep);
    };
  })
  .directive('steps', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/steps/steps.html'
    };
  });