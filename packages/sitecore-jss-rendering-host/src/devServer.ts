import { sync as delSync } from 'del';
import { Application } from 'express';
import { PathParams } from 'express-serve-static-core';
// @ts-ignore 
import openBrowser from 'opn'; 
import path from 'path';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackDevServer from 'webpack-dev-server';
import {
  ssrMiddleware as defaultSSRMiddleware,
  AppInvocationInfoResolver,
  SSRMiddleware,
} from './ssrMiddleware';
import { getDefaultAppInvocationInfoResolver } from './defaultAppInvocationInfoResolver';

export interface ConfigFactoryResult {
  ssrWebpackConfig: webpack.Configuration;
  clientWebpackConfig: webpack.Configuration;
  devServerConfig: WebpackDevServer.Configuration;
}

export type ConfigFactory = (nodeEnv?: string, tunnelUrl?: string) => ConfigFactoryResult;

export interface DevServerOptions {
  configFactory: ConfigFactory;
  /**
   * Path to the build artifacts from your SSR Webpack configuration. By default,
   * we'll use the 'ssrWebpackConfig.output.path' value. But you can specify a different
   * value with the 'buildArtifactsPath' property. Note: this does _not_ replace the
   * value specified in your Webpack configuration, instead this value is used for resolving
   * the path to your app's server bundle.
   */
  buildArtifactsPath?: string;
  serverBundleFileName?: string;
  /**
   * The port number the server should listen on. Defaults to `0` if no value is provided;
   * @default 0
   */
  port?: number;
  /**
   * The hostname the server should bind to. Defaults to `localhost` if no value is provided.
   * @default localhost
   */
  hostname?: string;
  tunnelUrl?: string;
  urlToOpenOnStart?: string;
  hooks?: {
    beforeWebpackCompilerCreation?: (
      clientWebpackConfig: webpack.Configuration,
      ssrWebpackConfig: webpack.Configuration
    ) => void;
    beforeSSRMiddlewareRegistered?: (app: Application, server: WebpackDevServer) => void;
    beforeDevServerCreated?: (
      compiler: webpack.MultiCompiler,
      devServerOptions: WebpackDevServer.Configuration & WebpackDevMiddleware.Options
    ) => void;
    beforeDevServerStarted?: (devServer: WebpackDevServer) => void;
    afterDevServerStarted?: (devServer: WebpackDevServer) => void;
  };
  ssrMiddleware?: SSRMiddleware;
  /**
   * Defines the path for which the SSR Middleware is invoked. Defaults to `'*'` if no value is provided.
   * More information can be found in the Express docs: https://expressjs.com/en/4x/api.html#path-examples
   * @default '*'
   */
  ssrMiddlewarePath?: PathParams;
  appInvocationInfoResolver?: AppInvocationInfoResolver;
  clean?: boolean;
}

