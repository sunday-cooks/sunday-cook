angular.module('app', [
  'ui.router',
  'event'
  ])
  .config(function ($urlRouterProvider, $httpProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('event', {
        url: '/',
        templateUrl: "app/event/event.html",
        controller: "eventCtrl"
      });
  });
  // .controller('MainCtrl', function ($scope) {

  // });