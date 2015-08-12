var db = require('../config');
var Ingredient = require('../models/ingredient');

var Ingredients = new db.Collection();

Ingredients.model = Ingredient;

module.exports = Ingredients;