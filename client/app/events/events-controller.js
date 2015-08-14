angular.module( 'events', ['event'])
  .controller( 'EventsController', function( $scope, eventModel ) {
    $scope.eventsList = eventModel.eventObject.getEventDetails();
    console.log( $scope.eventsList );
  });