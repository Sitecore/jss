const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fsExtra = require('fs-extra');
const open = require('opn');
const bodyParser = require('webpack-body-parser');
const cookieParser = require('cookie-parser');
const jssConfig = require('./config');
const templates = require('./templates');

/*
  Start script
  Used to start the local dev server when running npm run start
  Can be used to inject middleware, etc if needed
*/

const config = require('./webpack/webpack.dev');

templates(config[0].output.path, '/dist/dev/');

const options = {
  host: 'localhost',
  port: jssConfig.devServerPort,
  scheme: 'http',
  uri() { return `${this.scheme}://${this.host}:${this.port}`; },
};

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  inline: true,
  contentBase: config[0].output.path,
  publicPath: config[0].output.publicPath,
  stats: {
    colors: true,
  },
  setup: (app) => {
    // mimic the Sitecore SSC auth service
    app.use(cookieParser());
    const jsonParser = bodyParser.json();
    app.post('/sitecore/api/ssc/auth/login', jsonParser, (req, res) => {
      if (!req.body || !req.body.password || req.body.password !== 'b') {
        res.clearCookie("loggedIn");
        return res.sendStatus(401);
      }
      var date = new Date();
      res.cookie("loggedIn", "true", {
        expires: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        domain: options.host
      });
      return res.sendStatus(200);
    });
    app.post('/sitecore/api/ssc/auth/logout', (req, res) => {
      res.clearCookie("loggedIn");
      return res.sendStatus(200);
    });
  }
});

// this middleware serves data and assets from the src root, and
// routes all other requests to index.html so you can directly browse to routes within your app
server.use('/', (req, res, next) => {
  if (req.url.indexOf('/data/context/') == 0 && req.cookies.loggedIn) {
    //mock a logged in user if we have the cookie
    const context = fsExtra.readJsonSync(path.join(process.cwd(), req.path));
    context.user = {
      'user': 'extranet',
      'name': 'lorem'
    };
    res.send(context);
  } else if (req.url.indexOf('/data/') === 0 || req.url.indexOf('/assets/') === 0) {
    res.sendFile(path.join(process.cwd(), req.path));
  } else {
    res.sendFile(path.join(process.cwd(), `${config[0].output.publicPath}index.html`));
  }
});

server.listen(options.port, options.host, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Starting webpack dev server at ${options.uri()}`);
  open(options.uri()).catch(err1 => console.error(err1));
});
