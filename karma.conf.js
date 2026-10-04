// Karma configuration for `ng test`. Headless Chrome with --no-sandbox so it
// runs on GitHub Actions (ubuntu-latest ships google-chrome). Coverage via
// karma-coverage; thresholds are enforced in CI Phase 3 follow-ups.
module.exports = function (config) {
  config.set({
    basePath: '',
    // NOTE: '@angular-devkit/build-angular' framework/plugin is what injects
    // the compiled test bundle (with discovered specs) into Karma. Omitting
    // it yields a green run with zero tests.
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    restartOnFileChange: true
  });
};
