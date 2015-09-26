(function () {
  'use strict';
  angular.module('sagffl')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$log','User', '$leagueapps'];
  function HomeController($log, User, $leagueapps) {
    $log.debug('Loading HomeController');
    var vm = this;

    vm.announcements = [];
    vm.user = User;

    activate();

    function activate() {
      $leagueapps.getAnnouncements()
        .success(function(response) {
          $log.debug(response);
          vm.announcements = response;
        })
        .catch(function(error) {
          $log.debug(error);
        });
    }
  }
})();
