var db = require( '../config' );
require( './user' );
require( './event' );

var ChatMessage = db.Model.extend({
  tableName: 'chatmessages',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo( 'User' );
  },

  event: function() {
    return this.belongsTo( 'Event' );
  },

}, {

  newMessage: function ( text, eventid, user ) {
    return new this( {
      'text': text,
      'user_id': user.get( 'id' ),
      'profilepic_url': user.getProfilePicURL(),
      'event_id': eventid,
    }).save();
  },

});

module.exports = db.model( 'ChatMessage', ChatMessage );