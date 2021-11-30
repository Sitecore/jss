import { generateConfig } from './generate-config';
// #START_EMPTY
import { constants } from '@sitecore-jss/sitecore-jss-nextjs';
// #END_EMPTY
/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

// #START_EMPTY
const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;
// #END_EMPTY
/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
// #START_EMPTY
const port = process.env.PORT || 3000;
// #END_EMPTY
const configOverride: { [key: string]: string } = {};
// #START_EMPTY
if (disconnected) {
  configOverride.sitecoreApiHost = `http://localhost:${port}`;
}
// #END_EMPTY

generateConfig(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';

/*
   PLUGINS GENERATION
*/
import './generate-plugin';
