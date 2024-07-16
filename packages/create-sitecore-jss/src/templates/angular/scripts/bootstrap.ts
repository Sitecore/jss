import 'dotenv/config';
import { generateConfig } from './generate-config';

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates TS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

/*
  CONFIG GENERATION
  Generates the /src/environments/environment.js file which contains runtime configuration
  that the app can import and use.

  This is generated rather than using Angular environments because of the need to set config params
  based on build arguments, which env files don't directly allow.
*/
function writeConfig(
  configOverride: { production: boolean; sitecoreApiHost?: string },
  outputPath?: string
) {
  generateConfig(configOverride, outputPath);
}

writeConfig({ production: false });
writeConfig({ production: true }, 'src/environments/environment.prod.js');

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
