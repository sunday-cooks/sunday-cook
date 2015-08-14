var db    = require( '../config' );
require( './step' );
require( './user' );

var StepUser = db.Model.extend( {

  tableName: 'steps_users',
  hasTimestamps: true,

  step: function () {
    return this.belongsTo( 'Step' );
  },

  user: function () {
    return this.belongsTo( 'User' );
  },

});

module.exports = db.model( 'StepUser', StepUser );