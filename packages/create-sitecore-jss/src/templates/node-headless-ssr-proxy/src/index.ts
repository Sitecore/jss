import express from 'express';
import compression from 'compression';
import 'dotenv/config';
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import { config } from './config';
//import { cacheMiddleware } from './cacheMiddleware';

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
 * Read about restrictions here: {@link https://doc.sitecore.com/xp/en/developers/hd/22/sitecore-headless-development/caching-in-headless-server-side-rendering-mode.html}
 */
//server.use(cacheMiddleware());

server.use((req, _res, next) => {
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
