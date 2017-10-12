const path = require('path');
const express = require('express');
const scProxy = require('@sitecorelabs/sitecore-jss-proxy').default;
const app = require('./dist/AdvancedApp/server.bundle');
const config = require('./config');
const server = express();
const port = process.env.PORT || 3000;

server.use('*', scProxy(app.renderView, config, app.parseRouteUrl));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
