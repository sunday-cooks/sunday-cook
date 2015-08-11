var db = require( '../config' );
var Tip = require( './tip' );
var Ingredient = require( './ingredient' );
var Tool = require( './tool' );
var StepTool = require( './steptool' );
var User = require( './user' );
var StepUser = require( './stepuser' );

var Step = db.Model.extend( {
  tableName: 'steps',

  ingredients: function () {
    return this.hasMany( Ingredient ).through( IngredientStep );
  },

  tools: function () {
    return this.hasMany( Tool ).through( StepTool );
  },

  tips: function () {
    return this.hasMany( Tip );
  },

  done: function () {
    return this.hasOne( User ).through( StepUser );
  }

});

module.exports = Step;