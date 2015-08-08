var db = require('../config');

var Tip = db.Model.extend({
  tableName: 'tips',
});

module.exports = Tip;