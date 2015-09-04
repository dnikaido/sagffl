(function () {
  'use strict';
  angular.module('sagffl')
    .controller('PhotosController', PhotosController);

  PhotosController.$inject = ['$log', 'FacebookService'];
  function PhotosController($log, FacebookService) {
    $log.debug('Loading PhotosController');
    var vm = this;
    vm.photoUrls = [];

    activate();

    function activate() {
    }

    function getPhotos() {
      FacebookService.getPhotoData()
      .then(function(response) {
          $log.debug(response);
          var photoDataList = response.data;
          var minHeight = 250;
          var maxHeight = 350;
          vm.photoUrls = _.compact(
            _.pluck(
              _.map(photoDataList, function(photoData) {
                return _.find(photoData.images, function(photo) {
                  return minHeight < photo.height && photo.height < maxHeight;
                })
              }),
            'source'));

        })
      .catch(function(error) {
          $log.error(error);
        });
    }
  }
})();
