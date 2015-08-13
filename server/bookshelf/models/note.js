var db    = require( '../config' );
require( './event' );
require( './user' );

var Note = db.Model.extend( {
  tableName: 'notes',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo( 'User' );
  },

  event: function() {
    this.belongsTo( 'Event' );
  },
});

module.exports = db.model( 'Note', Note );