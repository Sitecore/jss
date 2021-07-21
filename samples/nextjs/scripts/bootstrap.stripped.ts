import { generateConfig } from './generate-config';

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
generateConfig();

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';
