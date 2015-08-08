var db = require('../config');

var Step = db.Model.extend({
  tableName: 'steps',
});

module.exports = Step;