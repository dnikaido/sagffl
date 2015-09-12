(function() {
  'use strict';
  angular.module('mock.fb', [])
    .factory('FBStub', FB);

  function FB() {
    var apiSuccess = {
      name: 'Panda',
      photos: true
    };
    var apiStub = sinon.stub()
      .yields(apiSuccess);

    var getLoginStatusSuccess = { status: 'connected' };
    var getLoginStatusStub = sinon.stub()
      .yields(getLoginStatusSuccess);

    var logoutSuccess = { connected: false };
    var logoutStub = sinon.stub()
      .yields(logoutSuccess);

    var loginSuccess = { authResponse: true };
    var loginStub = sinon.stub()
      .yields(loginSuccess);

    return {
      api: apiStub,
      getLoginStatus: getLoginStatusStub,
      logout: logoutStub,
      login: loginStub
    };
  }
})();
