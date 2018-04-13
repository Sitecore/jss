const path = require('path');
const express = require('express');
const fs = require('fs');
const scProxy = require('@sitecore-jss/sitecore-jss-proxy').default;
const ipaddr = require('ipaddr.js');
const app = require('./dist/AdvancedApp/server.bundle');
const config = require('./config');
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
 * Add the original client IP as a header for Sitecore Analytics and GeoIP.
 * We could use the xfwd option of http-proxy, but express will use ipv6 formatted
 * IPs by default and there are reported issues using ipv6 with GeoIP.
 */
config.proxyOptions.onProxyReq = (proxyReq, req, res) => {
  let ipv4 = ipaddr.process(req.ip).toString(); //strip ipv6 prefix added by node/express
  if (ipv4 === '::1') {
    ipv4 = '127.0.0.1';
  }
  proxyReq.setHeader('X-Forwarded-For', ipv4);
};

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
