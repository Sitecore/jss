const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

module.exports = {
  attachToApp: function attachToApp(app) {
    app.use(cookieParser());

    // mock the Sitecore login service
    app.post('/sitecore/api/ssc/auth/login', jsonParser, (req, res) => {
      if (!req.body || !req.body.password || req.body.password !== 'b') {
        res.clearCookie('loggedIn');
        return res.status(401).end();
      }
      const date = new Date();
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
  },
  // extends the disconnected layout service context to mock a fake logged in user
  mockContext: function sscAuthMockContext(request) {
    let user;

    if (request.cookies.loggedIn) {
      // mock a logged in user if we have the cookie
      user = {
        user: 'extranet',
        name: request.cookies.loggedIn,
      };
    }

    return user;
  },
};
