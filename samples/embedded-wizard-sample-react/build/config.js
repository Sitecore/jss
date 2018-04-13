/*
  Config Factory
  Extensible config factory that allows dynamic remapping of the config
  e.g. for swapping config out by environments, or to enable computed configurations
  that can be overridden
*/

// require config sources

// scjssconfig.json may not exist if you've never run setup
// so if it doesn't we substitute a fake object
let config;
try {
  // eslint-disable-next-line
  config = require('../scjssconfig.json');
} catch (e) {
  config = {
    sitecore: {
      layoutServiceHost: '',
    },
  };
}

const packageConfig = require('../package.json').config;

// add calculated configuration settings
const calculatedConfig = {
  translationPath: `/sitecore/api/jss/dictionary/${packageConfig.appName}/{{lng}}`,
  devServerPort: 3001,
};

// optional:
// do any other dynamic config source (e.g. environment-specific config files)

// Object.assign merges the objects in order, so the
// package.json config can override the calculated config,
// and the scjssconfig.json can override anything
module.exports = Object.assign({}, calculatedConfig, packageConfig, config);
