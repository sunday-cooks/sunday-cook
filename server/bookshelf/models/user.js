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
    .catch( function( error ){
      done( error );
    });
  },
});

module.exports = User;