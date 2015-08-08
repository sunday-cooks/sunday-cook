var db = require( '../config' );
var Step = require( './step' );
var User = require( './user' );
var Ingredient = require( './ingredient' );
var Tool = require( './tool' );

var Event = db.Model.extend({
  tableName: 'events',

  steps: function() {
    return this.hasMany( Step );
  },

  chef: function() {
    return this.belongsTo( User );
  },

  ingredients: function() {
    return this.hasMany( Ingredient );
  },

  tools: function() {
    return this.hasMany( Tool );
  }

});

module.exports = Event;