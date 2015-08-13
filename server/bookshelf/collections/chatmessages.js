var db = require('../config');
require('../models/chatmessage');

var ChatMessages = db.Collection.extend( {
  model: 'ChatMessage',
});

module.exports = db.collection( 'ChatMessages', ChatMessages );