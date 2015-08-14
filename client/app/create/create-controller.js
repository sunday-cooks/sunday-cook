(function () {

angular.module( 'createEvent', [ 'ngMaterial', 'ngMessages' ] )
  .controller( 'createCtrl', createCtrl)
  .factory('processForm', processFunction);

  function processFunction($http) {
    var url = '/api/events/create';
    var processForm = {};

    processForm.sendData = function (data) {
      return $http.post(url, data);
    };

    return processForm;
  }

  function createCtrl( $scope, $http, processForm ) {
    $scope.formData = { };
    $scope.formData.ingredients = [];
    $scope.formData.tools = [];
    $scope.formData.steps = [];
    $scope.formData.step = { name: '', min_duration: '', max_duration: '', details: '', tips: [], ingredients: {'0':{'value': '', 'qty': ''}}, tools: {'0':{'value': ''}} };
    $scope.formData.ingredient = {name: '', buy_url: '', qty: ''};
    $scope.formData.tool = {name: '', buy_url: ''};
    $scope.ingredientsList = [];
    $scope.toolsList = [];

      //step tips
    $scope.addNewTip = function() {
      $scope.formData.step.tips.push($scope.formData.tip);
      $scope.formData.tip = '';
      $scope.tipList();
    };

     $scope.tipList = function() {
      $scope.tipsList = $scope.formData.step.tips;
    };

    $scope.submitEvent = function () {
      delete $scope.formData.ingredient;
      delete $scope.formData.step;
      delete $scope.formData.tool;
      delete $scope.formData.ingredient;
      delete $scope.formData.tip;
      console.log($scope.formData);
      var data = JSON.stringify($scope.formData);
      processForm.sendData(data)
        .success(function (error, data) {
          console.log('Data has been posted!', data);

        })
        .error(function (error) {
          console.log('Doh! here lies the, ', error, ' and', error.message);
        });
    };

    // $http.post('/api/events/create', data).success(function(data, status) {
    //   console.log('success');
    // });

    $scope.getList = function() {
       $scope.ingredientsList = $scope.formData.ingredients;
       return $scope.formData.ingredients;
    };
    $scope.toolList = function() {
      $scope.toolsList = $scope.formData.tools;
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

    $scope.removeTip = function($event, $index) {
      $event.preventDefault();
      $scope.formData.step.tips.splice($index, 1);
      $scope.tipList();
    };

    $scope.startSteps = function () {
      $scope.formData.step = { name: '', min_duration: '', max_duration: '', details: '', tips: [], ingredients: {'0':{'value': '', 'qty': ''}}, tools: {'0':{'value': ''}} };
    };
    //steps
    $scope.addNewStep = function () {
      $scope.formData.steps.push($scope.formData.step);
      $scope.formData.step = { name: '', min_duration: '', max_duration: '', details: '', tips: [], ingredients: {'0':{'value': '', 'qty': ''}}, tools: {'0':{'value': ''}} };
      $scope.tipList();
      $scope.stepList();
    };
    $scope.removeStep = function($event, $index) {
      $event.preventDefault();
      $scope.formData.steps.splice($index, 1);
      $scope.stepList();
    };

    $scope.stepList = function() {
      $scope.macroSteps = $scope.formData.steps;
    };
  }
})();