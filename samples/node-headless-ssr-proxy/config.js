/**
 * @type {ProxyConfig}
 */
const config = {
  /**
   * apiHost: your Sitecore instance hostname that is the backend for JSS
   * Should be https for production. Must be https to use SSC auth service,
   * if supporting Sitecore authentication.
   */
  apiHost: 'http://jssreactweb',
  /**
   * layoutServiceRoot: The path to layout service for the JSS application.
   * Some apps, like advanced samples, use a custom LS configuration,
   * e.g. /sitecore/api/layout/render/jss-advanced-react
   */
  layoutServiceRoute: '/sitecore/api/layout/render/jss',
  /**
   * apiKey: The Sitecore SSC API key your app uses.
   * Required.
   */
  apiKey: '{YOUR API KEY HERE}',
  /**
   * pathRewriteExcludeRoutes: A list of absolute paths
   * that are NOT app routes and should not attempt to render a route
   * using SSR. These route prefixes are directly proxied to the apiHost,
   * allowing the proxy to also proxy GraphQL requests, REST requests, etc.
   * Local static assets, Sitecore API paths, Sitecore asset paths, etc should be listed here.
   */
  pathRewriteExcludeRoutes: ['/dist', '/assets', '/sitecore/api', '/api', '/-/jssmedia'],
  /**
   * Writes verbose request info to stdout for debugging.
   * Must be disabled in production for reasonable performance.
   */
  debug: false,
  /**
   * Maximum allowed proxy reply size in bytes. Replies larger than this are not sent.
   * Avoids starving the proxy of memory if large requests are proxied.
   * Default: 10MB
   */
  maxResponseSizeBytes: 10 * 1024 * 1024,
  /**
   * Options object for http-proxy-middleware. Consult its docs.
   */
  proxyOptions: {
    secure: false, // for demo ONLY, allows self-signed SSL certs
  },
};

module.exports = config;
