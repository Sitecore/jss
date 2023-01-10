/* eslint-disable func-names */

module.exports = function(config) {
  const karmaConfig = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    preprocessors: {
      'src/**/*.ts': 'coverage'
    },
    // list of files / patterns to load in the browser
    // list of files to exclude
    exclude: [],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    karmaTypescriptConfig: {
      include: ['./src/**/*.ts'],
      compilerOptions: { 
        "outDir": "./out-tsc/spec",
        "types": [
          "jasmine"
        ]
      },
      reports: {
        cobertura: {
          directory: './coverage',
          filename: 'cobertura-coverage.xml',
          subdirectory: './',
        }
      },
    },
    codeCoverage: true,
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    customLaunchers: {
      Chrome_with_debugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9222'],
        debug: true
   }}
  };

  if (process.env.testEnv && process.env.testEnv === 'ci') {
    karmaConfig.browsers = ['ChromeHeadless'];
    karmaConfig.singleRun = true;
  }

  config.set(karmaConfig);
};
