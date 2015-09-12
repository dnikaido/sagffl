(function () {
  'use strict';
  angular.module('sagffl')
    .controller('PhotosController', PhotosController);

  PhotosController.$inject = ['$log', '$q', '$localstorage', 'Facebook'];
  function PhotosController($log, $q, $localstorage, Facebook) {
    $log.debug('Loading PhotosController');
    var vm = this;
    vm.photoUrls = [];
    vm.getPhotos = getPhotos;

    activate();

    function activate() {
      getPhotos();
    }

    function getPhotos() {
      vm.photoUrls = $localstorage.getObject('photoUrls');
      if(!vm.photoUrls) {
        return Facebook.getPhotoData(FB)
          .then(function (response) {
            $log.debug(response);
            var photoDataList = response.data;
            var minHeight = 250;
            var maxHeight = 350;
            vm.photoUrls = _.compact(
              _.pluck(
                _.map(photoDataList, function (photoData) {
                  return _.find(photoData.images, function (photo) {
                    return minHeight < photo.height && photo.height < maxHeight;
                  })
                }),
                'source'));
            $localstorage.setObject('photoUrls', vm.photoUrls);
            return vm.photoUrls;
          })
          .catch(function (error) {
            $log.error(error);
            return null;
          });
      } else {
        var photosDeferred = $q.defer();
        photosDeferred.resolve(vm.photoUrls);
        return photosDeferred.promise;
      }
    }
  }
})();
