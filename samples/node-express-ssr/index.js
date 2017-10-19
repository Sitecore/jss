const path = require('path');
const express = require('express');
const scProxy = require('@sitecore-jss/sitecore-jss-proxy').default;
const app = require('./app/AdvancedApp/server.bundle');
const config = require('./config');
const server = express();
const port = process.env.PORT || 3000;

server.use('*', scProxy(app.renderView, config, app.parseRouteUrl));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
