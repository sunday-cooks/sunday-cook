angular.module( "createEvent", [ 'ngMaterial', '$http' ] )
 
  .controller( "createCtrl", function ( $scope, $http ) {
    $scope.formData = { };
    $scope.formData.ingredients = [];
    $scope.formData.tools = [];
    $scope.formData.steps = [];
    $scope.formData.steps.tips = [];
    $scope.processForm = function() {
      var data = $scope.formData;
      $http.post("/api/events/create", data).success(function(data, status) {
     	console.log('success');
      });
    };
    
    //event ingredients
    $scope.choices = [ { name: 'choice1', buy_link: 'choice1', quantity: 'choice1' } ];
    $scope.addNewChoice = function() {
	  var newItemNo = $scope.choices.length+1;
	  $scope.choices.push( { 'name':'choice'+newItemNo, 'buy_link':'choice'+newItemNo, 'quantity':'choice'+newItemNo } );
	};
    $scope.showAddChoice = function( choice ) {
	  return choice.name === $scope.choices[ $scope.choices.length-1 ].name;
	};

	//event tools
    $scope.toolsArr = [ { name: 'tool1', buy_link: 'tool1' } ];
	 $scope.addNewTool = function() {
	  var newItemNo = $scope.toolsArr.length+1;
	  $scope.toolsArr.push( { 'name':'tool'+newItemNo, 'buy_link':'tool'+newItemNo } );
	};
    $scope.showAddTool = function( tool ) {
	  return toolsArr.name === $scope.toolsArr[ $scope.toolsArr.length - 1 ].name;
	};

	//steps
	$scope.stepArr = [ { name: 'step1', min_duration: 'step1', max_duration: 'step1', details: 'step1', tips: ['step1'], ingredients: [ { index: 'step1', quantity: 'step1' } ], tools: ['step1'] } ];
	$scope.addNewStep = function() {
	  var newStepNo = $scope.stepArr.length+1;
	  $scope.stepArr.push( { 'name': 'name'+newStepNo, 'min_duration': 'min_duration'+newStepNo, 'max_duration': 'max_duration'+newStepNo, 'details': 'details'+newStepNo, 'tips': ['tips'+newStepNo], 'ingredients': [ { 'index': 'index'+newStepNo, 'quantity': 'quantity'+newStepNo } ], 'tools': ['tools'+newStepNo] } );
	  alert('addnewstep');
	};
    $scope.showAddStep = function( step ) {
	  return step.name === $scope.stepArr[ $scope.stepArr.length-1 ].name;
	};



  });