const { constants } = require('@sitecore-jss/sitecore-jss-react');
const configGenerator = require('./generate-config');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
const port = process.env.PORT || 3000;
const configOverride = disconnected ? { sitecoreApiHost: `http://localhost:${port}` } : null;

configGenerator(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
