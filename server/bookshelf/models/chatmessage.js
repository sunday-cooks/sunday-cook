var db = require('../config');

var ChatMessage = db.Model.extend({
  tableName: 'chatmessages',
  hasTimestamps: true,
});

module.exports = db.model( 'ChatMessage', ChatMessage );