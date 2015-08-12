var db = require('../config');
var Tool = require('../models/tool');

var Tools = new db.Collection();

Tools.model = tool;

module.exports = Tools;