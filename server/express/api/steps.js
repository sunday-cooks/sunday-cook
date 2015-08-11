var Step        = require( '../../bookshelf/models/step' ),
    User        = require( '../../bookshelf/models/user' ),
    StepUser    = require( '../../bookshelf/models/stepuser' ),
    Promise     = require( 'bluebird' );

module.exports = function ( app, router ) {
  router.post( '/events/:eventid/step/:stepid/mark', function ( req, res, next ) {
    var eventid = req.params.eventid;
    var stepid = req.params.stepid;

    Promise.join( Event.fetchEvent( eventid ), Step.fetchStep( stepid ),
      function( event, step ) {
        if ( !event ) { res.sendStatus( 400 ); return Promise.reject( new Error( "invalid event id specified" ) ); }
        else if ( !step ) { res.sendStatus( 400 ); return Promise.reject( new Error( "invalid step id specified" ) ); }
        else {
          return step.done.where( { step_id: stepid, user_id: req.user.get( 'id' ) } ).fetch();
        }
    })
    .then( function ( step_user ) {
      var done = false;
      if ( step_user ) { done = step_user.get( 'done' ); }
      else {
        done = true;
        return new StepUser( { step_id: stepid, user_id: req.user.get( 'id' ), done: true } ).save();
      }

      res.json( { id: stepid, done: done } );
    });
  });
};