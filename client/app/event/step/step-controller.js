angular.module("step", ['tabs'])
  .controller("stepCtrl", function ($scope) {
    $scope.tabs = [
      {
        title: 'About',

      },
    ];
  })
  .directive('step', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/step/step.html'
    };
  })
  .directive('progressBar', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/step/progress-bar.html',
      // link: function ($scope, element, attributes) {
      //   // var divElement = angular.element(element[0].querySelector('#find-me'));
      //   var elem = angular.element(element[0].querySelector('#p1'));
      //   console.log(elem);
      //   elem.addEventListener('mdl-componentupgraded', function() {
      //     this.MaterialProgress.setProgress(33);
      //     this.MaterialProgress.setBuffer(87);
      //   });
      // }
    };
  })
;

