var db    = require( '../config' ),
    Tool  = require( '../models/tool' );

var Tools = db.Collection.extend( {
  model: Tool,
}, {

  // This is a promise!!
  fetchToolsLike: function ( match ) {
    return new this()
    .query( function( qb ) {
      qb.where( 'name', 'LIKE', '%' + match + '%' );
    }).fetch();
  },

});

module.exports = db.collection( 'Tools', Tools );