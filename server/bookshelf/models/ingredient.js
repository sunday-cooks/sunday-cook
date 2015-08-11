var db              = require( '../config' ),
    Event           = require( './event' ),
    EventIngredient = require( './eventingredient' );

var Ingredient = db.Model.extend({
  tableName: 'ingredients',

  events: function () {
    return this.belongsToMany( Event ).through( EventIngredient );
  },

  steps: function () {
    return this.belongsToMany( Step ).through( IngredientStep );
  }

});

module.exports = Ingredient;