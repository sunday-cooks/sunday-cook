var db = require( '../config' );

var Tool = db.Model.extend( {
  tableName: 'tools',
});

module.exports = db.model( 'Tool', Tool );