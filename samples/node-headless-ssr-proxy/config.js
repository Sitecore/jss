const fs = require('fs');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const httpAgents = require("./httpAgents");

// We keep a cached copy of the site dictionary for performance. Default is 60 seconds.
const dictionaryCache = new NodeCache({ stdTTL: 60 });

/**
 * The JSS application name defaults to providing part of the bundle path as well as the dictionary service endpoint.
 * If not passed as an environment variable or set here, any application name exported from the bundle will be used instead.
 */
let appName = process.env.SITECORE_JSS_APP_NAME;

/**
 * The server.bundle.js file from your pre-built JSS app
 */
const bundlePath = process.env.SITECORE_JSS_SERVER_BUNDLE || `./dist/${appName}/server.bundle`;

const serverBundle = require(bundlePath);

httpAgents.setUpDefaultAgents(serverBundle);

const apiHost = process.env.SITECORE_API_HOST || 'http://my.sitecore.host'

appName = appName || serverBundle.appName;

/**
 * @type {ProxyConfig}
 */
const config = {
  /**
   * The require'd server.bundle.js file from your pre-built JSS app
   */
  serverBundle,
  /**
   * apiHost: your Sitecore instance hostname that is the backend for JSS
   * Should be https for production. Must be https to use SSC auth service,
   * if supporting Sitecore authentication.
   */
  apiHost,
  /**
   * layoutServiceRoot: The path to layout service for the JSS application.
   * Some apps, like advanced samples, use a custom LS configuration,
   * e.g. /sitecore/api/layout/render/jss-advanced-react
   */
  layoutServiceRoute:
    process.env.SITECORE_LAYOUT_SERVICE_ROUTE || '/sitecore/api/layout/render/jss',
  /**
   * apiKey: The Sitecore SSC API key your app uses.
   * Required.
   */
  apiKey: process.env.SITECORE_API_KEY || serverBundle.apiKey || '{YOUR API KEY HERE}',
  /**
   * pathRewriteExcludeRoutes: A list of absolute paths
   * that are NOT app routes and should not attempt to render a route
   * using SSR. These route prefixes are directly proxied to the apiHost,
   * allowing the proxy to also proxy GraphQL requests, REST requests, etc.
   * Local static assets, Sitecore API paths, Sitecore asset paths, etc should be listed here.
   * URLs will be encoded, so e.g. for a space use '%20' in the exclude.
   *
   * Need to perform logic instead of a flat list? Remove this and use
   * pathRewriteExcludePredicate function instead: (url) => boolean;
   */
  pathRewriteExcludeRoutes: [
    '/dist',
    '/assets',
    '/sitecore/api',
    '/api',
    '/-/jssmedia',
    '/-/media',
    '/layouts/system',
  ].concat((process.env.SITECORE_PATH_REWRITE_EXCLUDE_ROUTES || '').split('|')),
  /**
   * Writes verbose request info to stdout for debugging.
   * Must be disabled in production for reasonable performance.
   */
  debug: ((process.env.SITECORE_ENABLE_DEBUG || '').toLowerCase() === 'true') || false,
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
    // Enable connection pooling
    agent: httpAgents.getAgent(apiHost),
    // Setting this to false will disable SSL certificate validation
    // when proxying to a SSL Sitecore instance.
    // This is a major security issue, so NEVER EVER set this to false
    // outside local development. Use a real CA-issued certificate.
    secure: true,
    /**
     * Add the original client IP as a header for Sitecore Analytics and GeoIP.
     * We could use the xfwd option of http-proxy, but express will use ipv6 formatted
     * IPs by default and there are reported issues using ipv6 with GeoIP.
     */
    onProxyReq: (proxyReq, req, res) => {
      let ipv4 = ipaddr.process(req.ip).toString(); // strip ipv6 prefix added by node/express
      if (ipv4 === '::1') {
        ipv4 = '127.0.0.1';
      }
      proxyReq.setHeader('X-Forwarded-For', ipv4);

      // because this is a proxy, all headers are forwarded on to the Sitecore server
      // but, if we SSR we only understand how to decompress gzip and deflate. Some
      // modern browsers would send 'br' (brotli) as well, and if the Sitecore server
      // supported that (maybe via CDN) it would fail SSR as we can't decode the Brotli
      // response. So, we force the accept-encoding header to only include what we can understand.
      if (req.headers['accept-encoding']) {
        proxyReq.setHeader('Accept-Encoding', 'gzip, deflate');
      }
    },
	},
	/**
	 * Custom headers handling.
	 * You can remove different headers from proxy response.
	*/
	setHeaders: (req, serverRes, proxyRes) => {
		delete proxyRes.headers['content-security-policy'];
	},
  /**
   * Custom error handling in case our app fails to render.
   * Return null to pass through server response, or { content, statusCode }
   * to override server response.
   *
   * Note: 404s are not errors, and will have null route data + context sent to the JSS app,
   * so the app can render a 404 route.
   */
  onError: (err, response) => {
    // http 200 = an error in rendering; http 500 = an error on layout service
    if (response.statusCode !== 500 && response.statusCode !== 200) return null;

    return {
      statusCode: 500,
      content: fs.readFileSync('error.html', 'utf8'),
    };
  },
  createViewBag: (request, response, proxyResponse, layoutServiceData) => {
    // fetches the dictionary from the Sitecore server for the current language so it can be SSR'ed
    // has a default cache applied since dictionary data is quite static and it helps rendering performance a lot
    if (!layoutServiceData || !layoutServiceData.sitecore || !layoutServiceData.sitecore.context) {
      return {};
    }

    const language = layoutServiceData.sitecore.context.language || 'en';
    const site =
      layoutServiceData.sitecore.context.site && layoutServiceData.sitecore.context.site.name;

    if (!site) {
      return {};
    }

    const cacheKey = `${site}_${language}`;

    const cached = dictionaryCache.get(cacheKey);

    if (cached) return Promise.resolve(cached);

    return fetch(
      `${config.apiHost}/sitecore/api/jss/dictionary/${appName}/${language}?sc_apikey=${
        config.apiKey
      }`,
      {
        headers: {
          connection: "keep-alive",
        },
      }
    )
      .then((result) => result.json())
      .then((json) => {
        const viewBag = {
          dictionary: json && json.phrases,
        };

        dictionaryCache.set(cacheKey, viewBag);
        return viewBag;
      });
  },
};

module.exports = config;
