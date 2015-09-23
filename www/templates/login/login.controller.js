(function () {
  'use strict';
  angular.module('sagffl')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', '$localstorage', 'Facebook', 'User'];
  function LoginController($log, $state, $localstorage, Facebook, User) {
    $log.debug('Loading LoginController');
    var vm = this;

    vm.login = login;
    vm.logout = logout;

    activate();

    function activate() {
      $localstorage.clear();
      if($state.current.data.logout) {
        vm.logout();
      }
    }

    function login() {
      Facebook.login(FB)
        .then(function(response) {
          User.setUser({
            isLogged : response.connected,
            username : response.name
          });
          $state.go('app.home');
        })
        .catch(function(error) {
          $log.debug(error);
        });
    }

    function logout() {
      Facebook.logout(FB)
        .then(function(response) {
          User.setUser({
            isLogged : response.connected,
            username : ''
          });
        });
    }
  }
})();
