exports.config = {
  //seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  //chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver',

  seleniumAddress: 'http://localhost:4444/wd/hub',

  // location of E2E test specs
  specs: [
    '../e2e/*.js'
  ],
  
  // configure multiple browsers to run tests
  // multiCapabilities: [{
  //   'browserName': 'firefox'
  // }, {
  //   'browserName': 'chrome'
  // }, {
  //   'browserName': 'safari'
  // }],

  // or configure a single browser
  
  capabilities: {
    'browserName': 'chrome'
  },
  

  // url where your app is running, relative URLs are prepending with this URL
  baseUrl: 'http://localhost:8080/',

  // testing framework, jasmine is the default
  //framework: 'jasmine'
};