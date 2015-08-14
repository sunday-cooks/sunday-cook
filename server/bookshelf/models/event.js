var db        = require( '../config' ),
    Promise   = require( 'bluebird' );
require( './user' );
require( './step' );
require( './ingredient' );
require( './eventingredient' );
require( './tool' );
require( './eventtool' );
require( './chatmessage' );

var Event = db.Model.extend( {
  tableName: 'events',
  hasTimestamps: true,

  steps: function () {
    return this.hasMany( 'Step' );
  },

  chef: function () {
    return this.belongsTo( 'User' );
  },

  ingredients: function () {
    return this.belongsToMany( 'Ingredient' ).through( 'EventIngredient' ).withPivot( 'qty' );
  },

  tools: function () {
    return this.belongsToMany( 'Tool' ).through( 'EventTool' );
  },

  chatMessages: function () {
    return this.hasMany( 'ChatMessage' );
  },

  // This is a promise!!!
  eventDetails: function () {
    var thisEvent = this;
    var event = {};

    event.name = thisEvent.get( 'name' );
    event.description = thisEvent.get( 'description' );
    event.ingredients = thisEvent.related( 'ingredients' ).toJSON();
    event.tools = thisEvent.related( 'tools' ).toJSON();

    return db.model( 'User' ).fetchUserbyId( thisEvent.related( 'chef' ).get( 'id' ) )
    .then( function ( chef ) {
      event.chef = chef.toJSON();
      return thisEvent.related( 'steps' ).fetch( { withRelated: [ 'ingredients', 'tools' ] } );
    })
    .then( function( steps ) {
      event.steps = steps.toJSON();

      return event;
    });
  },

}, {

  newEvent: function ( options ) {
    return new this( options ).save();
  },

  fetchEventbyId: function ( id ) {
    return new this( { id: id } ).fetch( {
      //require: true,
      withRelated: [
        'ingredients',
        'steps',
        'chef',
        'tools',
        'chatMessages',
        ],
    });
  },

});

module.exports = db.model( 'Event', Event );