const express = require('express');
const compression = require('compression');

/**
 * Usage of .env file can be enabled here by
 * uncommenting the next require and
 * creating a .env file based on .env.example
 */
//require('dotenv').config();

const scProxy = require('@sitecore-jss/sitecore-jss-proxy').default;
const config = require('./config');
const cacheMiddleware = require('./cacheMiddleware');

const server = express();
const port = process.env.PORT || 3000;

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

/**
 * Output caching, can be enabled,
 * Read about restrictions here: {@link https://jss.sitecore.com/docs/techniques/performance/caching}
 */
// server.use(cacheMiddleware());

server.use((req, res, next) => {
  // because this is a proxy, all headers are forwarded on to the Sitecore server
  // but, if we SSR we only understand how to decompress gzip and deflate. Some
  // modern browsers would send 'br' (brotli) as well, and if the Sitecore server
  // supported that (maybe via CDN) it would fail SSR as we can't decode the Brotli
  // response. So, we force the accept-encoding header to only include what we can understand.
  if (req.headers['accept-encoding']) {
    req.headers['accept-encoding'] = 'gzip, deflate';
  }

  next();
});

// For any other requests, we render app routes server-side and return them
server.use('*', scProxy(config.serverBundle.renderView, config, config.serverBundle.parseRouteUrl));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
