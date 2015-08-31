(function () {
  'use strict';
  angular.module('starter')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$log', '$scope'];
  function HomeController($log, $scope) {
    $log.debug('Loading HomeController');
    var vm = this;

    vm.message = 'Welcome home!';
    $scope.message = vm.message;
  }
})();
