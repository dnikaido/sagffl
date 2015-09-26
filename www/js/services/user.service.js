(function() {
  'use strict';
  angular.module('sagffl')
    .service('User', UserService);

  UserService.$inject = ['$log'];
  function UserService($log) {
    $log.debug('loading User');
    var service = this;

    service.isLogged = false;
    service.username = '';
    
    service.setUser = setUser;

    function setUser(user) {
      service.isLogged = user.isLogged;
      service.username = user.username;
      $log.debug(user);
    }

  }
})();
