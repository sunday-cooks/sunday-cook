var db = require('../bookshelf/config');
var Chat = require('../bookshelf/models/chatmessage');
var cookieParser      = require( 'cookie-parser' );

module.exports = function( app, io, passport, sessionStore ) {

  io.sockets.on( 'connection', function ( socket ) {
    var userObj = socket.client.request.user;
    var firstName,
        lastName,
        eventId;

    if ( userObj !== undefined ) {
      // if authenticated, store and emit user info
      firstName = userObj.get('first_name');
      lastName = userObj.get( 'last_name' );
      // emit user's first and last names from individual
      socket.emit( 'user name', { first_name: firstName, last_name: lastName } );
      console.log( firstName + ' has joined the chatroom' );
    } 

    // new chat event
    socket.on( 'event id', function( id ) {
      eventId = id;
      socket.join( id );
    });

    socket.on( 'new chat', function( chat ) {
      if ( userObj ) {
        console.log( 'New chat received from client: ', chat );
        io.to( eventId ).emit( 'new chat', chat );
      } else {
        console.log( "Unauthorized user tried to send a message" );
      }
    });
    socket.emit( 'event id?');
    // disconnect event
    socket.on('disconnect', function () {
        firstName = firstName || "A user";
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
            next ( null, true );
          });
        });
      });
    });
  });

};
