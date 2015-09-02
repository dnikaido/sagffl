(function () {
  'use strict';
  angular.module('sagffl')
    .controller('PhotosController', PhotosController);

  PhotosController.$inject = ['$log'];
  function PhotosController($log) {
    $log.debug('Loading PhotosController');

    activate();

    function activate() {
    }
  }
})();
