angular.module('app', [
  'ui.router',
  'event',
  'ngMaterial',
  'ngMdIcons',
  'createEvent',
  'ngAnimate',
  'ngMessages'
  ])
  .config( function ( $urlRouterProvider, $httpProvider, $stateProvider, $mdThemingProvider, $locationProvider ) {

    // var authenticated = function ( $q, userModel ) {
    //   var deferred = $q.defer();
    //   userModel.getUserInfo( function( isLoggedIn ) {
    //     if ( isLoggedIn ) {
    //       deferred.resolve();
    //     } else {
    //       deferred.reject();
    //     }
    //   });
    //   return deferred.promise;
    // };
    // configure $locationProvider
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise( '/' );

      $mdThemingProvider.theme( 'default' )
        .primaryPalette( 'amber', {
          'default': '500',
          'hue-1': '50'
        })
        .accentPalette('amber',
          {
            'default': '500'
          });
      $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');

    $stateProvider
      .state( 'event', {
        url: '/',
        templateUrl: "app/events/events.html", // gallery of events (static page)
        controller: "eventsCtrl",
      })
      .state( 'events', {
        url: '/events/:eventId',
        templateUrl: "app/event/event.html", // actual app
        controller: "eventCtrl"
      })
      .state( 'createEvent', {
        url: '/create-event',
        templateUrl: "app/create/create-event.html",
        controller: "createCtrl",
        // resolve: { authenticated: authenticated },
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