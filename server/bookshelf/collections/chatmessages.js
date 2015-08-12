var db = require('../config');
var ChatMessage = require('../models/chatmessage');

var ChatMessages = new db.Collection();

ChatMessages.model = ChatMessage;

module.exports = ChatMessages;