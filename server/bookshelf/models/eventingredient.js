var db = require( '../config' );
var Ingredient = require('./ingredient');
var Event = require('./event');

var EventIngredient = db.Model.extend({

  tableName: 'events_ingredients',

  event: function() {
    return this.belongsTo( Event );
  },

  ingredient: function() {
    return this.belongsTo( Ingredient );
  },

});

module.exports = EventIngredient;