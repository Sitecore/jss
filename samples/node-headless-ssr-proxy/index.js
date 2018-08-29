const express = require('express');
const compression = require('compression');
const fs = require('fs');
const escapeStringRegexp = require('escape-string-regexp');
const scProxy = require('@sitecore-jss/sitecore-jss-proxy').default;
const ipaddr = require('ipaddr.js');
const config = require('./config');
const app = require(`./dist/${config.appName}/server.bundle`);

const server = express();
const port = process.env.PORT || 3000;

/**
 *  Custom error handling in case our app fails to render.
 */
config.onError = (err) => {
  return {
    statusCode: 500,
    content: fs.readFileSync('error.html', 'utf8'),
  };
};

/**
 * Rewrite Sitecore media library paths in the response data to the proxy URL.
 * Without this transformation, Sitecore would return image tags i.e
 * <img src="https://api-host/-/jssmedia/media.jpg" />
 * If you want to hide Sitecore behind a firewall, that won't work as the browser
 * cannot hit that API host URL other than via the proxy. So we alter the HTML.
 */
const transformRegex = new RegExp(`(${escapeStringRegexp(config.apiHost)})`, 'g');
config.transformSSRContent = (response, request) => {
  return response.html.replace(transformRegex, `${request.protocol}://${request.headers.host}`);
};

/**
 * Add the original client IP as a header for Sitecore Analytics and GeoIP.
 * We could use the xfwd option of http-proxy, but express will use ipv6 formatted
 * IPs by default and there are reported issues using ipv6 with GeoIP.
 */
config.proxyOptions.onProxyReq = (proxyReq, req, res) => {
  let ipv4 = ipaddr.process(req.ip).toString(); // strip ipv6 prefix added by node/express
  if (ipv4 === '::1') {
    ipv4 = '127.0.0.1';
  }
  proxyReq.setHeader('X-Forwarded-For', ipv4);
};

// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

// Serve static app assets from local /dist folder
server.use(
  '/dist',
  express.static('dist', {
    fallthrough: false, // force 404 for unknown assets under /dist
  })
);

// For any other requests, we render app routes server-side and return them
server.use('*', scProxy(app.renderView, config, app.parseRouteUrl));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
