// commands available when running from an app location (with CLI installed to local node_modules)
// e.g. setup, deploy

import * as easterEgg from './easter-egg';
import * as elephant from './elephant';

import * as clean from './clean';
import * as deploy from './deploy';
import * as manifest from './manifest';
import * as pkg from './package';
import * as setup from './setup';

export { easterEgg, elephant, setup, deploy, pkg, manifest, clean };
