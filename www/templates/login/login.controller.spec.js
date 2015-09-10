describe('LoginController', function() {
  var controller;
  var rootScope;
  var scope;
  var $localstorage;
  var Facebook;
  var User;
  var state;
  var LoginController;
  var spys;

  beforeEach(module('mock.state'));
  beforeEach(module('mock.services'));
  beforeEach(function() {
    spys = {};
    module('sagffl');
    inject(function($controller, $rootScope, StateMock, LocalStorageSpy, FacebookSpy, _User_ ) {
      controller = $controller;
      rootScope = $rootScope;
      scope = rootScope.$new();
      state = StateMock;
      $localstorage = LocalStorageSpy;
      Facebook = FacebookSpy;
      User = _User_;
    });

    spys.$localstorage = $localstorage;
    spys.Facebook = Facebook;
    spys.User = {
      setUser: sinon.spy(User, 'setUser')
    };

    state.current.data = {
      logout: false
    };

    LoginController = controller('LoginController', {
      $localstorage: spys.$localstorage,
      Facebook: spys.Facebook,
      User: User,
      $state: state
    });
  });

  it('should load LoginController', function() {
    rootScope.$digest();

    expect(LoginController).to.exist;
    expect(spys.$localstorage.clear).to.have.been.calledOnce;
  });

  it('if the logout param is true then it should call log out', function() {
    state.current.data = {
      logout: true
    };
    LoginController = controller('LoginController', {
      $localstorage: spys.$localstorage,
      Facebook: spys.Facebook,
      User: User,
      $state: state
    });
    rootScope.$digest();

    expect(spys.Facebook.logout).to.have.been.calledOnce;
    expect(spys.User.setUser).to.have.been.calledOnce;
    expect(User.isLogged).to.equal(false);
  });

  describe('#login', function() {
    it('should call FB login and transition to "app.home"', function() {
      state.expectTransitionTo('app.home');
      LoginController.login();
      rootScope.$digest();

      expect(spys.Facebook.login).to.have.been.calledOnce;
      state.ensureAllTransitionsHappened();
      expect(User.isLogged).to.equal(true);
    });
  });

  describe('#logout', function() {
    it('should call FB logout', function() {
      LoginController.logout();
      rootScope.$digest();

      expect(spys.Facebook.logout).to.have.been.calledOnce;
      expect(User.isLogged).to.equal(false);
    })
  })
});
