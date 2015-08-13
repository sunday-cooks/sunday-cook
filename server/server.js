require( 'dotenv' ).load();
module.exports = app = require( './express/express.js' );

var bookshelf = require( './bookshelf/config.js' );