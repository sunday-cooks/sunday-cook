var path              = require( 'path' ),
    User              = require( '../bookshelf/models/user' ),
    passport          = require( 'passport' ),
    FacebookStrategy  = require( 'passport-facebook' ).Strategy;

module.exports = function( app ) {
  var url_absolute;

  if ( process.isProd() ) {
    url_absolute  = process.env.url_absolute;
  } else {
    url_absolute  = process.env.url_absolute_dev;
  }

  passport.use( new FacebookStrategy( {
      clientID: process.env.fb_api_id,
      clientSecret: process.env.fb_api_secret,
      callbackURL: 'http://' + path.join( url_absolute, '/api/fb/callback' ),
      enableProof: false,
      passReqToCallback: true,
      profileFields: [ 'id', 'email', 'first_name', 'gender', 'last_name' ],
    }, User.fbAuthentication ));

  passport.serializeUser( User.serializeUser );
  passport.deserializeUser( User.deserializeUser );

  app.use( passport.initialize() );
  app.use( passport.session() );
  return passport;
};