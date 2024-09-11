import { Config, ServerBundle } from './types';

/**
 * The server.bundle.js file from your pre-built SPA app.
 */
const bundlePath = process.env.PROXY_BUNDLE_PATH || '../dist/server.bundle';

let serverBundle: ServerBundle;

try {
  serverBundle = require(bundlePath);
} catch (error) {
  throw new Error(`ERROR: The server.bundle.js error. ${error}`);
}

export const config: Config = {
  /**
   * The require'd server.bundle.js file from your pre-built SPA app.
   */
  serverBundle,
  /**
   * Port which will be used when start the proxy
   */
  port: process.env.PROXY_PORT || 3000,
};
