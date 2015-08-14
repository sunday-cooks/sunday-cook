var Event       = require( '../../bookshelf/models/event' ),
    Ingredient  = require( '../../bookshelf/models/ingredient' ),
    Tool        = require( '../../bookshelf/models/tool' ),
    Tip         = require( '../../bookshelf/models/tip' ),
    Step        = require( '../../bookshelf/models/step' ),
    User        = require( '../../bookshelf/models/user' ),
    Promise     = require( 'bluebird' ),
    _           = require( 'lodash' );

module.exports = function ( app, router ) {
  router.get( '/events/:eventid', function( req, res, next ) {
    var eventid = req.params.eventid;
    Event.fetchEvent( eventid )
    .then( function ( event ) {
      if ( !event ) { res.sendStatus( 400 ); }
      else {
        event.eventDetails().then( function ( event ) {
          res.json( event );
        });
      }
    });
  });

  router.post( '/events/create', function ( req, res, next ) {
    var data        = req.body,
        chef        = req.user;

    // Our user is not logged in.
    if ( !chef ) { res.redirect( '/' ); return; }

    // Create our ingredients models and their promise
    var ingredients = _.map( data.ingredients, function ( ingredient ) {
      return new Ingredient( { name: ingredient.name, buy_url: ingredient.buy_url } ).save();
    });

    // Create our tools models and their promise
    var tools = _.map( data.tools, function ( tool ) {
      return new Tool( tool ).save();
    });

    // Create our steps models and their promise
    var steps = _.map( data.steps, function( step ) {
      return new Step( {
        name: step.name,
        min_duration: step.min_duration,
        max_duration: step.max_duration,
        details: step.details,
      } ).save();
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
          new Tip( { text: tiptext } ).save().then( function( tip ) {
            step_model.related( 'tips' ).create( tip );
          });
        });
      });

      steps = coll;
      return new Event( { name: data.name, description: data.description } ).save();
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
