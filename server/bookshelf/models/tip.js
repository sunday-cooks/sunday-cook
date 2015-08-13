var db = require( '../config' );
require( './step' );

var Tip = db.Model.extend( {
  tableName: 'tips',

  step: function () {
    this.belongsTo( 'Step' );
  },
});

module.exports = db.model( 'Tip', Tip );