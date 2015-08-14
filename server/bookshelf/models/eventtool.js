var db = require( '../config' );
require( './tool' );
require( './event' );

var EventTool = db.Model.extend({

  tableName: 'events_tools',

  event: function () {
    return this.belongsTo( 'Event' );
  },

  tool: function () {
    return this.belongsTo( 'Tool' );
  },

});

module.exports = db.model( 'EventTool', EventTool );