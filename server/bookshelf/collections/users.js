var db    = require( '../config' ),
    User  = require( '../models/user' );

var Users = db.Collection.extend( {
  model: User,
}, {

  // This is a promise!!
  fetchUsers: function () {
    return new this().fetch( { columns: [ 'id', 'first_name', 'last_name' ] } );
  },

});

module.exports = db.collection( 'Users', Users );