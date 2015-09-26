(function () {
  'use strict';
  angular.module('sagffl')
    .controller('ProgramsController', ProgramsController);

  ProgramsController.$inject = ['$log', '$leagueapps', '$scope', 'ionicMaterialInk', 'ionicMaterialMotion', '$timeout'];
  function ProgramsController($log, $leagueapps, $scope,  ionicMaterialInk, ionicMaterialMotion, $timeout) {
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
      $scope.$on('ngLastRepeat.programs', function() {
        $timeout(function() {
          ionicMaterialMotion.fadeSlideInRight();
          ionicMaterialInk.displayEffect();
        },100);
      });
    }
  }
})();
