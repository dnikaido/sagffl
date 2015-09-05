(function () {
  'use strict';
  angular.module('sagffl')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$log', '$state', 'Anchor', 'ionicMaterialInk', 'User'];
  function MenuController($log, $state, Anchor, ionicMaterialInk, User) {
    $log.debug('Loading MenuController');
    var vm = this;

    vm.$state = $state;
    vm.menuItems = Anchor.states;

    activate();

    function activate() {
      ionicMaterialInk.displayEffect();
    }
  }
})();
