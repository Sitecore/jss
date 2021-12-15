/* eslint-disable no-underscore-dangle */

const { start } = require('./startPlatform');
const jssConfig = require('./config');

const options = {
  platform: 'android', // android rules, iOS drools. burn.
  appMode: 'disconnected',
};

/*
  Start script
  Used to start the RN packager with cache clearing and appropriate environment variables for babel
  Can be used to inject middleware, etc if needed
*/

process.argv.forEach((value, index, map) => {
  switch (value) {
    case '--platform':
      options.platform = map[index + 1];
      break;
    case '--appMode':
      options.appMode = map[index + 1];
      break;
    default:
      break;
  }
});

const resolveEnvVars = (appMode) => {
  // default to disconnected mode.
  // paths are relative to the _project_ root, i.e. where .babelrc.js lives.
  // note: these environment variables are _only_ intended for babel, though some will be made available as global variables in the app.
  const envVars = {
    APP_DATA_SERVICE: './src/dataService/dataService.disconnected',
    APP_STATIC_ASSETS: './assets/images.disconnected',
  };

  if (appMode === 'connected' || appMode === 'connected-tunnel') {
    envVars.APP_STATIC_ASSETS = './assets/images.connected';
    envVars.__SC_API_HOST__ = jssConfig.sitecore.layoutServiceHost;
    envVars.__SC_API_KEY__ = jssConfig.sitecore.apiKey;
  }

  if (appMode === 'connected') {
    envVars.APP_DATA_SERVICE = './src/dataService/dataService.connected';
  }

  if (appMode === 'connected-tunnel') {
    envVars.APP_DATA_SERVICE = './src/dataService/dataService.connected-tunnel';
    // start ngrok tunnel
    const { startSitecoreTunnel } = require('./startSitecoreTunnel'); // eslint-disable-line
    return startSitecoreTunnel(jssConfig.sitecore.layoutServiceHost).then((tunnelHost) => {
      envVars.__SC_TUNNEL_HOST__ = tunnelHost;
      return envVars;
    });
  }
  return Promise.resolve(envVars);
};

resolveEnvVars(options.appMode)
  .then((envVars) => {
    start(options.platform, envVars);
  })
  .catch((err) => {
    console.error(err);
  });
