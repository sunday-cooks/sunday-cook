angular.module( "chat", ['btford.socket-io'] )
  .factory( 'socketService', function( socketFactory ) {
    return socketFactory();
  })
  .controller( "ChatController", ['$scope','$location','socketService',function ($scope, $location, socketService) {
    // save reference to this
    var vm = this;
    console.log("Event ID is ", $scope.eventId);
    vm.loc = $location.path();
    // temporary container for chats
    vm.chats = [
      {
        name: 'Spencer',
        text: 'Cannot wait to get my cook on! Hey Everyone!!!',
        created_at: '5 min',
      },
    ];
    // chat object
    vm.chat = {};
    // Controller methods
    function sendChat( chat ) {
      socketService.emit( 'new chat', vm.chat.chatText );
      vm.chat.chatText = '';
    }
    // Socket events
    socketService.on( 'event id?', function(  ) {
      socketService.emit( 'event id', $scope.eventId );
    });

    socketService.on( 'new chat', function(newChat) {
      vm.chats.push(newChat);
    });

    socketService.on('user name', function( name ) {
      vm.chat.name = name.first_name + ' ' + name.last_name;
      console.log("Name", vm.chat.name);
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