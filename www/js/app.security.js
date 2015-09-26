(function() {
  'use strict';
  angular.module('sagffl')
    .run(SetupStateAccess);

  SetupStateAccess.$inject = ['$log', '$rootScope', '$state', 'User'];
  function SetupStateAccess($log, $rootScope, $state, User) {
    $log.debug('running SetupStateAccess');
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        $log.debug('checking accesss...');
        //if(toState.access.required && !User.isLogged) {
        //  event.preventDefault();
        //  $state.go('logout');
        //}
      });
  }
})();
