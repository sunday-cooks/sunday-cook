var Ingredients = require( '../../bookshelf/collections/ingredients' );

module.exports = function ( app, router ) {
  router.post( '/ingredients/find', function( req, res, next ) {
    var ingToMatch = req.body.value;
    if ( !ingToMatch ) { res.sendStatus( 400 ); }
    else {
      Ingredients.fetchLike( req.body.value )
      .then( function( ingredients ) {
        res.json( ingredients.toJSON() );
      });
    }
  });
};