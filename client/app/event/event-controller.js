angular.module( "event", [ 'video', 'chat', 'step', 'steps', 'stepPercent', 'ngMaterial' ] )
  .controller("eventCtrl", function ( $scope ) {
    $scope.message = "hello";
  });
