var db = require( '../config' );
var Event = require( './event' );

var Promise = require( 'bluebird' );

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  events: function() {
    return this.hasMany( Event );
  },

  initialize: function() {
    //this.on('creating', this.hashPassword);
  },
}, {

  fetchUser: function( email ) {
    return new this( { email: email } ).fetch( { require: true } );
  },

  fetchUserbyFBId: function( fbid ) {
    return new this( { fb_id: fbid } ).fetch( { require: true } );
  },

  serializeUser: function( user, done ) {
    done( null, user.get( 'email' ) );
  },

  deserializeUser: function( email, done ) {
    User.fetchUser( email )
    .then( function( user ) {
      done( null, user ? user : false );
    })
    .catch( function( error ) {
      done( error );
    });
  },

  fbAuthentication: function( req, accessToken, refreshToken, profile, done ) {
    User.fetchUserbyFBId( profile.id )
    .then( function( user ) {
      if ( !req.user || req.user.email === user.get( 'email' ) ) {
        return done( null, user );
      }

      return done( null, false );
    })
    .catch( function( error ) {
      var user = req.user || new User();

      if ( user ) {
        user.set( 'fb_id', profile.id );
        user.set( 'first_name', profile.first_name );
        user.set( 'last_name', profile.last_name );
        user.set( 'gender', profile.gender );
        user.save();
        return done( null, req.user );
      }

      return done( null, false );
    });
  },
});

module.exports = User;