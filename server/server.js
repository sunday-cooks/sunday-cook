require( 'dotenv' ).load();
var bookshelf = require( './bookshelf/config.js' );

module.exports = app = require( './express/express.js' );
