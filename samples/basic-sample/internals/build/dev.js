const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fsExtra = require('fs-extra');
const open = require('opn');

const config = require('./webpack/webpack.dev');

fsExtra.ensureDirSync(config[0].output.path);
fsExtra.copySync(path.resolve(process.cwd(), './internals/build/templates'), config[0].output.path);
fsExtra.copySync(path.resolve(process.cwd(), './assets/img'), `${config[0].output.path}/assets/img`);

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: config[0].output.path,
  publicPath: config[0].output.publicPath,
  stats: {
    colors: true,
  },
});

const options = {
  host: 'localhost',
  port: 3001,
  scheme: 'http',
  uri() { return `${this.scheme}://${this.host}:${this.port}`; },
};

server.listen(options.port, options.host, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Starting webpack dev server at ${options.uri()}`);
  open(options.uri()).catch(err1 => console.error(err1));
});
