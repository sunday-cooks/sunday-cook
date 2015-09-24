angular.module("video", [])
  .controller("videoCtrl", function () {

  })
  .directive('videoPlayer', ['$sce', function ( $sce ) {
    return {
      restrict: 'E',
      templateUrl: 'app/event/video/video.html',
      link: function ( scope, element, attributes ) {
        scope.id = '';
        scope.localStream = '';
        scope.incomingStream = '';

        var localMedia;
        var incomingMedia;

        // getUserMedia shim
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

        // new peer instance
        var peer = new Peer({
          key: 'f0n6lzckc56zuxr', // API key to PeerJS peer server ( http://peerjs.com/peerserver )
          debug: 3,
        });

        peer.on( 'open', function( id ) {
          scope.id = id;
          getLocalStream();
          console.log("Id is : ", scope.id);
        });

        peer.on( 'call', function( call ) {
          call.answer( localMedia );
          handleCall ( call );
        });

        peer.on( 'error', function ( error ) {
          scope.error = error;
          console.log ( 'Error in peer.on() : ', error.message );
        });

        scope.makeCall = function ( event, id ) {
          event.preventDefault();
          var call = peer.call(id, localMedia); // call to remote peer takes remote peer's id and, optionally, caller's local media stream
          handleCall ( call ); // invoking handleCall here ensures that when the remote peer answers, passing in its local stream, the caller can display that stream
          scope.peerID = '';
        };

        // helper function to grab local media stream
        function getLocalStream () {
          navigator.getUserMedia({
            video: true,
            audio: true,
          }, function ( stream ) {
            localMedia = stream;
            scope.localStream = $sce.trustAsResourceUrl( URL.createObjectURL( localMedia ) );
            scope.$apply();
          }, function ( error ) {
            console.log( error.message );
          });
        }

        // helper function to handle calls on for both caller and callee
        function handleCall ( call ) {
          call.on( 'stream', function ( stream ) {
            incomingMedia = stream;
            scope.incomingStream = $sce.trustAsResourceUrl ( URL.createObjectURL ( incomingMedia ) );
            scope.$apply();
          });
        }

      } // end of link function
    }; // end of directive options object
  }]);
