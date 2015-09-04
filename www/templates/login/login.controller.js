(function () {
  'use strict';
  angular.module('sagffl')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$scope', '$state', 'LoginService'];
  function LoginController($log, $scope, $state, LoginService) {
    $log.debug('Loading LoginController');
    var vm = this;

    vm.login = LoginService.login();

    activate();

    function activate() {
      if($state.current.data.logout) {
        LoginService.logout();
      }
      $scope.$watch(function() { return LoginService.user; }, checkLogin);
    }

    function checkLogin(user) {
      if(user.isLogged) {
        $state.go('app.home');
      }
    }

  }
})();
