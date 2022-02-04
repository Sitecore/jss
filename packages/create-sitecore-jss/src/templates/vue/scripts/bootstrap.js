const { constants } = require('@sitecore-jss/sitecore-jss-vue');
const configGenerator = require('./generate-config');
const vueConfig = require('../vue.config');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

if (disconnected && process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL) {
  throw new Error("GraphQL requests to Dictionary and Layout service are not supported in disconnected mode.")
}

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
const configOverride = disconnected
  ? { sitecoreApiHost: `http://localhost:${vueConfig.devServer.port}` }
  : null;
configGenerator(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
