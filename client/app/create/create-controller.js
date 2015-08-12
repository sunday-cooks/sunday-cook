angular.module( "createEvent", [ 'ngMaterial' ] )
 
  .controller( "createCtrl", function ( $scope, $http, $timeout, $q, $log ) {
    $scope.formData = { };
    $scope.formData.ingredients = [];
    $scope.formData.tools = [];
    $scope.formData.steps = [ { name: '', min_duration: '', max_duration: '', details: '', tips: [''], ingredients: [ ], tools: [''] } ];
    $scope.formData.steps.tips = [];
    $scope.formData.ingredient = {name: '', buy_url: '', qty: ''};
    $scope.formData.tool = {name: '', buy_url: ''};
    $scope.formData.steps.tip = {'index': ''};

    $scope.processForm = function() {
      var data = JSON.stringify($scope.formData);
      $http.post("/api/events/create", data).success(function(data, status) {
     	console.log('success');
      });
    };

    $scope.getList = function() {
       $scope.ingredientsList = $scope.formData.ingredients;
       return $scope.formData.ingredients;
    };
    $scope.toolList = function() {
      $scope.toolsList = $scope.formData.tools;
    };
     $scope.tipList = function() {
      $scope.tipsList = $scope.formData.tips;
    };
    
    $scope.choices = [ { 'name': 'choice1', 'buy_url': 'choice1', 'qty': 'choice1' } ];

	$scope.addNewChoice = function() {
      $scope.formData.ingredients.push($scope.formData.ingredient);
      $scope.formData.ingredient = {name: '', buy_url: '', qty: ''};
      $scope.getList();

	};
	$scope.removeIngredient = function($event, $index) {
	  $event.preventDefault();
      $scope.formData.ingredients.splice($index, 1);
      $scope.getList();
	};
    $scope.showAddChoice = function( choice ) {
	  return choice.name === $scope.choices[ $scope.choices.length-1 ].name;
	};


	//event tools
    $scope.toolsArr = [ { name: 'tool1', buy_url: 'tool1' } ];
	
	$scope.addNewTool = function() {
      $scope.formData.tools.push($scope.formData.tool);
      $scope.formData.tool = {name: '', buy_url: ''};
      $scope.toolList();
	};
	$scope.removeTool = function($event, $index) {
	  $event.preventDefault();
      $scope.formData.tools.splice($index, 1);
      $scope.toolList();
	};
    $scope.showAddTool = function( tool ) {
	  return tool.name === $scope.tools[ $scope.tools.length-1 ].name;
	};

    //step tips
    $scope.tipsArr = [ { name: 'tip1', buy_url: 'tip1' } ];
    $scope.addNewTip = function() {
	  $scope.formData.steps.tips.push($scope.formData.tip);
      $scope.formData.steps.tip = {name: '', buy_url: ''};
      $scope.tipList();
	};
    $scope.showAddTip = function( tip ) {
      $scope.formData.steps.tips.push($scope.formData.tip);
      $scope.formData.steps.tip = {name: '', buy_url: ''};
      $scope.tipList();	
    };
	$scope.removeTip = function($event, $index) {
	  $event.preventDefault();
      $scope.formData.tips.splice($index, 1);
      $scope.tipList();
	};


	//steps
	$scope.stepArr = [ { name: 'step1', min_duration: 'step1', max_duration: 'step1', details: 'step1', tips: ['step1'], ingredients: [ { index: 'step1', qty: 'step1' } ], tools: ['step1'] } ];
	$scope.addNewStep = function() {
	  var newStepNo = $scope.stepArr.length+1;
	  $scope.stepArr.push( { 'name': 'name'+newStepNo, 'min_duration': 'min_duration'+newStepNo, 'max_duration': 'max_duration'+newStepNo, 'details': 'details'+newStepNo, 'tips': ['tips'+newStepNo], 'ingredients': [ { 'index': 'index'+newStepNo, 'qty': 'qty'+newStepNo } ], 'tools': ['tools'+newStepNo] } );
	  alert('addnewstep');
	};
    $scope.showAddStep = function( step ) {
	  return step.name === $scope.stepArr[ $scope.stepArr.length-1 ].name;
	};

	//autocomplete
    $scope.simulateQuery = false;
    $scope.isDisabled    = false;
    // list of `state` value/display objects
    $scope.states        = loadAll();
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;

    function querySearch (query) {
      var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }

  });