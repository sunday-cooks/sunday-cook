var express           = require( 'express' ),
    morgan            = require( 'morgan' ),
    bodyParser        = require( 'body-parser' ),
    session           = require( 'express-session' ),
    SessionStore      = require( 'express-sql-session' )( session );

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

// Sesions
var options = {
  client: 'postgres',
  connection: {
    host: process.env.pg_host,
    user: process.env.pg_user,
    password: process.env.pg_password,
    database: process.env.pg_database,
    charset: 'utf8',
  },
  table: 'sessions',
  expires: 365 * 24 * 60 * 60 * 1000
};

var sessionStore = new SessionStore(options);

app.use( session( {
  secret: 'we are kittens',
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
} ) );

require( './passport' )( app );

// Initialize our routes
require( './routes.js' )( app, express );

// Export express
module.exports = app;