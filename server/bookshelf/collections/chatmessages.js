var db          = require( '../config' ),
    ChatMessage = require( '../models/chatmessage' );

var ChatMessages = db.Collection.extend( {
  model: ChatMessage,
}, {

  fetchMessages: function ( eventId ) {
    return new this().where( { 'event_id': eventId } ).fetch();
  },

});

module.exports = db.collection( 'ChatMessages', ChatMessages );