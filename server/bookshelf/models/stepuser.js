var db    = require( '../config' ),
    Step  = require( './step' ),
    User  = require( './user' );

var StepUser = db.Model.extend( {

  tableName: 'steps_users',

  step: function () {
    return this.belongsTo( Step );
  },

  user: function () {
    return this.belongsTo( User );
  },

});

module.exports = StepUser;