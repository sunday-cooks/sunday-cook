var db    = require( '../config' ),
    Step  = require( '../models/step' );

var Steps = db.Collection.extend( {
  model: Step,
});

module.exports = db.collection( 'Steps', Steps );