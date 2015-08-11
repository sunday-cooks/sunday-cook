angular.module("video", [])
  .controller("videoCtrl", function ($scope) {

  })
  .directive('videoPlayer', function () {
    return {
      restrict: 'EA',
      templateUrl: 'app/event/video/video.html'
    };
  });

