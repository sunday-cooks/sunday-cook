var db = require('../config');
require('../models/tool');

var Tools = db.Collection.extend( {
  model: 'Tool',
});

module.exports = db.collection( 'Tools', Tools );