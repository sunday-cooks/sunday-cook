var passport  = require( 'passport' );

module.exports = function ( app, router ) {

  app.get( '/auth/facebook', passport.authenticate( 'facebook', {
    scope: [ 'public_profile', 'email' ],
  } ) );

  app.get( '/auth/facebook/callback',
    passport.authenticate( 'facebook', {
      failureRedirect: '/',
      successRedirect: '/',
      session: false
  } ),
    function ( req, res ) {
      /** change this to go back to the previous url */
      res.redirect('/');
  });
};