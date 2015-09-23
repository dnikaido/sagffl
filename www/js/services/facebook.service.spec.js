describe('FacebookService', function() {
  var $q;
  var rootScope;
  var Facebook;
  var $cordovaOauth;
  var FB;
  var spys;

  beforeEach(module('mock.fb'));
  beforeEach(function() {
    spys = {};
    module('facebook');
    inject(function(_$q_, $rootScope, FBStub, _Facebook_, _$cordovaOauth_) {
      $q = _$q_;
      rootScope = $rootScope;
      FB = FBStub;
      Facebook = _Facebook_;
      $cordovaOauth = _$cordovaOauth_;
    });
    spys.Facebook = {
      getPhotoData: sinon.spy(Facebook, 'getPhotoData'),
      login: sinon.spy(Facebook, 'login'),
      logout: sinon.spy(Facebook, 'logout')
    };
    var facebookDeferred = $q.defer();
    facebookDeferred.resolve({access_token: true});
    spys.$cordovaOauth = {
      facebook: sinon.stub($cordovaOauth, 'facebook').returns(facebookDeferred.promise)
    };
  });

  describe('#login', function() {
    it('should log in and return a username,status = connected', function() {
      var isLogged;
      var name;
      Facebook.login(FB)
        .then(function(response) {
          isLogged = response.connected;
          name = response.name;
        });
      rootScope.$apply();

      expect(isLogged).to.be.true;
      expect(name).to.equal('Panda');
    });

    //it('should log in and return a username, status = not_authorized', function() {
    //  var isLogged;
    //  var name;
    //  FB.getLoginStatus = sinon.stub()
    //    .callsArgWith(0, { connected: 'not_authorized' });
    //  Facebook.login(FB)
    //    .then(function(response) {
    //      isLogged = response.connected;
    //      name = response.name;
    //    });
    //  rootScope.$apply();
    //
    //  expect(isLogged).to.be.true;
    //  expect(name).to.equal('Panda');
    //  expect(FB.login).to.have.been.calledOnce;
    //});

    it('should not log in and return an error, status = error', function() {
      var errorString = 'server is down';
      FB.getLoginStatus = sinon.stub()
        .yields({ error: errorString });
      Facebook.login(FB)
        .then(function(){})
        .catch(function(error) {
          expect(error).to.equal(errorString);
        });
      rootScope.$apply();
    });
  });

  describe('#logout', function() {
    it('should log out successfully', function() {
      var isLogged;
      Facebook.logout(FB)
        .then(function(response) {
          isLogged = response.connected;
        });
      rootScope.$apply();

      expect(isLogged).to.be.false;
    });
  });

  describe('#getPhotoData', function() {
    it('should retrieve an object with photo data', function() {
      var photos;
      Facebook.getPhotoData(FB)
        .then(function(response) {
          photos = response.photos;
        });
      rootScope.$apply();

      expect(photos).to.be.true;
      expect(FB.api).to.have.been.calledOnce;
    });
  });

});
