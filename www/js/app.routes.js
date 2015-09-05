(function() {
  'use strict';
  angular.module('sagffl')
    .config(configureRoutes)
    .run(SetupStateDefaults);

  configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configureRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login/login.html',
        controller: 'LoginController as vm',
        access: {
          required : false
        }
      })
      .state('logout', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login/login.html',
        controller: 'LoginController as vm',
        data: {
          logout: true
        },
        access: {
          required : false
        }
      })
      .state('app', {
        abstract: true,
        templateUrl: 'templates/menu/menu.html',
        controller: 'MenuController as vm'
      })
      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'templates/help/help.html'
          }
        },
        access: {
          required : true
        }
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home/home.html',
            controller: 'HomeController as vm'
          }
        },
        access: {
          required : true
        }
      })
      .state('app.photos', {
        url: '/photos',
        views: {
          'menuContent': {
            templateUrl: 'templates/photos/photos.html',
            controller: 'PhotosController as vm'
          }
        },
        access: {
          required : true
        }
      });
  }

  SetupStateDefaults.$inject = ['$rootScope'];
  function SetupStateDefaults($rootScope) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        if(!toState.data) {
          toState.data = {};
        }
      });
  }
})();
