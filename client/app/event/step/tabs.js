angular.module('tabs', [])
  .directive('stepTab', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/event/step/step-tab.html',
      transclude: true,
      require: '^tabset',
      scope: {
        heading: '@'
      },
      link: function(scope, elem, attr, tabsetCtrl) {
        scope.active = false;
        tabsetCtrl.addTab(scope);
      }
    };
  })
  .directive('tabSet', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'app/event/step/tab-set.html',
      bindToController: true,
      controllerAs: 'tabset',
      controller: function () {
        var vm = this;
        vm.tabs = [];

        vm.addTab = function addTab(tab) {
          vm.tabs.push(tab);

          if (vm.tabs.length === 1) {
            tabs.active = true;
          }
        };
      }
    };
  });