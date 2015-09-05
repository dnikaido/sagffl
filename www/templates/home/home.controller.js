(function () {
  'use strict';
  angular.module('sagffl')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$log', '$scope', 'User'];
  function HomeController($log, $scope, User) {
    $log.debug('Loading HomeController');
    var vm = this;

    vm.user = User;
    vm.message = 'Welcome home!';
    $scope.message = vm.message;
  }
})();
