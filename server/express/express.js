var express     = require( 'express' ),
    morgan      = require( 'morgan' ), // used for logging incoming request
    bodyParser  = require( 'body-parser' );

// Initialize express
var app = express();

app.isDev = function () { return app.get( 'env' ) === 'development'; };
app.isProd = function () { return app.get(' env' ) === 'production'; };

// Dev logging
if ( app.isDev() ) {
  app.use( morgan( 'dev' ) );
}

// JSON support for body parsing
app.use( bodyParser.json() );

// Body parser
app.use( bodyParser.urlencoded( { extended: true } ) );

// Initialize our routes
require( './routes.js' )( app, express );

// Export express
module.exports = app;