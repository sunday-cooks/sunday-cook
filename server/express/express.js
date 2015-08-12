var express           = require( 'express' ),
    morgan            = require( 'morgan' ),
    bodyParser        = require( 'body-parser' ),
    session           = require( 'express-session' ),
    SessionStore      = require( 'express-sql-session' )( session ),
    http              = require( 'http' ),
    socket            = require( 'socket.io' ),
    passportSocketIo  = require( 'passport.socketio' ),
    cookieParser      = require( 'cookie-parser' );

// Initialize express
var app = express();
var server = http.Server( app );
var io = socket( server );

// NOTE: not sure where to place this line in the file
require( '../chat/chat.js' )(io);

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


// Sessions
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
  key: 'sundayCook',
  secret: 'we are kittens',
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
} ) );

require( './passport' )( app );

// IO middleware
io.use( passportSocketIo.authorize({
  key: 'sundayCook',
  secret: 'we are kittens',
  store: sessionStore,
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail,
}));

function onAuthorizeSuccess( data, accept ) {
  console.log( 'Successful connecto to Socket.io' );
  accept();
}

function onAuthorizeFail( data, message, error, accept ) {
  console.log( 'Failed connection to Socket.io' );
  console.log( message );
  if ( error ) {
    accept( new Error( message ) );
  }
}

// Initialize our routes
require( './routes.js' )( app, express );

server.listen( 8000 );

// Export express
module.exports = app;