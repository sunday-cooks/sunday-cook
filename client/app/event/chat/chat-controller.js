angular.module( "chat", ['btford.socket-io', 'ngCookies'] )
  .factory( 'socketService', function( socketFactory ) {
    return socketFactory();
  })
  .controller( "ChatController", ['socketService', '$cookies',function (socketService, $cookies) {
    var kookie = $cookies;
    console.log(kookie);
    // save reference to this
    var vm = this;
    // temporary container for chats
    vm.chats = [];
    // chat object
    vm.chat = {};
    // Controller methods
    function sendChat( chat ) {
      vm.chat.timeStamp = new Date();
      socketService.emit( 'new chat', {createdOn: vm.chat.timeStamp, text: vm.chat.chatText } );
      vm.chat.chatText = '';
    }
    // Socket events
    socketService.on( 'new chat', function(newChat) {
      vm.chats.push(newChat);
      console.log( 'New chat received from the server: ', newChat);
      console.log(vm.chats);
    });

    socketService.on( 'connection', function() {
      console.log( 'Connected' );
    });
    // make methods available in the view
    vm.sendChat = sendChat;
  }])
  .directive( 'chat', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/chat/chat.html'
    };
  });