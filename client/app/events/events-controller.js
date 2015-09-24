angular.module( 'events', ['event'])
  .controller( 'eventsCtrl', function( $scope, eventModel ) {
    $scope.eventsList = eventModel.getEventDetails( '', function( results ) {
      console.log( results );
    });

    console.log( $scope.eventsList );
  });