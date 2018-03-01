import path from "path";
import webpack from "webpack";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import chalk from "chalk";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import jssConfig from "../config";

/*
  The core Webpack configuration used by all output bundles.
  Imported by client and server bundles for reuse.
*/

export default function (envVars) {
  const defaultEnv = {
    content: "disconnected", // or connected; where the content to display comes from (local or Sitecore respectively)
    publicPath: jssConfig.buildArtifactsPath, // see Webpack docs on publicPath
    outputPath: "local", // local (/dist) or sitecore (direct deploy to configured Sitecore root) or anything else for literal path
    production: false, // when true sets node env to prod (production react) and enables uglify
    devtool: undefined, // webpack devtool setting (defaults to cheap-source-map if production is true)
    watch: false, // controls webpack watch mode (watch without dev-server)
    devserver: false // whether to use webpack-dev-server or not (note: only used by client bundle)
  };

  envVars = Object.assign(defaultEnv, envVars);

  const extraPlugins = getExtraPlugins(envVars);

  return {
    devtool: envVars.devtool
      ? envVars.devtool
      : envVars.production ? "cheap-source-map" : undefined,
    context: path.resolve(process.cwd(), "src"),
    output: {
      path: getOutputPath(envVars),
      publicPath: normalizeFrontendPath(envVars.publicPath),
      filename: "[name].bundle.js"
    },
    watch: envVars.watch,
    module: {
      rules: [
        // JS/JSX loader
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "env",
                {
                  modules: false
                }
              ],
              "react",
              "stage-0"
            ]
          }
        },
        // CSS loader
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        // Image loader
        {
          test: /\.(png|jpg|gif)$/,
          use: "url-loader?limit=50000&name=img/img-[hash:6].[ext]"
        },
        // Font loaders
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: "file-loader"
        },
        // JSON loader
        {
          test: /\.json$/,
          use: "json-loader"
        },
        // GraphQL loader
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: ["graphql-tag/loader"]
        }
      ]
    },
    resolve: {
      modules: [path.resolve(process.cwd(), "src"), "node_modules"],
      extensions: [".js", ".jsx", ".react.js"],
      alias: {
        assets: path.resolve(process.cwd(), "assets"),
        currentSitecoreContentServiceImplementation: getContentService(envVars)
      }
    },
    plugins: [
      new ProgressBarPlugin({
        format: `  build [:bar] ${chalk.green.bold(
          ":percent"
        )} (:elapsed seconds)`,
        clear: false
      }),
      // extract CSS imports into a css file; [name] is the bundle name (client, server)
      new ExtractTextPlugin({
        filename: "[name].css",
        allChunks: true
      }),
      new webpack.DefinePlugin(getGlobalVariables(envVars)),
      ...extraPlugins
    ]
  };
}

function getExtraPlugins(envVars) {
  const plugins = [];

  // minify JS in production (options based on create-react-app)
  if (envVars.production) {
    plugins.push(
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 7,
          compress: {
            warnings: false,
            comparisons: false
          },
          mangle: {
            keep_fnames: true,
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          }
        }
      })
    );
  }

  return plugins;
}

function getOutputPath(envVars) {
  let outputPath = envVars.outputPath;

  if (outputPath === "local") {
    // default local path (e.g. /dist)
    outputPath = path.resolve(process.cwd(), jssConfig.buildArtifactsPath);
  }

  if (outputPath === "sitecore") {
    // deploy directly to Sitecore
    outputPath = path.resolve(
      jssConfig.sitecore.instancePath + jssConfig.sitecoreDistPath
    );
  }

  // if neither local nor sitecore, we presume you passed an absolute path, and use that

  return outputPath;
}

function getContentService(envVars) {
  return path.resolve(
    `${process.cwd()}/lib/SitecoreContentService/SitecoreContentService.${
    envVars.content
    }`
  );
}

function getGlobalVariables(envVars) {
  // defaults
  const globalVars = {
    __SC_API_HOST__: JSON.stringify(jssConfig.sitecore.layoutServiceHost),
    __SC_API_KEY__: JSON.stringify(jssConfig.sitecore.apiKey),
    __TRANSLATION_PATH__: JSON.stringify(jssConfig.translationPath),
    __BUNDLE_OUTPUT_PATH__: JSON.stringify(
      normalizeFrontendPath(envVars.publicPath)
    ),
    __INITIAL_ROUTE__: JSON.stringify('/EmbeddedWizard/Wizard'),
  };

  const nodeEnv = envVars.production ? "production" : "development";

  globalVars["process.env"] = {
    NODE_ENV: JSON.stringify(nodeEnv)
  };

  return globalVars;
}

// normalizes a backend path into a frontend-compatible path
// with a trailing slash, and if the path starts with "./", makes it / instead
function normalizeFrontendPath(pathToNormalize) {
  if (pathToNormalize.startsWith("./")) {
    pathToNormalize = pathToNormalize.substring(1);
  }

  let normalizedPath = path.join("/", pathToNormalize, "/");
  normalizedPath = normalizedPath.replace(/\\/g, "/"); // path.join uses '\' on Windows

  return normalizedPath;
}
