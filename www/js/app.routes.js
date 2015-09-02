(function() {
  'use strict';
  angular.module('sagffl')
    .config(configureRoutes);

  configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configureRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuController as vm'
      })
      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'templates/help/help.html'
          }
        }
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home/home.html',
            controller: 'HomeController as vm'
          }
        }
      })

      .state('app.photos', {
        url: '/photos',
        views: {
          'menuContent': {
            templateUrl: 'templates/photos/photos.html',
            controller: 'PhotosController as vm'
          }
        }
      });
  }
})();
