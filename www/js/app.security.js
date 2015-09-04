(function() {
  'use strict';
  angular.module('sagffl')
    .run(SetupStateAccess);

  SetupStateAccess.$inject = ['$log', '$rootScope', 'LoginService'];
  function SetupStateAccess($log, $rootScope, LoginService) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        if(!toState.access.public && !LoginService.user.isLogged) {

        }
      });
  }
})();
