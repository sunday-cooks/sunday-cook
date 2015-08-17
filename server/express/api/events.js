var Event       = require( '../../bookshelf/models/event' ),
    Promise     = require( 'bluebird' ),
    _           = require( 'lodash' ),
    url         = require( 'url' );
                  require( '../../bookshelf/collections/events' );
                  require( '../../bookshelf/models/ingredient' );
                  require( '../../bookshelf/models/tool' );
                  require( '../../bookshelf/models/tip' );
                  require( '../../bookshelf/models/step' );
                  require( '../../bookshelf/models/user' );

module.exports = function ( app, router ) {
  router.get( '/events', function ( req, res, next ) {
    db.collection( 'Events' ).fetchEvents()
    .then( function ( coll ) {
      res.json( coll.toJSON() );
    });
  });

  router.get( '/events/:eventid', function ( req, res, next ) {
    var eventid = parseInt( req.params.eventid );

    if ( _.isNaN( eventid ) || !_.isNumber( eventid ) ) {
      eventid = url.parse( req.url, true ).query.eventId;
    }

    if ( !_.isNaN( eventid ) && _.isNumber( eventid ) ) {
      db.model( 'Event' ).fetchEventbyId( eventid )
      .then( function ( event ) {
        if ( !event ) { res.sendStatus( 400 ); }
        else {
          event.eventDetails().then( function ( event ) {
            res.json( event );
          });
        }
      });
    } else {
      res.sendStatus( 400 );
    }
  });

  router.post( '/events/create', function ( req, res, next ) {
    var data        = req.body,
        chef        = req.user;

    // Our user is not logged in.
    if ( !chef ) { res.sendStatus( 400 ); return; }

    // Create our ingredients models and their promise
    var ingredients = _.map( data.ingredients, function ( ingredient ) {

      return db.model( 'Ingredient' ).newIngredient( { name: ingredient.name, buy_url: ingredient.buy_url } );
    });

    // Create our tools models and their promise
    var tools = _.map( data.tools, function ( tool ) {
      return db.model( 'Tool' ).newTool( tool );
    });

    // Create our steps models and their promise
    var steps = _.map( data.steps, function( step ) {
      return db.model( 'Step' ).newStep( {
        name: step.name,
        min_duration: step.min_duration,
        max_duration: step.max_duration,
        details: step.details,
      });
    });

    Promise.all( ingredients )
    .then( function ( coll ) {
      ingredients = coll;
      return Promise.all( tools );
    })
    .then ( function( coll ) {
      tools = coll;
      return Promise.all( steps );
    })
    .then( function ( coll ) {
      coll.forEach( function( step_model, index ) {

        var step = data.steps[index];

        var step_ingredients = _.reduce( step.ingredients, function ( memo, ingredient, index ) {
          if ( ingredient.value ) {
            memo.push( { ingredient_id: ingredients[index].get( 'id' ), qty: ingredient.qty } );
          }

          return memo;
        }, []);

        step_model.related( 'ingredients' ).attach( step_ingredients );

        var step_tools = _.reduce( step.tools, function ( memo, tool, index ) {
          if ( tool.value ) {
            memo.push( tools[index].get( 'id' ) );
          }

          return memo;
        }, []);

        step_model.related( 'tools' ).attach( step_tools );


        _.each( step.tips, function( tiptext ) {
          db.model( 'Tip' ).newTip( { text: tiptext } ).then( function( tip ) {
            step_model.related( 'tips' ).create( tip );
          });
        });
      });

      steps = coll;
      return db.model( 'Event' ).newEvent();
    })
    .then( function ( event ) {
      _.each( steps, function ( step ) {
          event.related( 'steps' ).create( step );
      });

      var ingrel = event.related( 'ingredients' );

      ingredients.forEach( function ( ingredient, index ) {
        event.related( 'ingredients' ).attach( {
          ingredient_id: ingredient.get( 'id' ),
          event_id: event.get( 'id' ),
          qty: data.ingredients[index].qty,
        });
      });

      event.related( 'tools' ).attach( tools );
      chef.related( 'events' ).create( event );

      process.verb( 'Responding with', { id: event.get( 'id' ), created_at: event.get( 'created_at' ) } );
      res.status(201).json( { id: event.get( 'id' ), created_at: event.get( 'created_at' ) } );
    });
  });
};
