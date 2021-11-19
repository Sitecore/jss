import { generateConfig } from './generate-config';
import { constants } from '@sitecore-jss/sitecore-jss-nextjs';
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
const configOverride: { [key: string]: string } = {};
if (disconnected) {
  configOverride.sitecoreApiHost = `http://localhost:${port}`;
}

generateConfig(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';
