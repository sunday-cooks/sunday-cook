angular.module('event', ['video', 'chat', 'step', 'steps', 'events', 'stepPercent', 'ngMaterial'])
  .controller('eventCtrl', function (userModel, $scope, $stateParams, $location, stepsModel, eventModel, $rootScope) {
    // find the id for the specific event and attach it to event's $scope object
    $scope.eventId = $stateParams.eventId;
    $scope.loc = $location.path();

    $scope.eventModel = eventModel;
    $scope.eventModel.getEventDetails($scope.eventId, function(eventObj){
      console.log( eventObj );
    });

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        event.preventDefault();
        userModel.getUserInfo();
        // transitionTo() promise will be rejected with
        // a 'transition prevented' error
    });
    console.log(userModel.getUserInfo());
  })
  .factory('stepsModel', function($rootScope) {
    var steps = [
      {
        title: 'Wash and rinse chicken',
        isComplete: false,
        number: 1,
        total: 15,
        tabs: [
          {
            title: 'About',
            steps: ['wash that chicken', 'wash that chicken AGAIN', 'do it one more time!'],
            tips: ['be gentle', 'be really really gentle', 'I fucking said be gentle!']
          },
          {
            title: 'Ingredients',
            ingredients: [
              {
                name: 'chicken',
                description: 'yeah not sure what to put here',
                image: 'nah'
              },
              {
                name: 'soap',
                description: 'Use this to make that chicken as clean as fucking possible.',
                image: 'nah'
              }
            ]
          },
          {
            title: 'Tools',
            tools: [
              {
                name: 'hands',
                description: 'Use them to fucking wash the chiken'
              },
              {
                name: 'soap',
                description: 'Use this to make that chicken as clean as fucking possible.'
              }
            ]
          },
        ],
      },
      {
        title: 'reeeeeeegggggggg',
        isComplete: false,
        number: 2,
        total: 15,
        tabs: [
          {
            title: 'About',
            steps: ['wash that chicken', 'wash that chicken AGAIN', 'do it one more time!'],
            tips: ['be gentle', 'be really really gentle', 'I fucking said be gentle!']
          },
          {
            title: 'Ingredients',
            ingredients: [
              {
                name: 'chicken',
                description: 'yeah not sure what to put here',
                image: 'nah'
              },
              {
                name: 'soap',
                description: 'Use this to make that chicken as clean as fucking possible.',
                image: 'nah'
              }
            ]
          },
          {
            title: 'Tools',
            tools: [
              {
                name: 'hands',
                description: 'Use them to fucking wash the chiken'
              },
              {
                name: 'soap',
                description: 'Use this to make that chicken as clean as fucking possible.'
              }
            ]
          },
        ],
      },
      {
        title: 'efwegerberberberb',
        isComplete: false,
        number: 3,
        total: 15,
        tabs: [
          {
            title: 'About',
            steps: ['wash that chicken', 'wash that chicken AGAIN', 'do it one more time!'],
            tips: ['be gentle', 'be really really gentle', 'I fucking said be gentle!']
          },
          {
            title: 'Ingredients',
            ingredients: [
              {
                name: 'chicken',
                description: 'yeah not sure what to put here',
                image: 'nah'
              },
              {
                name: 'soap',
                description: 'Use this to make that chicken as clean as fucking possible.',
                image: 'nah'
              }
            ]
          },
          {
            title: 'Tools',
            tools: [
              {
                name: 'hammer',
                description: 'SMASH'
              },
              {
                name: 'nails',
                description: 'PIERCE.'
              }
            ]
          },
        ],
      }
    ];

    $rootScope.$on('previousStep', function(event, mass) {
      $rootScope.$broadcast('regressBar', mass);
    });

    $rootScope.$on('nextStep', function(event, mass) {
      $rootScope.$broadcast('progressBar', mass);
    });

    var currentStep = 1;

    var isChanged = false;
    console.log(isChanged);

    var nextStep = function () {};
    var previousStep = function () {};
    var goToStep = function (desiredStep) {

      if (steps[desiredStep -1]) {
        currentStep = desiredStep;
        $rootScope.$broadcast('changedStep', currentStep);
      }
    };
    var markComplete = function () {

    };
    return {
      steps: steps,
      currentStep: currentStep,
      nextStep: nextStep,
      previousStep: previousStep,
      goToStep: goToStep,
      markComplete: markComplete
    };
  })
  .factory('userModel', function($http) {
    var user = {
      getUserInfo: getUserInfo
    };

    function getUserInfo( callback ) {
      $http.get('/api/userInfo')
      .then(function(result) {
        console.log("Inside getUserInfo", result);
        user.info = result;
        if ( callback ) {
          callback( result !== undefined );
        }
      }, function (error) {
        console.log(error);
      });
    }

    return user;
  })
  .factory('eventModel', function($http) {
    var eventObject = {
      getEventDetails: getEventDetails
    };

    return eventObject;

    function getEventDetails(eventId, callback) {
      $http.get('/api/events/:eventId', {
        params: {
          eventId: eventId
        }
      })
      .then(function (result) {
        eventObject.info = result;
        callback( result );
      }, function (error) {
        console.log(error);
      });
    }
  });
