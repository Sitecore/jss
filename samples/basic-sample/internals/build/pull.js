const { parsePullRouteOptions, pull } = require('@sitecore-jss/sitecore-jss-dev-tools');

const options = parsePullRouteOptions();
if (!options) {
  return;
}

if (!options.all && options.route && options.outputPath) {
  options.outputPath = path.join(options.outputPath, options.route, `${options.language}.json`);
}

pull(options).catch((error) => console.error(error));
