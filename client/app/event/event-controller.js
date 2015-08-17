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





  // .factory('stepsModel', function($rootScope, $http, $q) {
  //   var steps = {};
  //   steps.stepsInformation = function ( callback ) {
  //     $http.get('recipe.json')
  //       .then(function(response) {
  //         steps.steps = response.data.steps;
  //         callback( steps );
  //       });
  //   };

  //   $rootScope.$on('stepChange', function(event, mass) {
  //     $rootScope.$broadcast('stepChage', mass);
  //   });

  //   steps.currentStep = 1;

  //   steps.goToStep = function (desiredStep) {
  //     if (steps.steps[desiredStep -1]) {
  //       currentStep = desiredStep;
  //       $rootScope.$broadcast('goToStep', currentStep);
  //     }
  //   };

  //   return steps;
  // })


  .factory('stepsModel', function($rootScope, $http, $q) {
    var steps = {
      steps: null,
      currentStep: 1,
      goToStep: function (desiredStep) {
        if (steps.steps[desiredStep -1]) {
          currentStep = desiredStep;
          $rootScope.$broadcast('goToStep', currentStep);
        }
      }
    };
    function LoadData() {
      var defer = $q.defer();
      $http.get('recipe.json').success(function(data) {
        steps.allData = data;
        steps.steps = steps.allData.steps;
        defer.resolve();
      });
      return defer.promise;
    }

    $rootScope.$on('stepChange', function(event, mass) {
      console.log('event controller has received');
      $rootScope.$broadcast('goToStep', mass);
    });

    return {
      steps: steps,
      GetData: function () { return steps.steps; },
      LoadData: LoadData
    };
  })

  //stepsInformation: stepsInformation,
  //steps: steps,
  //currentStep: currentStep,
  //goToStep: goToStep,
  //markComplete: markComplete





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
      $http.get('/api/events/' + eventId)
      .then(function (result) {
        eventObject.info = result;
        callback( result );
      }, function (error) {
        console.log(error);
      });
    }
  });
