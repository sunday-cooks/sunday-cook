var db = require('../config');

var Ingredient = db.Model.extend({
  tableName: 'ingredients',
});

module.exports = Ingredient;