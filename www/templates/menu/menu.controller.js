(function () {
  'use strict';
  angular.module('sagffl')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$log', '$state', 'Anchor'];
  function MenuController($log, $state, Anchor) {
    $log.debug('Loading MenuController');
    var vm = this;

    vm.$state = $state;
    vm.menuItems = Anchor.states;
  }
})();
