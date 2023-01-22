/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, plugins, the global config module,
  and the component name to component mapping.
*/

/*
   PLUGINS GENERATION
*/
import './generate-plugins';

import { jssBootstrapFactory } from './bootstrap/index';

jssBootstrapFactory.create();
