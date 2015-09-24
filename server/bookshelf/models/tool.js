var db = require( '../config' );

var Tool = db.Model.extend( {
  tableName: 'tools',
}, {

  newTool: function ( options ) {
    return new this( options ).save();
  }

});

module.exports = db.model( 'Tool', Tool );