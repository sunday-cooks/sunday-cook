var db = require('../bookshelf/config');
var Chat = require('../bookshelf/models/chatmessage');

module.exports = function( io ) {
  io.sockets.on( 'connection', function ( socket ) {
    console.log( 'A new cook has joined the chatroom' );
    // console.log(socket);
    // join event
    socket.on( 'join', function( room ) {
      socket.join( room );
    });

    // new chat event
    socket.on( 'new chat', function( chat ) {
      console.log( 'New chat received from client: ', chat );
      io.emit( 'new chat', chat );
    });

    // disconnect event
    socket.on('disconnect', function () {
        console.log('A cook has left the chatroom');
      });
  });
};
