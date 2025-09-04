import 'dotenv/config';

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates TS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

/*
   PLUGINS GENERATION
*/
require('./generate-plugins');

/*
  CONFIG GENERATION
*/
require('./generate-config');

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');

/*
  METADATA GENERATION
*/
require('./generate-metadata');
