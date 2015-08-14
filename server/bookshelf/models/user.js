var db      = require( '../config' ),
    Promise = require( 'bluebird' );
              require( './event' );
              require( './chatmessage' );

var User = db.Model.extend( {
  tableName: 'users',
  hasTimestamps: true,

  events: function () {
    return this.hasMany( 'Event' );
  },

  chatMessages: function () {
    return this.hasMany( 'ChatMessage' );
  },

  getProfilePicURL: function () {
    return 'https://graph.facebook.com/' + this.get( 'fb_id' ) + '/picture';
  },
}, {

  fetchUserbyId: function ( id ) {
    return new this( { id: id } ).fetch( { columns: [ 'first_name', 'last_name' ] } );
  },

  fetchUser: function ( email ) {
    return new this( { email: email } ).fetch( { require: true } );
  },

  fetchUserbyFBId: function ( fbid ) {
    return new this( { fb_id: fbid } ).fetch( { require: true } );
  },

  serializeUser: function ( user, done ) {
    if ( user ) {
      done( null, user.get( 'email' ) );
    } else {
      done( null, false );
    }
  },

  deserializeUser: function ( email, done ) {
    db.model( 'User' ).fetchUser( email )
    .then( function ( user ) {
      done( null, user ? user : false );
    })
    .catch( function ( error ) {
      done( error );
    });
  },

  fbAuthentication: function ( req, accessToken, refreshToken, profile, done ) {
    db.model( 'User' ).fetchUserbyFBId( profile.id )
    .then( function ( user ) {
      if ( !req.user || req.user.get( 'email' ) === user.get( 'email' ) ) {
        return done( null, user );
      }

      return done( null, false );
    })
    .catch( function ( error ) {
      var user = req.user || new this();

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

module.exports = db.model( 'User', User );