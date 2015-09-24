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

}, {

  newStepUser: function ( options ) {
    return new this( options ).save();
  },

});

module.exports = db.model( 'StepUser', StepUser );