var db = require('../config');
require('../models/user');

var Users = db.Collection.extend( {
  model: 'User',
});

module.exports = db.collection( 'Users', Users );