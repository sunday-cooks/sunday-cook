var db              = require( '../config' ),
    Tip             = require( './tip' ),
    Ingredient      = require( './ingredient' ),
    IngredientStep  = require( './ingredientstep' ),
    Tool            = require( './tool' ),
    StepTool        = require( './steptool' ),
    User            = require( './user' ),
    StepUser        = require( './stepuser' );

var Step = db.Model.extend( {
  tableName: 'steps',

  ingredients: function () {
    return this.belongsToMany( Ingredient ).through( IngredientStep ).withPivot( 'qty' );
  },

  tools: function () {
    return this.belongsToMany( Tool ).through( StepTool );
  },

  tips: function () {
    return this.hasMany( Tip );
  },

  done: function () {
    return this.belongsToMany( User ).through( StepUser );
  }

});

module.exports = Step;