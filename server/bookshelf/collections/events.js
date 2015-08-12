var db = require('../config');
var Event = require('../models/event');

var Events = db.Collection.extend( {
  model: Event,
});

module.exports = Events;