export function startDevServer({
  port = 0,
  tunnelUrl,
  configFactory,
  buildArtifactsPath: customBuildArtifactsPath,
  serverBundleFileName: customServerBundleFileName,
  urlToOpenOnStart,
  hooks = {},
  ssrMiddleware,
  ssrMiddlewarePath,
  appInvocationInfoResolver: customAppInvocationInfoResolver,
  clean = true,
}: DevServerOptions) {
  // WEBPACK DEV SERVER config
  const configs = configFactory(process.env.NODE_ENV, tunnelUrl);

  // Override existing webpack config settings to a separate "known" location for http rendering.
  // Helps to avoid any conflicts with other build process artifacts.
  if (!configs.ssrWebpackConfig.output) {
    throw new Error(`The SSR webpack config doesn't have an 'output' property defined.
      Ensure that your config factory is returning a valid webpack configuration
      for the 'ssrWebpackConfig' property.`);
  }
  // configs.ssrWebpackConfig.output.path = buildArtifactsPath;
  // configs.ssrWebpackConfig.output.filename = serverBundleFileName;

  if (!configs.clientWebpackConfig.output) {
    throw new Error(`The client webpack config doesn't have an 'output' property defined.
      Ensure that your config factory is returning a valid webpack configuration
      for the 'clientWebpackConfig' property.`);
  }

  const buildArtifactsPath =
    customBuildArtifactsPath ||
    configs.ssrWebpackConfig.output.path ||
    configs.clientWebpackConfig.output.path;

  if (!buildArtifactsPath) {
    throw new Error(`No path was specified for your webpack build artifacts. The SSR Middleware needs to know where your
      webpack build artifacts are located in order to fulfill it's glorious destiny. You can specify a path via the options provided to
      the 'startDevServer' function, otherwise we'll attempt to use the value specified in your SSR webpack config or client webpack config,
      respectively.`);
  }

  const serverBundleFileName =
    customServerBundleFileName || configs.ssrWebpackConfig.output.filename || 'server.bundle.js';
  // configs.clientWebpackConfig.output.path = buildArtifactsPath;

  // If a `tunnelUrl` is provided, be sure to set the `publicPath` property of the client
  // webpack config so that references to static assets will be prefixed with the `tunnelUrl` value.
  if (tunnelUrl) {
    console.log(`Setting client webpack configuration publicPath to tunnelUrl: ${tunnelUrl}`);
    configs.clientWebpackConfig.output.publicPath = tunnelUrl;
  }

  // Give devs a chance to modify the webpack configurations before creating the compiler instance.
  invokeHook(
    hooks.beforeWebpackCompilerCreation,
    configs.clientWebpackConfig,
    configs.ssrWebpackConfig
  );

  const compiler = webpack([configs.clientWebpackConfig, configs.ssrWebpackConfig]);

  // `open` and `openPage` don't seem to work when starting webpack dev server via Node API.
  // Seems like this is a known issue with a potential PR: https://github.com/webpack/webpack-dev-server/issues/1510
  // But for now, need to work around it by using the `opn` module. Note: CRA does something similar.
  // This should happen _after_ WDS has completed compiling, otherwise the render engine request will
  // timeout while the WDS server is busy compiling.
  // Therefore, attach a custom plugin to the `done` hook of the last compiler that is defined. Webpack
  // executes compilers serially, and we only want the plugin to run after everything is done.
  if (urlToOpenOnStart) {
    let browserOpened = false;
    compiler.compilers[compiler.compilers.length - 1].hooks.done.tap(
      'OpenBrowserAfterCompilationPlugin',
      (stats) => {
        if (!browserOpened) {
          console.log('opening browser', stats.compilation.compiler.name);
          openBrowser(urlToOpenOnStart).then(() => {
            browserOpened = true;
          });
        }
      }
    );
  }

  // These options get passed on to the underlying webpack-dev-middleware instance used by WebpackDevServer
  // `writeToDisk` is essential so that we can `require` the server bundle for rendering, otherwise
  // the server bundle is only available in the WDS in-memory file system.
  // At some point, we could potentially look into using `https://github.com/floatdrop/require-from-string`
  // to `require` the server bundle from the WDS in-memory file system.
  // Also, webpack-dev-middleware does expose a `fs` property that allows you to inject your own file-system-like module,
  // but WebpackDevServer does not propagate that property to the underlying middleware.
  // (it's a fairly new feature of webpack-dev-middleware, though, so maybe something to monitor over time).
  const webpackDevMiddlewareOptions = {
    serverSideRender: true,
    writeToDisk: true,
    logLevel: 'debug',
  };

  // Options for the webpack-dev-server instance
  // We're "hacking" a bit here by attaching webpack-dev-middleware options to the WebpackDevServer options.
  // This isn't "documented" behavior/feature, but WebpackDevServer will pass this options object to
  // the underlying webpack-dev-middleware. Naturally, TypeScript doesn't like that, so declare the options
  // object as `any` to make TS happy.
  const serverOptions: WebpackDevServer.Configuration & WebpackDevMiddleware.Options = {
    publicPath: '/',
    ...configs.devServerConfig,
    inline: true,
    contentBase: configs.ssrWebpackConfig.output.path, // buildArtifactsPath,
    hot: true,
    quiet: false,
    stats: 'none',
    clientLogLevel: 'info',
    // watchContentBase: true,
    ...webpackDevMiddlewareOptions,
  };

  if (tunnelUrl) {
    serverOptions.public = tunnelUrl;
  }

  const modulePath = path.join(buildArtifactsPath, serverBundleFileName);
  console.log('Resolved server bundle path', modulePath);
  const appInvocationInfoResolver =
    customAppInvocationInfoResolver || getDefaultAppInvocationInfoResolver({ appPathResolver: () => modulePath });

  // Devs may have assigned a value to `serverOptions.after` via `configs.devServerConfig`, so
  // preserve the existing value so we can invoke it later.
  const originalAfter = serverOptions.after;
  serverOptions.after = (app: Application, server: WebpackDevServer) => {
    const middleware = ssrMiddleware
      ? ssrMiddleware({
          appInvocationInfoResolver,
        })
      : defaultSSRMiddleware({
          appInvocationInfoResolver,
        });

    // Give devs a chance to add custom middleware before the SSR middleware is registered,
    // but after all WDS middleware.
    invokeHook(hooks.beforeSSRMiddlewareRegistered, app, server);

    // WDS _should_ handle requests for static assets and socket connections.
    // Otherwise, by default we assume all POST requests should be handled by the SSR middleware.
    app.post(ssrMiddlewarePath || '*', middleware);

    if (originalAfter) {
      originalAfter(app, server);
    }
  };

  // Remove any existing artifacts (if `clean` is enabled)
  if (clean) {
    const cleanPaths = [`${path.join(buildArtifactsPath, '**')}`, `!${buildArtifactsPath}`];
    console.log('cleaning paths', cleanPaths);
    const cleanedPaths = delSync(cleanPaths);
    console.log('cleaned paths', cleanedPaths);
  }

  // Give devs a chance to modify serverOptions and/or the compiler before creating the WDS instance.
  invokeHook(hooks.beforeDevServerCreated, compiler, serverOptions);

  // WDS types don't expose the `use` method from the underlying Express interface.
  // So declare as `any` to make the compiler happy.
  const server: WebpackDevServer = new WebpackDevServer(compiler, serverOptions);

  // Give devs a chance to add more middleware or whatever prior to starting the server.
  invokeHook(hooks.beforeDevServerStarted, server);

  // Start the webpack dev server
  server.listen(port, 'localhost', (err?: Error) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Starting webpack dev server at localhost:${port}`);
    invokeHook(hooks.afterDevServerStarted, server);
  });
}

function invokeHook(hook: Function | undefined, ...args: any[]) {
  if (hook && typeof hook === 'function') {
    hook(...args);
  }
}

// export function getDefaultAppInvocationInfoResolver(appBundlePath: string) {
//   const resolver: AppInvocationInfoResolver = (bodyJson: any) => {
//     const resolvedModule = importFresh(appBundlePath);
//     const resolvedRenderFunctionName = bodyJson.functionName || 'renderView';
//     const renderFunction = resolvedModule[resolvedRenderFunctionName];

//     if (!renderFunction) {
//       throw new Error(`The module "${appBundlePath}" has no export named "${resolvedRenderFunctionName}".
//         Ensure that your server bundle is transpiled to CommonJS (or equivalent) format that can be
//         resolved by Node.js 'require' statement. And ensure that your server entry point exports a function
//         named "${resolvedRenderFunctionName}".`);
//     }

//     const renderFunctionArgs = bodyJson.args;

//     return {
//       renderFunction,
//       renderFunctionArgs,
//     };
//   };

//   return resolver;
// }
