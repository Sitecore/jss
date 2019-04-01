import compression from 'compression';
import express, { Express, RequestHandler } from 'express';
import { PathParams } from 'express-serve-static-core';
import importFresh from 'import-fresh';
import path from 'path';
import {
  AppInvocationInfoResolver,
  SSRMiddleware,
  ssrMiddleware as defaultSSRMiddleware,
} from './ssrMiddleware';

export interface RenderingHostServerOptions {
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
  hooks?: {
    beforeSSRMiddlewareRegistered?: (server: Express) => void;
    beforeStaticFileMiddlewareRegistered?: (server: Express) => void;
    beforeServerStarted?: (server: Express) => void;
    afterServerStarted?: (server: Express) => void;
  };
  ssrMiddleware?: SSRMiddleware;
  /**
   * Defines the path for which the SSR Middleware is invoked. Defaults to `'*'` if no value is provided.
   * More information can be found in the Express docs: https://expressjs.com/en/4x/api.html#path-examples
   * @default '*'
   */
  ssrMiddlewarePath?: PathParams;
  appInvocationInfoResolver?: AppInvocationInfoResolver;
  middlewares: {
    compression?: RequestHandler;
  };
  enableCompression?: boolean;
}

export function startRenderingHostServer({
  port,
  hostname,
  hooks = {},
  middlewares = {},
  enableCompression = true,
  ssrMiddleware,
  ssrMiddlewarePath,
  appInvocationInfoResolver: customAppInvocationInfoResolver,
}: RenderingHostServerOptions) {
  const server: Express = express();

  if (enableCompression) {
    const compressionMiddleware =
      middlewares.compression && typeof middlewares.compression === 'function'
        ? middlewares.compression
        : compression();
    server.use(compressionMiddleware);
  }

  const appInvocationInfoResolver =
    customAppInvocationInfoResolver || getDefaultAppInvocationInfoResolver();

  const middleware = ssrMiddleware
    ? ssrMiddleware({
        appInvocationInfoResolver,
      })
    : defaultSSRMiddleware({
        appInvocationInfoResolver,
      });

  // Give devs a chance to add custom middleware before the SSR middleware is registered.
  invokeHook(hooks.beforeSSRMiddlewareRegistered, server);

  // Otherwise, by default we assume all POST requests should be handled by the SSR middleware.
  server.post(ssrMiddlewarePath || '*', middleware);

  invokeHook(hooks.beforeStaticFileMiddlewareRegistered, server);
  // TODO: register static asset middleware

  // Give devs a chance to add more middleware or whatever prior to starting the server.
  invokeHook(hooks.beforeServerStarted, server);
  // Start the webpack dev server
  server.listen(port || 0, hostname || 'localhost', (err?: Error) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Starting rendering host at ${hostname}:${port}`);
    invokeHook(hooks.afterServerStarted, server);
  });
}

function invokeHook(hook: Function | undefined, ...args: any[]) {
  if (hook && typeof hook === 'function') {
    hook(...args);
  }
}

function getDefaultAppInvocationInfoResolver(baseAppPath: string = './dist') {
  const resolver: AppInvocationInfoResolver = (bodyJson: any) => {
    // default resolution assumes folder structure of:
    // ./dist/{JSSAppName}/{ServerBundleName}.js
    const modulePath = path.resolve(baseAppPath, bodyJson.id, bodyJson.moduleName);
    const resolvedModule = importFresh(modulePath);
    const resolvedRenderFunctionName = bodyJson.functionName || 'renderView';
    const renderFunction = resolvedModule[resolvedRenderFunctionName];

    if (!renderFunction) {
      throw new Error(`The module "${modulePath}" has no export named "${resolvedRenderFunctionName}".
        Ensure that your server bundle is transpiled to CommonJS (or equivalent) format that can be
        resolved by Node.js 'require' statement. And ensure that your server entry point exports a function
        named "${resolvedRenderFunctionName}".`);
    }

    const renderFunctionArgs = bodyJson.args;

    return {
      renderFunction,
      renderFunctionArgs,
    };
  };

  return resolver;
}
