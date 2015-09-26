(function () {
  'use strict';
  angular.module('sagffl')
    .controller('ProgramsController', ProgramsController);

  ProgramsController.$inject = ['$log', '$leagueapps', '$scope', '$timeout'];
  function ProgramsController($log, $leagueapps, $scope, $timeout) {
    $log.debug('loading ProgramsController');
    var vm = this;

    vm.programs = [];

    activate();

    function activate() {
      $leagueapps.getPrograms()
        .success(function(response) {
            $log.debug(response);
            vm.programs = response;
        })
        .catch(function(error) {
            $log.debug(error);
        });
    }
  }
})();
