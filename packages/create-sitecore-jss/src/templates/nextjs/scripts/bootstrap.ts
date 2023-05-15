import 'dotenv/config';
import { generateConfig } from './generate-config';
import { constants } from '@sitecore-jss/sitecore-jss-nextjs';
import chalk from 'chalk';
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
  if (process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL) {
    throw new Error(
      chalk.red(
        'GraphQL requests to Dictionary and Layout services are not supported in disconnected mode.'
      )
    );
  }
  configOverride.sitecoreApiHost = `http://localhost:${port}`;
}

generateConfig(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';

/*
   PLUGINS GENERATION
*/
import './generate-plugins';
