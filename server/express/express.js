var express           = require( 'express' ),
    morgan            = require( 'morgan' ),
    bodyParser        = require( 'body-parser' ),
    path              = require( 'path' ),
    passport          = require( 'passport' ),
    FacebookStrategy  = require( 'passport-facebook' ).Strategy,
    User              = require( '../bookshelf/models/user' ),
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


// Passport
var url_absolute;

if ( app.isProd() ) {
  url_absolute  = process.env.url_absolute;
} else {
  url_absolute  = process.env.url_absolute_dev;
}

passport.use( new FacebookStrategy( {
    clientID: process.env.fb_api_id,
    clientSecret: process.env.fb_api_secret,
    callbackURL: 'http://' + path.join( url_absolute, '/auth/facebook/callback' ),
    enableProof: false,
    passReqToCallback: true,
    profileFields: [ 'id', 'email', 'first_name', 'gender', 'last_name' ],
  },
  function( req, accessToken, refreshToken, profile, done ) {
    console.log('profile', profile);
    //done(null, profile);
  }
));

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.use(passport.initialize());
app.use(passport.session());

// Initialize our routes
require( './routes.js' )( app, express );

// Export express
module.exports = app;