angular.module( "chat", ['btford.socket-io'] )
  .factory( 'socketService', function( socketFactory ) {
    return socketFactory();
  })
  .controller( "ChatController", ['socketService',function (socketService) {
    // save reference to this
    var vm = this;
    // temporary container for chats
    vm.chats = [];
    // chat object
    vm.chat = {};
    // Controller methods
    function sendChat( chat ) {
      vm.chat.timeStamp = new Date();
      socketService.emit( 'new chat', {createdOn: vm.chat.timeStamp, text: vm.chat.chatText, name: vm.chat.name } );
      vm.chat.chatText = '';
    }
    // Socket events
    socketService.on( '', function(  ) {

    });

    socketService.on( 'new chat', function(newChat) {
      vm.chats.push(newChat);
    });

    socketService.on('user name', function( name ) {
      vm.chat.name = name.first_name + ' ' + name.last_name;
      socketService.emit( 'event id', { eventId: ""} );
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