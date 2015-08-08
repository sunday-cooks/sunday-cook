var db = require('../config');

var Event = db.Model.extend({
  tableName: 'events',
});

module.exports = Event;