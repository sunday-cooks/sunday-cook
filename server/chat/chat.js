var db = require('../bookshelf/config');
var Chat = require('../bookshelf/models/chatmessage');
var cookieParser      = require( 'cookie-parser' );

module.exports = function( app, io, passport, sessionStore ) {

  io.sockets.on( 'connection', function ( socket, next ) {
    // store user info
    var userObj = socket.client.request.user;
    var firstName = userObj.get('first_name');
    var lastName = userObj.get( 'last_name' );
    // emit user's first and last names from individual
    socket.emit('user name', { first_name: firstName, last_name: lastName });
    console.log( firstName + ' has joined the chatroom' );
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
        console.log( firstName + ' cook has left the chatroom' );
      });
  });

  // io middleware
  io.use( function ( socket, next ) {
    cookieParser ( process.env.session_secret )( socket.request, {}, function ( err ) { 
      var sessionId = socket.request.signedCookies[ process.env.session_key ]; 

      sessionStore.get( sessionId, function ( err, session ) {
        socket.request.session = session;
        passport.initialize()( socket.request, {}, function () {
          passport.session()( socket.request, {}, function () {
            if ( socket.request.user ) {
              next ( null, true );
            } else {
              next ( new Error ( 'User is not authenticated' ), false );
            }
          });
        });
      });
    });
  });

};
