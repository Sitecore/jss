
import { generateConfig } from './generate-config';
const projects = require('../angular.json').projects;

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates TS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.argv.some((arg) => arg === '--disconnected');

/*
  CONFIG GENERATION
  Generates the /src/environments/environment.ts file which contains runtime configuration
  that the app can import and use.

  This is generated rather than using Angular environments because of the need to set config params
  based on build arguments, which env files don't directly allow.
*/
function writeConfig(configOverride: any, outputPath?: string) {
  if (disconnected) {
    configOverride.sitecoreApiHost = `http://localhost:${projects['JssAngularWeb'].targets.serve.options.port}`;
  }

  generateConfig(configOverride, outputPath);
}

writeConfig({ production: false });
writeConfig({ production: true }, 'src/environments/environment.prod.ts');

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
