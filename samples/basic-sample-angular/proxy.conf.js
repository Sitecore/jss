// Mock sitecore asset requests in disconnected dev mode
const express = require('express');
const app = express();
app.use('/sitecore', express.static('sitecore'));
app.listen(3000, function () { console.log('Sitecore assets mock listening on port 3000!') });

const PROXY_CONFIG = {
  "/sitecore": {
    "target": "http://localhost:3000",
    "secure": false
  }
}

module.exports = PROXY_CONFIG;
