var db = require('../config');

var ChatMessage = db.Model.extend({
  tableName: 'chatmessages',
});

module.exports = ChatMessage;