var express           = require( 'express' ),
    morgan            = require( 'morgan' ),
    bodyParser        = require( 'body-parser' ),
    session           = require( 'express-session' );

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

app.use( session( {
  secret: 'we are kittens',
  resave: true,
  saveUninitialized: true,
} ) );

require( './passport' )( app );

// Initialize our routes
require( './routes.js' )( app, express );

// Export express
module.exports = app;