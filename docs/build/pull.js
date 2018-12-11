const { parsePullRouteOptions, pull } = require('@sitecore-jss/sitecore-jss-dev-tools');

/*
  Pull script
  Used by npm scripts to enable pulling route data from a Sitecore instance's
  Layout Service for a given route. This enables updating disconnected content
  from a live Sitecore instance so that content can be kept up to date for disconnected clients.
*/

const options = parsePullRouteOptions();
if (!options) {
  return;
}

pull(options).catch((err) => console.error(err));
