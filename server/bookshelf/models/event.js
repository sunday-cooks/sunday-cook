var db        = require( '../config' ),
    Promise  = require( 'bluebird' );
require( './step' );
require( './user' );
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
    var event = {};

    event.name = this.get( 'name' );
    event.description = this.get( 'description' );
    event.ingredients = this.related( 'ingredients' ).toJSON();
    event.tools = this.related( 'tools' ).toJSON();

    return this.related( 'chef' ).fetch( { columns: [ 'id', 'first_name', 'last_name' ] } )
    .then( function ( chef ) {
      event.chef = chef;
      return this.related( 'steps' ).fetch( { withRelated: [ 'ingredients', 'tools' ] } );
    })
    .then( function( steps ) {
      event.steps = steps.toJSON();

      return event;
    });
  },

}, {

  fetchEvent: function ( id ) {
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