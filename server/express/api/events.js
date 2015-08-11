var Event       = require( '../../bookshelf/models/event' ),
    Ingredient  = require( '../../bookshelf/models/ingredient' ),
    Tool        = require( '../../bookshelf/models/tool' ),
    Tip         = require( '../../bookshelf/models/tip' ),
    Step        = require( '../../bookshelf/models/step' ),
    User        = require( '../../bookshelf/models/user' ),
    Promise     = require( 'bluebird' );

module.exports = function ( app, router ) {
  router.get( '/events/:eventid', function( req, res, next ) {
    var eventid = req.params.eventid;
    Event.fetchEvent( eventid )
    .then( function ( event ) {
      if ( !event ) { next(); } //Failed routing.
      else { res.json( event.eventDetails() ); }
    } );
  } );

  router.post( '/events/create', function ( req, res, next ) {
    var data        = req.body,
        chef        = req.user,
        ingredients = [],
        tools       = [],
        tips        = [],
        steps       = [];

    // Our user is not logged in.
    if ( !chef ) { res.redirect( '/' ); return; }

    // Create our ingredients models and their promise
    req.body.ingredients.forEach( function ( ingredient ) {
      ingredients.push( new Ingredient( ingredient ).save() );
    });

    // Create our tools models and their promise
    req.body.tools.forEach( function ( tool ) {
      tools.push( new Tool( tool ).save() );
    });

    // Create our tips models and their promise
    req.body.steps.tips.forEach( function ( tip ) {
      tips.push( new Tip( { text: tip } ).save() );
    });

    // Create our steps models and their promise
    req.body.steps.forEach( function ( step ) {
      steps.push( new Step( {
        name: step.name,
        min_duration: step.min_duration,
        max_duration: step.max_duration,
        details: step.details,
      } ).save() );
    });

    Promise.all( ingredients )
    .then( function ( coll ) {
      ingredients = coll;
      return Promise.all( tools );
    })
    .then ( function( coll ) {
      tools = coll;
      return Promise.all( tips );
    })
    .then( function ( coll ) {
      tips = coll;
      return Promise.all( steps );
    })
    .then( function ( coll ) {
      coll.forEach( function( step_model, index ) {
        var step = data.steps[index];
        var step_ingredients = step.ingredients.map( function ( ingredient ) {
          return { ingredient_id: ingredients[ingredient.index].get( 'id' ), qty: ingredient.qty };
        });

        step_model.related( 'ingredients' ).attach( step_ingredients );

        var step_tools = step.tools.map( function ( tool ) {
          return tools[tool.index].get( 'id' );
        });

        step_model.related( 'tools' ).attach( step_tools );
        step_model.related( 'tips' ).attach( tips );
      });

      steps = coll;
      return new Event( { name: data.event, description: data.biography } ).save();
    })
    .then( function( event ) {
      event.related( 'steps' ).attach( steps );
      event.related( 'ingredients' ).attach( ingredients );
      event.related( 'tools' ).attach( tools );
      event.related( 'chef' ).attach( chef );
    });
  });
};