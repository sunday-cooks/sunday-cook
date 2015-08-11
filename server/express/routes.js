var path        = require( 'path' );

var routes = function ( app, express ) {
  // Serving static client files
  if ( app.isProd() ) {
    app.use( express.static( path.join( __dirname,'../../public' ) ) );
  } else {
    app.use( express.static( path.join( __dirname,'../../test' ) ) );
  }

  var router = require( './api' )( app, express.Router() );

  app.use( '/api', router );
};

module.exports = routes;