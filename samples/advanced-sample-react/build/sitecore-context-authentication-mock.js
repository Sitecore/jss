import bodyParser from 'webpack-body-parser';
import cookieParser from 'cookie-parser';

// Mocks the Sitecore authentication service, so that you can 'log in'
// when running disconnected

// Yes, the password is 'b' for the mock :)

export function sscAuthMockBefore(app) {
  // mimic the Sitecore SSC auth service
  app.use(cookieParser());
  const jsonParser = bodyParser.json();
  app.post('/sitecore/api/ssc/auth/login', jsonParser, (req, res) => {
    if (!req.body || !req.body.password || req.body.password !== 'b') {
      res.clearCookie('loggedIn');
      return res.sendStatus(401);
    }
    const date = new Date();
    res.cookie('loggedIn', 'true', {
      expires: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      domain: 'localhost',
    });
    return res.sendStatus(200);
  });
  app.post('/sitecore/api/ssc/auth/logout', (req, res) => {
    res.clearCookie('loggedIn');
    return res.sendStatus(200);
  });
}

// extends the disconnected layout service context to mock a fake logged in user
export function sscAuthMockContext(request) {
  let user;

  if (request.cookies.loggedIn) {
    // mock a logged in user if we have the cookie
    user = {
      user: 'extranet',
      name: 'lorem',
    };
  }

  return user;
}
