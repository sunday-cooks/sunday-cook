angular.module('app', [
  'ui.router',
  'event',
  'ngMaterial',
  'ngMdIcons',
  'createEvent',
  'ngAnimate'
  ])
  .config( function ( $urlRouterProvider, $httpProvider, $stateProvider, $mdThemingProvider ) {
    $urlRouterProvider.otherwise( '/' );

    var customBlueMap = $mdThemingProvider.extendPalette( 'light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [ '50' ],
        '50': 'ffffff'
      });
      $mdThemingProvider.definePalette( 'customBlue', customBlueMap );
      $mdThemingProvider.theme( 'default' )
        .primaryPalette( 'customBlue', {
          'default': '500',
          'hue-1': '50'
        })
        .accentPalette('customBlue');
      $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');

    $stateProvider
      .state( 'event', {
        url: '/',
        templateUrl: "app/event/event.html",
        controller: "eventCtrl"
      })
      .state( 'createEvent', {
        url: '/create-event',
        templateUrl: "app/create/create-event.html",
        controller: "createCtrl"
      })
      .state( 'createEvent.event', {
        url: '/event-details',
        templateUrl: "app/create/event-details.html",
      })
      .state( 'createEvent.step', {
        url: '/step-details',
        templateUrl: "app/create/step-details.html",
      });

  });