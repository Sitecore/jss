const appName = process.env.SITECORE_JSS_APP_NAME;

/**
 * The server.bundle.js file from your pre-built JSS app
 */
const bundlePath = process.env.SITECORE_JSS_SERVER_BUNDLE || `./dist/${appName}/server.bundle`;

const serverBundle = require(bundlePath);

const config = {
  /**
   * The require'd server.bundle.js file from your pre-built JSS app
   */
  serverBundle,
  /**
   * Your Experience Edge endpoint
   */
  endpoint:
    process.env.SITECORE_EXPERIENCE_EDGE_ENDPOINT ||
    'http://my.experience.edge/sitecore/api/graph/edge',
  /**
   * The API key provisioned on Sitecore Experience Edge.
   * Required.
   */
  apiKey: process.env.SITECORE_API_KEY || serverBundle.apiKey || '{YOUR API KEY HERE}',
  /**
   * The JSS application name defaults to providing part of the bundle path.
   * If not passed as an environment variable or set here, any application name exported from the bundle will be used instead.
   */
  appName: appName || serverBundle.appName,
  /**
   * Port which will be used when start sample
   */
  port: process.env.PORT || 3000,
  /*
   * The default language to use in case the context language cannot be determined (this happens
   * on initial page load, if the language is not specified in the URL)
   */
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
};

module.exports = config;
