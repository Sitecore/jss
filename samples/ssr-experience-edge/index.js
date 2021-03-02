const express = require('express');
const compression = require('compression');

const server = express();
const port = process.env.PORT || 3000;

/**
 * The JSS application name defaults to providing part of the bundle path as well as the dictionary service endpoint.
 * If not passed as an environment variable or set here, any application name exported from the bundle will be used instead.
 */
let appName = 'JssReactWeb' || process.env.SITECORE_JSS_APP_NAME;

const bundlePath = process.env.SITECORE_JSS_SERVER_BUNDLE || `./dist/${appName}/server.bundle`;

const renderView = require(bundlePath).renderView;

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

server.use((req, res) => {
  const view = renderView((err, result) => {
    console.log('ERROR:', err);
    console.log('RESULT:', result);
    res.status(200).send();
  });
  console.log(view);
});

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
