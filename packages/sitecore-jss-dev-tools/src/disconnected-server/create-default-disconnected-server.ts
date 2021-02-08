import { ManifestInstance } from '@sitecore-jss/sitecore-jss-manifest';
import Express from 'express';
import { join } from 'path';
import { ManifestManager } from '../manifest-manager';
import { createDisconnectedDictionaryService } from './dictionary-service';
import {
  CustomizeContextFunction,
  CustomizeRenderFunction,
  CustomizeRouteFunction,
} from './DisconnectedLayoutServiceOptions';
import { createDisconnectedLayoutService } from './layout-service';
import { createDisconnectedSitemapService } from './sitemap-service';

export interface DisconnectedServerOptions {
  appName: string;

  /**
   * Root physical path to the app (i.e. where your package.json is)
   */
  appRoot: string;

  /**
   * File path(s) to watch for changes, and reload the manifest when they occur.
   * Paths can be relative (to the app root) or absolute.
   */
  watchPaths: string[];

  /**
   * The language to create the server in initially.
   */
  language: string;

  /**
   * Module to require before starting the disconnected server (i.e. a transpiler, or a config script that loads one)
   */
  requireArg?: string;

  /**
   * Express-like server instance to attach to. Defaults to a new Express instance if not passed.
   * Extra middleware, etc can be attached before passing the option.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server?: any;

  /**
   * Specify the port the server should run on. If unspecified, the server will not start listening.
   */
  port?: number;

  /**
   * The source file specifications for the manifest generation.
   */
  sourceFiles?: string[];

  /**
   * Hook function that is called after the disconnected server middleware is registered with the server,
   * but before the server starts listening. Useful to add your own middleware after the disconnected middleware.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterMiddlewareRegistered?: (server: any) => void;

  /**
   * Hook function invoked when the server starts listening on a port
   */
  onListening?: () => void;

  /**
   * Hook function invoked when an error occurs in the server.
   */
  onError?: (error: Error) => void;

  /**
   * Hook function invoked when the manifest updates, either due to file changes or language changes.
   * Useful to respond when the data is updated in custom middleware, etc.
   */
  onManifestUpdated?: (manifest: ManifestInstance) => void;

  /**
   * Hook function to allow customizing the disconnected Sitecore Context mock.
   * Useful for faking a customized server-side context in disconnected mode.
   */
  customizeContext?: CustomizeContextFunction;

  /**
   * Hook function to allow customizing route data.
   * The 'route' param is the default route data result.
   */
  customizeRoute?: CustomizeRouteFunction;

  /**
   * Hook function to allow customizing rendering (component) data.
   * The first parameter is the default rendering data; return an object to
   * use as the final rendering data. Return falsy to use the default object.
   */
  customizeRendering?: CustomizeRenderFunction;
}

/**
 * @param {DisconnectedServerOptions} options
 */
export function createDefaultDisconnectedServer(options: DisconnectedServerOptions) {
  let app = options.server;

  if (!app) {
    app = Express();
  }

  // backwards compatibility with fix for #80
  // for GA the appRoot was expected to be $app/scripts
  // which didn't make sense. This allows both sane app roots
  // and GA-style app roots to keep working.
  if (options.appRoot.endsWith('scripts')) {
    options.appRoot = join(options.appRoot, '..');
  }

  // further backwards compatibility for #80
  // allows apps with GA watch path of '../data' (relative to /scripts)
  // to keep working even with appRoot now relative to the actual app root
  // We do this by stripping '../' from path leads, making the path './data' instead - theoretically, the chance of
  // wanting to actually escape from the app root entirely otherwise is awfully low.
  options.watchPaths = options.watchPaths.map((path) =>
    path.startsWith('../') ? path.substring(1) : path
  );

  // the manifest manager maintains the state of the disconnected manifest data during the course of the dev run
  // it provides file watching services, and language switching capabilities
  const manifestManager = new ManifestManager({
    appName: options.appName,
    rootPath: options.appRoot,
    watchOnlySourceFiles: options.watchPaths,
    requireArg: options.requireArg,
    sourceFiles: options.sourceFiles,
  });

  return manifestManager
    .getManifest(options.language)
    .then((manifest: ManifestInstance) => {
      // creates a fake version of the Sitecore Layout Service that is powered by your disconnected manifest file
      const layoutService = createDisconnectedLayoutService({
        manifest,
        manifestLanguageChangeCallback: manifestManager.getManifest,
        customizeContext: options.customizeContext,
        customizeRoute: options.customizeRoute,
        customizeRendering: options.customizeRendering,
      });

      // creates a fake version of the Sitecore Dictionary Service that is powered by your disconnected manifest file
      const dictionaryService = createDisconnectedDictionaryService({
        manifest,
        manifestLanguageChangeCallback: manifestManager.getManifest,
      });

      // creates a fake version of the Sitecore Sitemap Service that is powered by your disconnected manifest file
      const sitemapService = createDisconnectedSitemapService({
        manifest,
        manifestLanguageChangeCallback: manifestManager.getManifest,
      });

      // set up live reloading of the manifest when any manifest source file is changed
      manifestManager.setManifestUpdatedCallback((newManifest) => {
        layoutService.updateManifest(newManifest);
        dictionaryService.updateManifest(newManifest);
        if (options.onManifestUpdated) {
          options.onManifestUpdated(newManifest);
        }
      });

      // attach our disconnected service mocking middleware to webpack dev server
      app.use('/assets', Express.static(join(options.appRoot, 'assets')));
      app.use('/data/media', Express.static(join(options.appRoot, 'data/media')));
      app.use('/sitecore/api/layout/render', layoutService.middleware);
      app.use('/sitecore/api/sitemap', sitemapService.middleware);
      app.use('/sitecore/api/jss/dictionary/:appName/:language', dictionaryService.middleware);

      if (options.afterMiddlewareRegistered) {
        options.afterMiddlewareRegistered(app);
      }

      if (options.port) {
        app.listen(options.port, () => {
          if (options.onListening) {
            options.onListening();
          } else {
            console.log(
              `JSS Disconnected-mode Proxy is listening on port ${options.port}. (PID: ${process.pid})`
            );
          }
        });
      }
    })
    .catch((error: Error) => {
      if (options.onError) {
        options.onError(error);
      } else {
        console.error(error);
        process.exit(1);
      }
    });
}
