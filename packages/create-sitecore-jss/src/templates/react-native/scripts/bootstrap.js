require('dotenv').config();
const configGenerator = require('./generate-config');
const { constants } = require('@sitecore-jss/sitecore-jss-react-native');
const { startSitecoreTunnel, transformScJssConfig } = require('./utils');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;
const connectedTunnel = process.env.JSS_MODE === 'connected-tunnel';

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
const disconnectedProxyPort = process.env.PROXY_PORT || 3042;
const configOverride = disconnected
  ? { sitecoreApiHost: `http://localhost:${disconnectedProxyPort}` }
  : {};

require('./generate-component-factory');

(async () => {
  if (disconnected || connectedTunnel) {
    if (disconnected) {
      configOverride.originalApiHost = configOverride.sitecoreApiHost.slice();
    } else {
      configOverride.originalApiHost =
        process.env.SITECORE_API_HOST || transformScJssConfig().sitecoreApiHost;
      configOverride.sitecoreApiHost = configOverride.originalApiHost
        ? configOverride.originalApiHost.slice()
        : null;
    }

    configOverride.sitecoreApiHost = await startSitecoreTunnel({
      sitecoreApiHost: configOverride.sitecoreApiHost,
      isDisconnected: disconnected,
      proxyPort: disconnectedProxyPort,
    });
  }

  configGenerator(configOverride);
})();
