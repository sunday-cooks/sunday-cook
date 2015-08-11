var Event = require( '../../bookshelf/models/event' );

module.exports = function ( app, router ) {
  router.get( '/events/:eventid', function( req, res, next ) {
    var eventid = req.params.eventid;
    Event.fetchEvent( eventid )
    .then( function ( event ) {
      if ( !event ) { next(); } //Failed routing.
      else { res.json( event.eventDetails() ); }
    } );
  } );
};