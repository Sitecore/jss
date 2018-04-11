import merge from 'lodash.merge';
import sharedConfig from './webpack.shared';
import clientConfig from './webpack.client';

/*
  Define the server-side bundle. This is used by a Node server (or Sitecore server) when doing
  Server-Side Rendering (SSR) of the JSS application.
*/
function serverConfig(envVars) {
  const expandedSharedConfig = sharedConfig(envVars);

  const merged = merge({}, expandedSharedConfig, {
    name: 'server',
    target: 'node',
    entry: {
      // main entry point for the application; src/server.js
      server: ['./server.js'],
    },
    output: {
      libraryTarget: 'this', // this option is required for use with JavaScriptViewEngine
    },
  });

  return merged;
}

// any time we make the server bundle we also need the client bundle so we export them both
export default [serverConfig, clientConfig];
