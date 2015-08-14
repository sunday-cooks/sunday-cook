var db = require( '../config' );
require( './tip' );
require( './ingredient' );
require( './ingredientstep' );
require( './tool' );
require( './steptool' );
require( './user' );
require( './stepuser' );

var Step = db.Model.extend( {
  tableName: 'steps',

  ingredients: function () {
    return this.belongsToMany( 'Ingredient' ).through( 'IngredientStep' ).withPivot( 'qty' );
  },

  tools: function () {
    return this.belongsToMany( 'Tool' ).through( 'StepTool' );
  },

  tips: function () {
    return this.hasMany( 'Tip' );
  },

  done: function () {
    return this.belongsToMany( 'User' ).through( 'StepUser' ).withPivot( 'done' );
  }

}, {
  fetchStep: function ( id ) {
    return new this( { id: id } ).fetch( {
      require: true,
      withRelated: [
        'ingredients',
        'tools',
        'tips'
        ],
    });
  },
});

module.exports = db.model( 'Step', Step );