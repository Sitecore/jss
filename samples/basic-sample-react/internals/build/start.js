const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fsExtra = require('fs-extra');
const open = require('opn');
const jssConfig = require('./config');
const templates = require('./templates');

/*
  Start script
  Used to start the local dev server when running npm run start
  Can be used to inject middleware, etc if needed
*/

const config = require('./webpack/webpack.dev');

templates(config[0].output.path, '/dist/dev/');
fsExtra.copySync(path.resolve(process.cwd(), './assets/img'), `${config[0].output.path}/assets/img`);

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
});

server.listen(options.port, options.host, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Starting webpack dev server at ${options.uri()}`);
  open(options.uri()).catch(err1 => console.error(err1));
});
