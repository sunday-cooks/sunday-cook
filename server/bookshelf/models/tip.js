var db = require( '../config' );
require( './step' );

var Tip = db.Model.extend( {
  tableName: 'tips',

  step: function () {
    this.belongsTo( 'Step' );
  },
}, {

  newTip: function ( options ) {
    return new this( options ).save();
  },

});

module.exports = db.model( 'Tip', Tip );