var db    = require('../config'),
    Event = require('../models/event');

var Events = db.Collection.extend( {
  model: Event,
}, {
  fetchEvents: function () {
    return new this().fetch( { columns: [ 'id', 'name', 'description', 'user_id' ], withRelated: [ {
      'chef': function ( qb ) {
        qb.column( 'id', 'first_name', 'last_name' );
      }}]});
  },
});

module.exports = db.collection( 'Events', Events );