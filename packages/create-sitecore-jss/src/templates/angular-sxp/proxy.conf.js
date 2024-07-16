/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  When the app runs in connected mode, Sitecore is present and some of the requests should be
  proxied to the Sitecore API

  This is accomplished by spinning up a small Express server that mocks the APIs, and then
  telling angular-cli to proxy requests to the API paths to this express instance.

*/
const constants = require('@sitecore-jss/sitecore-jss-angular/cjs').constants;
const environment = require('./src/environments/environment.js').environment;

const port = 3043;

const PROXY_CONFIG =
  process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED
    ? [
        {
          context: ['/data', '/sitecore'],
          target: `http://localhost:${port}`,
          secure: false,
        },
      ]
    : [
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
