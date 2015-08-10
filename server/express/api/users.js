var passport = require('passport');
var FacebookStrategy = require('passport-facebook');



// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL:
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

module.exports = function ( app, router ) {

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

  // router.post( '/signin', );
  // router.post( '/signup',  );
  // router.get( '/signedin',  );

};