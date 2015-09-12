describe('UserService', function() {
  var User;
  var spys;

  beforeEach(function() {
    spys = {};
    module('sagffl');
    inject(function(_User_ ) {
      User = _User_;
    });

    spys.User = {
      setUser: sinon.spy(User, 'setUser')
    };
  });

  it('sets isLogged to false on load', function() {
    expect(User.isLogged).to.be.false;
  });

  it('sets username to empty string on load', function() {
    expect(User.username).to.equal('');
  });

  describe('#setUser', function() {
    it('should set isLogged and username to true and "Panda"', function() {
      var testUser = {
        isLogged: true,
        username: 'Panda'
      };
      User.setUser(testUser);

      expect(spys.User.setUser).to.have.been.calledOnce;
      expect(User.isLogged).to.be.true;
      expect(User.username).to.equal(testUser.username);
    });
  });
});
