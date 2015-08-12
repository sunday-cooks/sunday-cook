var db = require('../config');
var Tool = require('../models/tool');

var Tools = db.Collection.extend( {
  model: Tool,
});

module.exports = Tools;