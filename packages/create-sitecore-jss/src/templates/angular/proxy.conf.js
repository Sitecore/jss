/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  This is accomplished by spinning up a small Express server that mocks the APIs, and then
  telling angular-cli to proxy requests to the API paths to this express instance.

  See /scripts/disconnected-mode-proxy.ts for the proxy API server configuration.
*/
const { constants } = require('@sitecore-jss/sitecore-jss-angular');

const port = 3043;

const PROXY_CONFIG = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED ? [
  {
    context: ['/data', '/sitecore'],
    target: `http://localhost:${port}`,
    secure: false,
  },
] : undefined;

module.exports = PROXY_CONFIG;
