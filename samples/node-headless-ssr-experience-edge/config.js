let appName = process.env.SITECORE_JSS_APP_NAME;

const endpoint =
  process.env.SITECORE_EXPERIENCE_EDGE_ENDPOINT ||
  'http://my.experience.edge/sitecore/api/graph/edge?sc_apikey=${sitecoreApiKey}';

const port = process.env.PORT || 3000;

/**
 * The server.bundle.js file from your pre-built JSS app
 */
const bundlePath = process.env.SITECORE_JSS_SERVER_BUNDLE || `./dist/${appName}/server.bundle`;

const serverBundle = require(bundlePath);

appName = appName || serverBundle.appName;

const config = {
  /**
   * The require'd server.bundle.js file from your pre-built JSS app
   */
  serverBundle,
  /**
   * Your Experience Edge endpoint
   */
  endpoint,
  /**
   * The JSS application name defaults to providing part of the bundle path.
   * If not passed as an environment variable or set here, any application name exported from the bundle will be used instead.
   */
  appName,
  /**
   * Port which will be used when start sample
   */
  port,
  /**
   * A list of absolute paths that are NOT app routes and should not attempt to render a route
   * using SSR. Local static assets, Sitecore API paths, Sitecore asset paths, etc should be listed here.
   */
  pathRewriteExcludeRoutes: [
    '/favicon.ico',
    '/dist',
    '/assets',
    '/sitecore/api',
    '/api',
    '/-/jssmedia',
    '/-/media',
    '/layouts/system',
  ].concat((process.env.SITECORE_PATH_REWRITE_EXCLUDE_ROUTES || '').split('|')),
};

module.exports = config;
