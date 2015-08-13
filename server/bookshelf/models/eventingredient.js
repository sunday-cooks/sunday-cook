var db = require( '../config' );
require( './ingredient' );
require( './event' );

var EventIngredient = db.Model.extend({

  tableName: 'events_ingredients',

  event: function () {
    return this.belongsTo( 'Event' );
  },

  ingredient: function () {
    return this.belongsTo( 'Ingredient' );
  },

});

module.exports = db.model( 'EventIngredient', EventIngredient );