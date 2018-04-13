/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  This is accomplished by spinning up a small Express server that mocks the APIs, and then
  telling angular-cli to proxy requests to the API paths to this express instance.

  Customizing these fake services may be required if your app has advanced data requirements,
  or has other backend services that it requires. See build/sitecore-context-authentication-mock.js
  for an example of doing this to mock out the Sitecore login service.
*/

const express = require('express');
const config = require('./package.json').config;
const authMock = require('./build/sitecore-context-authentication-mock');
const navigationMockContext = require('./build/sitecore-context-navigation-mock');
const {
  createDisconnectedLayoutService,
  createDisconnectedContentService,
  createDisconnectedDictionaryService,
  ManifestManager,
} = require('@sitecore-jss/sitecore-jss-dev-tools');

const port = 3042;
const app = express();

authMock.attachToApp(app);

// customizes the "Sitecore Context" when running disconnected
// to make these customizations work in connected/integrated mode,
// the Layout Service will need to have the same customizations on the server side
const customizeContext = (defaultContext, route, manifest, request, response) => {
  const user = authMock.mockContext(request);
  const navigation = navigationMockContext(request);

  return {
    user,
    navigation,
    ...defaultContext,
  };
};

const appRoot = __dirname;

// the manifest manager maintains the state of the disconnected manifest data during the course of the dev run
// it provides file watching services, and language switching capabilities
const manifestManager = new ManifestManager({
  appName: config.appName,
  rootPath: appRoot,
  watchOnlySourceFiles: './data/**',
});

manifestManager
  .getManifest(config.language)
  .then((manifest) => {
    // creates a fake version of the Sitecore Layout Service that is powered by your disconnected manifest file
    const layoutService = createDisconnectedLayoutService({
      manifest,
      customizeContext,
      manifestLanguageChangeCallback: manifestManager.getManifest,
    });

    // creates a fake version of the Sitecore Dictionary Service that is powered by your disconnected manifest file
    const dictionaryService = createDisconnectedDictionaryService({
      manifest,
      manifestLanguageChangeCallback: manifestManager.getManifest,
    });

    // creates a fake version of the Sitecore Content Service that is powered by your disconnected manifest file
    const contentService = createDisconnectedContentService({
      manifest,
      manifestLanguageChangeCallback: manifestManager.getManifest,
    });

    // set up live reloading of the manifest when any manifest source file is changed
    manifestManager.setManifestUpdatedCallback((newManifest) => {
      layoutService.updateManifest(newManifest);
      dictionaryService.updateManifest(newManifest);
      contentService.updateManifest(newManifest);
      console.log('Manifest data updated. Refresh the browser to see latest content.');
    });

    // attach our disconnected service mocking middleware to webpack dev server
    app.use('/data', express.static('data'));
    app.use('/sitecore/api/layout/render', layoutService.middleware);
    app.use('/sitecore/api/jss/dictionary/:appName/:language', dictionaryService.middleware);
    app.use('/sitecore/api/jss/contentsvc', contentService.middleware);

    app.listen(port, () => {
      console.log(`Sitecore data mock listening on port ${port}!`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const PROXY_CONFIG = [
  {
    context: [
      '/data',
      '/sitecore/api/ssc/auth/login',
      '/sitecore/api/ssc/auth/logout',
      '/sitecore/api/layout/render',
      '/sitecore/api/jss/dictionary',
      '/sitecore/api/jss/contentsvc',
    ],
    target: `http://localhost:${port}`,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
