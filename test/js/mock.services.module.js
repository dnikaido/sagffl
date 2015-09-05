(function () {
  'use strict';
  angular
    .module('sagffl.mock.services', [])
    .factory('ionicMaterialInk', function(){
      return { displayEffect: sinon.spy() };
    });

  angular
    .module('facebook', [])
    .factory('Facebook', Facebook);

  Facebook.$inject = ['$q'];
  function Facebook($q) {
    return {
      login: sinon.spy(),
      logout: sinon.spy(),
      getPhotoData: getPhotoData
    };

    function getPhotoData(FB) {
      var deferred = $q.defer();
      var retval = getPhotosDataRet;
      var errval = {};
      deferred.resolve(retval);
      deferred.reject(errval);
      return deferred.promise;
    }
  }
})();
