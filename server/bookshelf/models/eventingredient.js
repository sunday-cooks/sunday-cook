var db          = require( '../config' ),
    Ingredient  = require( './ingredient' ),
    Event       = require( './event' );

var EventIngredient = db.Model.extend({

  tableName: 'events_ingredients',

  event: function () {
    return this.belongsTo( Event );
  },

  ingredient: function () {
    return this.belongsTo( Ingredient );
  },

});

module.exports = EventIngredient;