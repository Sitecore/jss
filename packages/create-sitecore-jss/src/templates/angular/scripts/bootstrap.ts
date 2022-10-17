import 'dotenv/config';
import { constants } from '@sitecore-jss/sitecore-jss-angular';
import { generateConfig } from './generate-config';
const projects = require('../angular.json').projects;
const chalk = require('chalk');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates TS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

if (disconnected && process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL) {
  throw new Error(chalk.red("GraphQL requests to Dictionary and Layout services are not supported in disconnected mode."))
}

/*
  CONFIG GENERATION
  Generates the /src/environments/environment.ts file which contains runtime configuration
  that the app can import and use.

  This is generated rather than using Angular environments because of the need to set config params
  based on build arguments, which env files don't directly allow.
*/
function writeConfig(configOverride: { production: boolean, sitecoreApiHost?: string }, outputPath?: string) {
  if (disconnected) {
    configOverride.sitecoreApiHost = `http://localhost:${projects['<%- appName %>'].architect.serve.options.port}`;
  }

  generateConfig(configOverride, outputPath);
}

writeConfig({ production: false });
writeConfig({ production: true }, 'src/environments/environment.prod.ts');

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
