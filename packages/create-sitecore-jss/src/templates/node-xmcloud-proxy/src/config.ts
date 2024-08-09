import { Config, ServerBundle } from './types';

/**
 * The server.bundle.js file from your pre-built SPA app.
 */
const bundlePath = process.env.PROXY_BUNDLE_PATH || '../dist/server.bundle';

const serverBundle: ServerBundle = require(bundlePath);

export const config: Config = {
  /**
   * The require'd server.bundle.js file from your pre-built SPA app.
   */
  serverBundle,
  /**
   * Port which will be used when start the proxy
   */
  port: process.env.PROXY_PORT || 3001,
};
