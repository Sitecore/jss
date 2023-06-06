/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

/**
 * PLUGINS GENERATION
 */
require('./generate-plugins');

/**
 * CONFIG GENERATION
 */
require('./generate-config');

/**
 * COMPONENT BUILDER GENERATION
 */
require('./generate-component-builder');
