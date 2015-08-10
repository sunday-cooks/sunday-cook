var db = require('../bookshelf/config');
var Chat = require('../bookshelf/models/chatmessage');

module.exports = function(io) {
  io.sockets.on('connection', function (socket) {
    // They connected!!

    // Joining the 'room' for a particular event
    socket.on('join', function ( room ) {
      socket.join( room );
    });

    socket.on('disconnect', function () {
        // They disconnected!!
      });
  });
};
