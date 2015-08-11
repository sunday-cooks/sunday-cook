var passport  = require( 'passport' );

module.exports = function ( app, router ) {

  router.get( '/fb', passport.authenticate( 'facebook', {
    scope: [ 'public_profile', 'email' ],
  } ) );

  router.get( '/fb/callback',
    passport.authenticate( 'facebook', {
      failureRedirect: '/',
      successRedirect: '/'
  } ),
    function ( req, res ) {
      // change this to go back to the previous url
      res.redirect('/');
  });
};