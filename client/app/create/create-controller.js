angular.module( "createEvent", [ 'ngMaterial' ] )
 
  .controller( "createCtrl", function ( $scope, $http ) {
    $scope.formData = { };
    $scope.formData.ingredients = [];
    $scope.formData.tools = [];
    $scope.formData.steps = [];
    $scope.formData.steps.tips = [];
    $scope.formData.ingredient = {name: '', buy_url: '', qty: ''};
    $scope.formData.tool = {name: '', buy_url: ''};
    $scope.processForm = function() {
      var data = JSON.stringify($scope.formData);
      $http.post("/api/events/create", data).success(function(data, status) {
     	console.log('success');
      });
    };
    
    //event ingredients
    $scope.choices = [ { name: 'choice1', buy_url: 'choice1', qty: 'choice1' } ];
 //    $scope.addNewChoice = function() {
	//   var newItemNo = $scope.choices.length+1;
	//   $scope.choices.push( { 'name':'choice'+newItemNo, 'buy_url':'choice'+newItemNo, 'qty':'choice'+newItemNo } );
	// };
 //    $scope.showAddChoice = function( choice ) {
	//   return choice.name === $scope.choices[ $scope.choices.length-1 ].name;
	// };
	$scope.addNewChoice = function() {
      $scope.formData.ingredients.push($scope.formData.ingredient);
      $scope.formData.ingredient = {name: '', buy_url: '', qty: ''};
	};
    $scope.showAddChoice = function( choice ) {
	  return choice.name === $scope.choices[ $scope.choices.length-1 ].name;
	};

	//event tools
    $scope.toolsArr = [ { name: 'tool1', buy_url: 'tool1' } ];
	//  $scope.addNewTool = function() {
	//   var newItemNo = $scope.toolsArr.length+1;
	//   $scope.toolsArr.push( { 'name':'tool'+newItemNo, 'buy_url':'tool'+newItemNo } );
	// };
 //    $scope.showAddTool = function( tool ) {
	//   return toolsArr.name === $scope.toolsArr[ $scope.toolsArr.length - 1 ].name;
	// };
	$scope.addNewTool = function() {
      $scope.formData.tools.push($scope.formData.tool);
      $scope.formData.tool = {name: '', buy_url: ''};
	};
    $scope.showAddTool = function( tool ) {
	  return tool.name === $scope.tools[ $scope.tools.length-1 ].name;
	};

    //step tips
    $scope.tipsArr = [ { name: 'tip1', buy_url: 'tip1' } ];
	 $scope.addNewTip = function() {
	  var newItemNo = $scope.tipsArr.length+1;
	  $scope.tipsArr.push( { 'name':'tip'+newItemNo, 'buy_url':'tip'+newItemNo } );
	};
    $scope.showAddTip = function( tip ) {
	  return tipsArr.name === $scope.tipsArr[ $scope.tipsArr.length - 1 ].name;
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

  });