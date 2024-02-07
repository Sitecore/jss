/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/
import './generate-plugins';

import './generate-config';

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';
