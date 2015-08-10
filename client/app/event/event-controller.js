angular.module("event", ['video', 'chat', 'step', 'steps'])
  .controller("eventCtrl", function ($scope) {
    $scope.message = "hello";
  });
