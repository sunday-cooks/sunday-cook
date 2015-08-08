var partials = require( 'express-partials' );
var path = require( 'path' );

var api = function ( router ) {
  require( '../api/users' )( router );
};


module.exports = api;