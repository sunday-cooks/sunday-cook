var db = require('../config');
require('../models/ingredient');

var Ingredients = db.Collection.extend( {
  model: 'Ingredient',
}, {
  fetchLike: function ( match ) {
    return new this()
    .query( function( qb ) {
      qb.where( 'name', 'LIKE', '%' + match + '%' );
    }).fetch();
  },
});

module.exports = db.collection( 'Ingredients', Ingredients );