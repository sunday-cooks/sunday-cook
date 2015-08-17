angular.module('steps', ['ngMaterial', 'event'])
  .controller('ListCtrl', function ($scope, stepsModel) {
    var vm = this;
    vm.steps = stepsModel.GetData();
    vm.currentStep = stepsModel.currentStep;
    vm.changeToStep = function (clickedStep) {
      stepsModel.steps.goToStep(clickedStep);
      vm.currentStep = clickedStep;
    };
  })
  .directive('steps', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/steps/steps.html'
    };
  });