(function () {
  'use strict';
  angular.module('facebook', [])
    .run(initialize)
    .factory('FacebookAuthorization', FacebookAuthorization)
    .factory('FacebookService', FacebookService);

  initialize.$inject = ['$window', 'FacebookAuthorization'];
  function initialize($window, FacebookAuthorization) {
    $window.fbAsyncInit = function() {
      FB.init({
        appId: '400628200140143',
        channelUrl: 'channel.html',
        status: true,
        xfbml: false,
        version: 'v2.4'
      });
      FacebookAuthorization.watchAuthenticationStatusChange();
    };

    (function(d){
      // load the Facebook javascript SDK

      var js,
        id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";

      ref.parentNode.insertBefore(js, ref);

    }(document));
  }

  FacebookAuthorization.$inject = ['$log', '$rootScope', '$q'];
  function FacebookAuthorization($log, $rootScope, $q) {
    $log.debug('Loading FacebookAuthorization');
    var service = this;

    $rootScope.user = {};
    service.user = {
      isLogged : false,
      profile : {}
    };

    service.watchAuthenticationStatusChange = watchAuthenticationStatusChange;

    return service;

    function clearUser() {
      $log.debug('Logging out of Facebook');
      service.user.isLogged = false;
      service.user.profile = {};
      $rootScope.$broadcast('fbUser', service.user);
    }

    function getUserInfo() {
      var deferred = $q.defer();

      FB.api('/me',
        function(response) {
          if (!response || response.error) {
            clearUser();
            deferred.reject(response.error);
          } else {
            service.user.profile = response;
            deferred.resolve();
          }
        });
      return deferred.promise;
    }

    function watchAuthenticationStatusChange() {
      FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
          service.user.isLogged = true;
          getUserInfo()
            .then(function() {
              broadcastUser();
            })
            .catch(function(error) {
              $log.debug(error);
              clearUser();
              broadcastUser();
            });
        } else {
          clearUser();
          broadcastUser();
        }
      });
    }

    function broadcastUser() {
      $rootScope.$broadcast('fbUser', {
        user: service.user
      });
    }
  }

  FacebookService.$inject = ['$log', '$q'];
  function FacebookService($log, $q) {
    var groupPageId = 'sagffl';

    return {
      getPhotoData: getPhotoData,
      login: login,
      logout: logout
    };

    function getPhotoData() {
      var deferred = $q.defer();
      FB.api(
        '/' + groupPageId + '/photos',
        {
          fields: 'images'
        },
        function(response) {
          if (!response || response.error) {
            deferred.reject(response.error);
          } else {
            deferred.resolve(response);
          }
        });
      return deferred.promise;
    }

    function login() {
      FB.login();
    }

    function logout() {
      $log.debug('Logging out of Facebook');
      FB.logout(function() {
        $log.debug('Logged out of Facebook');
      }, function(response) {
        $log.debug('There was an error logging out of Facebook:' + response.error);
      });
    }
  }
})();
