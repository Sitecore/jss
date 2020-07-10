const proxy = require('http-proxy-middleware');
const ip = require('ip');
const config = require('./temp/config');
const { isDisconnected } = require('./util');

module.exports = (app) => {
  // when disconnected we proxy to the local faux layout service host,
  // see scripts/disconnected-mode-proxy.js
  const proxyURL = `http://localhost:${process.env.PROXY_PORT || 3042}/`;
  const ipProxyURL = `http://${ip.address()}:${process.env.PROXY_PORT || 3042}/`;

  if (isDisconnected()) {
    const proxyOptions = {
      target: proxyURL,
      router: {
        [config.ipAddress]: ipProxyURL
      }
    }

    app.use(proxy('/sitecore', proxyOptions));
    app.use(proxy('/data/media', proxyOptions));
  } else {
    // when in connected mode we want to proxy Sitecore paths
    // off to Sitecore

    app.use(proxy('/sitecore', { target: config.sitecoreApiHost }));
    // media items
    app.use(proxy('/-', { target: config.sitecoreApiHost }));
    // visitor identification
    app.use(proxy('/layouts', { target: config.sitecoreApiHost }));
  }
};
