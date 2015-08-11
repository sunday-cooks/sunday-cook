var db = require( '../config' );
var Step = require( './step' );
var User = require( './user' );

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