var db = require('../config');
var Event = require('./event');
var User = require('./user');

var Note = db.Model.extend({
  tableName: 'notes',
  user: this.belongsTo(User);
  event: this.belongsTo(Event);
});

module.exports = Note;