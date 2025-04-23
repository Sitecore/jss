/*
  When the app runs in connected mode, some of the requests should be
  proxied to the Sitecore API
*/
const environment = require('./src/environments/environment.js').environment;

const PROXY_CONFIG = [
  {
    context: [
      // API endpoints
      '/sitecore',
      // media items
      '/-',
      // visitor identification
      '/layouts',
    ],
    target: environment.sitecoreApiHost,
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
