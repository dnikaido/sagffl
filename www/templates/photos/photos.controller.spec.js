describe('PhotosController', function() {
  var controller;
  var rootScope;
  var scope;
  var Facebook;
  var localstorage;
  var FB;
  var PhotosController;
  var spys;

  beforeEach(module('mock.services'));
  beforeEach(function() {
    spys = {};
    FB = {};
    module('sagffl');
    inject(function($controller, $rootScope, FacebookSpy, LocalStorageSpy) {
      controller = $controller;
      rootScope = $rootScope;
      scope = rootScope.$new();
      Facebook = FacebookSpy;
      localstorage = LocalStorageSpy;
    });

    PhotosController = controller('PhotosController', {
      $scope: scope,
      Facebook: Facebook,
      $localstorage: localstorage
    });
  });

  it('should load PhotosController', function() {
    expect(controller).to.exist;
  });

  describe('#getPhotos', function() {
    it('should set photoUrls to be a list of photo urls', function() {
      var value;
      PhotosController.getPhotos()
        .then(function(photoUrls) {
          value = photoUrls;
        });

      rootScope.$apply();
      expect(value).to.eql(getPhotosRet);
      expect(PhotosController.photoUrls).to.eql(getPhotosRet);
      expect(localstorage.setObject).to.have.been.called;
    });

    it('should retrieve photoUrls from storage', function() {
      rootScope.$apply(); //resolve activate()
      localstorage.getObject = sinon.stub()
        .withArgs('photoUrls')
        .returns(getPhotosRet);
      localstorage.setObject.reset(); //since this'll be called in activate
      var value;
      PhotosController.getPhotos()
        .then(function(photoUrls) {
          value = photoUrls;
        });
      rootScope.$apply();

      expect(value).to.eql(getPhotosRet);
      expect(PhotosController.photoUrls).to.eql(getPhotosRet);
      expect(localstorage.setObject).to.not.have.been.called;
    });
  });

});

