(function() {
  'use strict';
  angular.module('mock.services', [])
    .factory('LocalStorageSpy', LocalStorage)
    .factory('FacebookSpy', Facebook)
    .factory('ionicMaterialInkSpy', ionicMaterialInk);

  function ionicMaterialInk() {
    return {
      displayEffect: sinon.stub()
    };
  }

  function LocalStorage() {
    return {
      get: sinon.stub().returnsArg(1),
      set:  sinon.stub(),
      getObject: sinon.stub().returns({}),
      setObject:  sinon.stub(),
      clear:  sinon.stub()
    };
  }

  Facebook.$inject = ['$q'];
  function Facebook($q) {
    var loginDeferred = $q.defer();
    loginDeferred.resolve({
      connected: true,
      name: 'Panda Kaido'
    });
    var loginStub = sinon.stub().returns(loginDeferred.promise);

    var logoutDeferred = $q.defer();
    logoutDeferred.resolve({
      connected: false,
      name: ''
    });
    var logoutStub = sinon.stub().returns(logoutDeferred.promise);

    return {
      getPhotoData: sinon.stub(),
      login: loginStub,
      logout: logoutStub
    };
  }
})();
