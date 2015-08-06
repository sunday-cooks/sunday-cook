var path        = require( 'path' );

var routes = function ( app, express ) {
  // Serving static client files
  if ( app.isProd() ) {
    app.use( express.static( path.join( __dirname,'../../public' ) ) );
  } else {
    app.use( express.static( path.join( __dirname,'../../test' ) ) );
  }

  // Routes
  var router = require( './routes/api.js' )( app, express );

  // Applying the routes
  app.use( '/api', router );
};

module.exports = routes;