(function () {
  'use strict';
  angular.module('ionic-material.directives', [])
    .directive('ngLastRepeat', ngLastRepeat)
    .directive('ngInk', ngInk);

  ngLastRepeat.$inject = ['$timeout'];
  function ngLastRepeat($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngLastRepeat' + (attr.ngLastRepeat ? '.' + attr.ngLastRepeat : ''));
          });
        }
      }
    }
  }

  ngInk.$inject = ['$timeout', 'ionicMaterialInk'];
  function ngInk($timeout, ionicMaterialInk) {
    return {
      restrict: 'A',
      scope: false,
      link: function() {
        $timeout(function() {
          ionicMaterialInk.displayEffect();
        }, 0);
      }
    }
  }
})();
