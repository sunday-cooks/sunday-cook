var db    = require( '../config' ),
    Step  = require( './step' );

var Tip = db.Model.extend( {
  tableName: 'tips',

  step: function () {
    this.belongsTo( Step );
  },
});

module.exports = Tip;