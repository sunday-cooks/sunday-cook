var db = require( '../config' );
require('./step' );
require( './ingredient' );

var IngredientStep = db.Model.extend({

  tableName: 'ingredients_steps',

  step: function () {
    return this.belongsTo( 'Step' );
  },

  ingredient: function () {
    return this.belongsTo( 'Ingredient' );
  },
});

module.exports = db.model( 'IngredientStep', IngredientStep );