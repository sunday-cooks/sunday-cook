var passport  = require( 'passport' );
var url       = require( 'url' );

module.exports = function ( app, router ) {

  router.get( '/userInfo', function( req, res, next ) {
    if ( !req.user ) { res.end(); }
    else { res.json( req.user.toJSON() ); }
  });

  router.get( '/fb', function ( req, res, next ) {
    req.session.redirect = url.parse( req.url, true ).query.redirect;
    next();
  },
  passport.authenticate( 'facebook', {
    scope: [ 'public_profile', 'email' ],
  }));

  router.get( '/fb/callback', function ( req, res, next ) {
    passport.authenticate( 'facebook', function ( err, user, info ) {
      if ( err ) { return next( err ); }
      var redirect = req.session.redirect;
      req.session.redirect = undefined;
      process.verb( 'User info', user );
      req.logIn( user, function ( err ) {
        if ( err ) { return next( err ); }
        if ( redirect ) {
          res.redirect( '/#' + redirect );
        } else { res.redirect( '/' ); }
      });
    })(req, res, next);
  });
};