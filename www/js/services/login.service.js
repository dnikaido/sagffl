(function() {
  'use strict';
  angular.module('sagffl')
    .factory('LoginService', LoginService);

  LoginService.$inject = ['$log', '$rootScope', 'FacebookService'];
  function LoginService($log, $rootScope, FacebookService) {
    $log.debug('Loading LoginService');
    var service = this;

    $rootScope.$on('fbUser', function(event, args) {
      service.user.isLogged = args.user.isLogged;
      service.user.username = args.user.profile.username;
    });

    service.user = {
      isLogged : false,
      username : ''
    };
    service.logout = logout;
    service.login = login;

    return service;

    function login() {
      FacebookService.login();
    }

    function logout() {
      FacebookService.logout();
    }

  }
})();
