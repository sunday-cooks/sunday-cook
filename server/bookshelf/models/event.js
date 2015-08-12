var db              = require( '../config' ),
    Step            = require( './step' ),
    User            = require( './user' ),
    Ingredient      = require( './ingredient' ),
    EventIngredient = require( './eventingredient' ),
    Tool            = require( './tool' ),
    EventTool       = require( './eventtool' );

var Event = db.Model.extend( {
  tableName: 'events',
  hasTimestamps: true,

  steps: function () {
    return this.hasMany( Step );
  },

  chef: function () {
    return this.belongsTo( User );
  },

  ingredients: function () {
    return this.belongsToMany( Ingredient ).through( EventIngredient ).withPivot( 'qty' );
  },

  tools: function () {
    return this.belongsToMany( Tool ).through( EventTool );
  }

  eventDetails: function () {
    var event = {};

    event.name = this.get( 'name' );
    event.description = this.get( 'description' );
    event.ingredients = this.related( 'ingredients' ).toJSON();
    event.steps = this.related( 'steps' ).toJSON();
    event.chef = this.related( 'chef' ).toJSON();
    event.tools = this.related( 'tools' ).toJSON();

    return event;
  },

}, {

  fetchEvent: function ( id ) {
    return new this( { id: id } ).fetch( {
      require: true,
      withRelated: [
        'ingredients',
        'steps',
        'chef',
        'tools'
        ],
    });
  },

});

module.exports = Event;