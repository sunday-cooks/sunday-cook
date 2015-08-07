module.exports = app = require('./express/express.js');

console.log( 'Express server listening on port 8000' );
var server = app.listen( 8000 );

var io = require('socket.io').listen(server);

require('./chat/chat.js')(io);