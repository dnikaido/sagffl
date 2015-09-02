(function() {
  'use strict';
  angular.module('sagffl')
    .service('Anchor', AnchorService);

  function AnchorService() {
    var service = this;
    service.states = [];

    loadStates();

    function loadStates() {
      service.states.push(new State('app.home', 'Home'));
      service.states.push(new State('app.photos', 'Photos'));
      service.states.push(new State('app.help', 'Help'));
    }

    function State(state, name) {
      this.state = state;
      this.name = name;
    }
  }
})();
