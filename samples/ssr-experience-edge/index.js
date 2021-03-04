const express = require('express');
const compression = require('compression');
const config = require('./config');


const server = express();
const port = process.env.PORT || 3000;


const renderView = config.serverBundle.renderView;

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
  const view = renderView(
    (err, result) => {
      console.log('ERROR:', err);
      console.log('RESULT:', result);
      res.status(200).send(result.html);
    },
    '/',
    { sitecore: { context: { language: 'en' }, route: {} } },
    { dictionary: {
      test: '1000'
    } }
  );
  console.log(view);
});

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
