Angular Unit Tests
==================

To run the karma test suite, run these commands from the test directory:

    npm install
    npm test
    
To run the e2e tests, some of the setup was done with npm install, but we have some additional frameworks to setup. First, we install protractor and get the webdriver:

```
# Install protractor
npm install protractor -g
 
# Download the selenium standalone server
webdriver-manager update
```

To run protractor, for now we do it manually (this could be bundled in npm or gulp). Run each of these commands in a separate terminal window (and again, from this test directory):
    
```
gulp
```
```
webdriver-manager start
```
```
#from the test directory
protractor config/protractor.conf.js
```
