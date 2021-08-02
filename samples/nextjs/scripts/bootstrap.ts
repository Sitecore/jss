import { generateConfig } from './generate-config';
// #START_STRIP
import { constants } from '@sitecore-jss/sitecore-jss-nextjs';
// #END_STRIP
/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

// #START_STRIP
const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;
// #END_STRIP
/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
// #START_STRIP
const port = process.env.PORT || 3000;
const configOverride = disconnected ? { sitecoreApiHost: `http://localhost:${port}` } : undefined;
// #END_STRIP
generateConfig(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';
