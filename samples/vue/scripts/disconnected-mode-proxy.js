/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  This is accomplished by spinning up a small Express server that mocks the APIs, and then
  telling the dev server to proxy requests to the API paths to this express instance.
*/

// these environment variables are necessary for Vue to allow us
// to process transpiled ES6 that Node can run
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;
process.env.VUE_CLI_BABEL_TARGET_NODE = true;

const fs = require('fs');
const { createDefaultDisconnectedServer } = require('@sitecore-jss/sitecore-jss-dev-tools');
const config = require('../package.json').config;

const touchToReloadFilePath = 'src/temp/config.js';

const proxyOptions = {
  appRoot: __dirname,
  appName: config.appName,
  watchPaths: ['../data'],
  language: config.language,
  port: process.env.PROXY_PORT || 3042,
  compilers: ['@babel/register'],
  onManifestUpdated: (manifest) => {
    // if we can resolve the config file, we can alter it to force reloading the app automatically
    // instead of waiting for a manual reload. We must materially alter the _contents_ of the file to trigger
    // an actual reload, so we append "// reloadnow" to the file each time. This will not cause a problem,
    // since every build regenerates the config file from scratch and it's ignored from source control.
    if (fs.existsSync(touchToReloadFilePath)) {
      const currentFileContents = fs.readFileSync(touchToReloadFilePath, 'utf8');
      const newFileContents = `${currentFileContents}\n// reloadnow`;
      fs.writeFileSync(touchToReloadFilePath, newFileContents, 'utf8');

      console.log('Manifest data updated. Reloading the browser.');
    } else {
      console.log('Manifest data updated. Refresh the browser to see latest content!');
    }
  },
};

createDefaultDisconnectedServer(proxyOptions);
