var db      = require( '../config' ),
    Event   = require( './event' ),
    Promise = require( 'bluebird' );

var User = db.Model.extend( {
  tableName: 'users',
  hasTimestamps: true,

  events: function () {
    return this.hasMany( Event );
  }
}, {

  fetchUser: function ( email ) {
    return new this( { email: email } ).fetch( { require: true } );
  },

  fetchUserbyFBId: function ( fbid ) {
    return new this( { fb_id: fbid } ).fetch( { require: true } );
  },

  serializeUser: function ( user, done ) {
    done( null, user.get( 'email' ) );
  },

  deserializeUser: function ( email, done ) {
    User.fetchUser( email )
    .then( function ( user ) {
      done( null, user ? user : false );
    })
    .catch( function ( error ) {
      done( error );
    });
  },

  fbAuthentication: function ( req, accessToken, refreshToken, profile, done ) {
    User.fetchUserbyFBId( profile.id )
    .then( function ( user ) {
      if ( !req.user || req.user.email === user.get( 'email' ) ) {
        return done( null, user );
      }

      return done( null, false );
    })
    .catch( function ( error ) {
      var user = req.user || new User();

      if ( user ) {
        user.set( 'fb_id', profile.id );
        user.set( 'first_name', profile.name.givenName );
        user.set( 'last_name', profile.name.familyName );
        user.set( 'gender', profile.gender );
        if (profile.emails && profile.emails.length > 0) {
          user.set( 'email', profile.emails[0].value );
        }
        user.save();

        return done( null, user );
      }

      return done( null, false );
    });
  },
});

module.exports = User;