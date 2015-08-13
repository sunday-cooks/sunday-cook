var db = require( '../config' );
require( './event' );
require( './eventingredient' );

var Ingredient = db.Model.extend({
  tableName: 'ingredients',

  events: function () {
    return this.belongsToMany( 'Event' ).through( 'EventIngredient' );
  },

  steps: function () {
    return this.belongsToMany( 'Step' ).through( 'IngredientStep' );
  }

});

module.exports = db.model( 'Ingredient', Ingredient );