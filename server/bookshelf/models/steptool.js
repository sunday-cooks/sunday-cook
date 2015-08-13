var db = require( '../config' );
require( './step' );
require( './tool' );

var StepTool = db.Model.extend( {

  tableName: 'steps_tools',

  step: function () {
    return this.belongsTo( 'Step' );
  },

  tool: function () {
    return this.belongsTo( 'Tool' );
  },

});

module.exports = db.model( 'StepTool', StepTool );