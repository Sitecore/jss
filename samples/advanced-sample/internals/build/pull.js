const path = require('path');
const { parsePullRouteOptions, pull } = require('@sitecore-jss/sitecore-jss-dev-tools');

const options = parsePullRouteOptions();
if (!options) {
  return;
}

// in order to streamline the `npm run pull` script, setting outputPath programmatically
// based on AdvancedApp's route data setup
if (!options.all && options.route && options.outputPath) {
  options.outputPath = path.join(options.outputPath, options.route, `${options.language}.json`);
}

pull(options).catch((err) => console.error(err));
