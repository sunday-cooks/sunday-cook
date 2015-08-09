var db = require( '../config' );
var Event = require( './event' );

var bcrypt = require( 'bcrypt' );
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
  /*comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }*/
});

module.exports = User;