'use strict';

// Karma configuration
module.exports = function(config) {
  var basePath = '.';

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: basePath,

    // frameworks to use
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised'],

    // list of files / patterns to load in the browser
    files: [
      basePath + '/www/lib/angular/angular.js',
      basePath + '/www/lib/angular-animate/angular-animate.js',
      basePath + '/www/lib/angular-sanitize/angular-sanitize.js',
      basePath + '/www/lib/angular-ui-router/release/angular-ui-router.js',
      basePath + '/www/lib/angular-mocks/angular-mocks.js',
      basePath + '/www/lib/ionic/release/js/ionic.js',
      basePath + '/www/lib/ionic/release/js/ionic-angular.js',
      basePath + '/www/lib/ionic-material/dist/ionic.material.js',
      basePath + '/www/lib/underscore/underscore.js',
      basePath + '/www/lib/ngCordova/dist/ng-cordova.js',
      basePath + '/www/lib/ngCordova/dist/ng-cordova-mocks.js',
      basePath + '/test/js/*.js',
      basePath + '/www/js/**/*.js',
      basePath + '/www/templates/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      basePath + '/www/js/app.routes.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],

    // coverage
    preprocessors: {
      // source files that you want to generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'www/js/**/*.js': ['coverage'],
      'www/templates/**/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    },

    // web server port
    port: 9876,
    // Look for server on port 3001 (invoked by mocha) - via @brownman
    proxies: {
      '/': 'http://localhost:3001/'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values:
    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
