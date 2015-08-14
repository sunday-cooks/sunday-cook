var db          = require( '../config' ),
    Ingredient  = require( '../models/ingredient' );

var Ingredients = db.Collection.extend( {
  model: Ingredient,
}, {

  // This is a promise!!
  fetchIngredientsLike: function ( match ) {
    return new this()
    .query( function( qb ) {
      qb.where( 'name', 'LIKE', '%' + match + '%' );
    }).fetch();
  },

});

module.exports = db.collection( 'Ingredients', Ingredients );