const path = require('path');
const { parsePullRouteOptions, pull } = require('@sitecore-jss/sitecore-jss-dev-tools');

const options = parsePullRouteOptions();
if (!options) {
  return;
}

pull(options).catch((err) => console.error(err));
