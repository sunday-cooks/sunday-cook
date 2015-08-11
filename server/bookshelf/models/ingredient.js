var db = require( '../config' );
var Event = require( './event' );
var EventIngredient = require( './eventingredient' );

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