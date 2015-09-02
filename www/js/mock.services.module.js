(function () {
  'use strict';
  angular.module('sagffl.mock.services', [])
    .factory('ionicMaterialInk', function(){
      return { displayEffect: sinon.spy() }
    });
})();
