// Mock sitecore asset requests in disconnected dev mode
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
const path = require('path');
const fsExtra = require('fs-extra');

const app = express();
app.use(cookieParser());

// mock the Sitecore login service
app.post('/sitecore/api/ssc/auth/login', jsonParser, (req, res) => {
  if (!req.body || !req.body.password || req.body.password !== 'b') {
    res.clearCookie('loggedIn');
    return res.status(401).end();
  }
  var date = new Date();
  res.cookie('loggedIn', req.body.username, {
    expires: new Date(date.getTime() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  return res.status(200).end();
});
app.post('/sitecore/api/ssc/auth/logout', (req, res) => {
  res.clearCookie('loggedIn');
  return res.status(200).end();
});

// mock a logged in state in the context data
app.get('/data/context/:language', (req, res, next) => {
  if (!req.cookies.loggedIn) {
    return next();
  }
  const context = fsExtra.readJsonSync(path.join(process.cwd(), req.path));
  context.user = {
    'user': 'extranet',
    'name': req.cookies.loggedIn
  };
  res.send(context);
});

// serve mock data and media
app.use('/data', express.static('data'));

app.listen(3042, function () { console.log('Sitecore data mock listening on port 3042!') });

const PROXY_CONFIG = [
  {
    context: [
      '/data',
    ],
    target: 'http://localhost:3042',
    secure: false
  },
  {
    context: [
      '/sitecore/api/ssc/auth/login'
    ],
    target: 'http://localhost:3042',
    secure: false,
  },
  {
    context: [
      '/sitecore/api/ssc/auth/logout'
    ],
    target: 'http://localhost:3042',
    secure: false,
  }
]

module.exports = PROXY_CONFIG;
