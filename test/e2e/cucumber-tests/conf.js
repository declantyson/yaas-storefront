exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve('../../../node_modules/protractor-cucumber-framework'),
  specs: [
    './features/checkout.feature',
  ],
  cucumberOpts: {
    require: ['./features', './env.js']
  },
  capabilities: {
    'browserName': 'firefox',
    //shardTestFiles: true,
    //maxInstances: 2
  },
  restartBrowserBetweenTests: false,

  onPrepare: function() {
    browser.driver.manage().window().maximize();
  }
};
