var db = require('../config');
var ChatMessage = require('../models/chatmessage');

var ChatMessages = db.Collection.extend( {
  model: ChatMessage,
});

module.exports = ChatMessages;