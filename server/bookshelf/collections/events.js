var db = require('../config');
require('../models/event');

var Events = db.Collection.extend( {
  model: 'Event',
});

module.exports = db.collection( 'Events', Event );