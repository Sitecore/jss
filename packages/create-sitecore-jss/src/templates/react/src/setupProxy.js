const proxy = require('http-proxy-middleware');
const config = require('./temp/config');
const { isDisconnected } = require('./util');

module.exports = (app) => {
  if (isDisconnected()) {
    // when disconnected we proxy to the local faux layout service host,
    // see scripts/disconnected-mode-proxy.js
    const proxyUrl = `http://localhost:${process.env.PROXY_PORT || 3042}/`;

    app.use(proxy('/sitecore', { target: proxyUrl }));
    app.use(proxy('/data/media', { target: proxyUrl }));
  } else {
    // when in connected mode we want to proxy Sitecore paths
    // off to Sitecore

    app.use(proxy('/sitecore', { target: config.sitecoreApiHost, changeOrigin: true }));
    // media items
    app.use(proxy('/-', { target: config.sitecoreApiHost, changeOrigin: true }));
    // visitor identification
    app.use(proxy('/layouts', { target: config.sitecoreApiHost, changeOrigin: true }));
  }
};
