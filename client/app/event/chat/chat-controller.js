angular.module("chat", [])
  .controller("chatCtrl", function ($scope) {

  })
  .directive('chat', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/chat/chat.html'
    };
  });

