angular.module('app', [
  'ui.router',
  'event',
  'ngMaterial',
  'ngMdIcons'
  ])
  .config(function ($urlRouterProvider, $httpProvider, $stateProvider, $mdThemingProvider) {
    $urlRouterProvider.otherwise('/');

    var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
      });
      $mdThemingProvider.definePalette('customBlue', customBlueMap);
      $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
          'default': '500',
          'hue-1': '50'
        })
        .accentPalette('pink');
      $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');

    $stateProvider
      .state('event', {
        url: '/',
        templateUrl: "app/event/event.html",
        controller: "eventCtrl"
      });
  });
  // .controller('MainCtrl', function ($scope) {

  // });