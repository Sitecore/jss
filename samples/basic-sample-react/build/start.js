import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import fsExtra from "fs-extra";
import replaceExt from "replace-ext";
import yaml from "js-yaml";
import open from "opn";
import jssConfig from "./config";
import { writeIndexFile } from "./create-static-index";
import webpackConfig from "./webpack/webpack.client";

/*
  Start script
  Used to start the local dev server when running 'jss start' or 'jss start:connected'.
  Can be used to inject middleware, etc if needed
*/

const options = {
  host: "localhost",
  port: jssConfig.devServerPort,
  scheme: "http",
  uri() {
    return `${this.scheme}://${this.host}:${this.port}`;
  }
};

// parse webpack parameters from the command line
// see https://webpack.js.org/configuration/configuration-types/#exporting-a-function
const webpackEnv = {
  devserver: true
};

process.argv.forEach(arg => {
  if (arg.startsWith("--env.")) {
    if (arg.indexOf("=") === -1) {
      webpackEnv[arg.substring(6)] = true;
    } else {
      webpackEnv[arg.substring(6, arg.indexOf("="))] = arg.substring(
        arg.indexOf("=") + 1
      );
    }
  }
});

const config = webpackConfig(webpackEnv);

const compiler = webpack(config);

// deploy a physical index.html file - without this file, webpack shows a directory listing for the root item
writeIndexFile(config.output.path, config.output.publicPath);

const server = new WebpackDevServer(compiler, {
  inline: true,
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

// this middleware serves data and assets from the src root, and
// routes all other requests to index.html so you can directly browse to routes within your app
server.use("/data", serveStaticFile);
server.use("/assets", serveStaticFile);
server.use("/", defaultDocument);

server.listen(options.port, options.host, err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Starting webpack dev server at ${options.uri()}`);
  open(options.uri()).catch(err1 => console.error(err1));
});

function defaultDocument(req, res, next) {
  console.log(
    `> Request '${req.path}' - replied with index.html (no static file match)`
  );
  res.sendFile(
    path.join(process.cwd(), `${config.output.publicPath}index.html`)
  );
}

function serveStaticFile(request, response, next) {
  let localUrl = request.originalUrl;
  // strip query
  if (localUrl.indexOf("?") > -1) {
    localUrl = localUrl.substring(0, localUrl.indexOf("?"));
  }

  let localPath = path.join(process.cwd(), localUrl);

  console.log(`> Request '${request.originalUrl} - replied with ${localPath}`);

  if (!fsExtra.existsSync(localPath)) {
    const jsonOrYaml = getJsonOrYaml(localPath);
    if (typeof jsonOrYaml !== "undefined") {
      response.send(JSON.stringify(jsonOrYaml));
      return;
    }
  }

  response.sendFile(localPath);
}

function getJsonOrYaml(localPath) {
  if (path.extname(localPath) !== ".json") return;

  if (fsExtra.existsSync(localPath)) return fsExtra.readJsonSync(localPath);

  localPath = replaceExt(localPath, ".yaml");

  if (!fsExtra.existsSync(localPath)) {
    localPath = replaceExt(localPath, ".yml");
  }

  if (fsExtra.existsSync(localPath)) {
    const yamlData = fsExtra.readFileSync(localPath, "utf8");
    return yaml.safeLoad(yamlData);
  }
}
