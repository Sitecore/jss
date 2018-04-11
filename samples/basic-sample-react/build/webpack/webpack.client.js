import merge from 'lodash.merge';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import sharedConfig from './webpack.shared';
import jssConfig from '../config';

/*
  Define the client-side bundle. This is executed by a browser as it runs the JSS application.
*/
export default function(envVars) {
  const expandedSharedConfig = sharedConfig(envVars);

  const merged = merge({}, expandedSharedConfig, {
    name: 'client',
    target: 'web',
    entry: {
      // main entry point for the client application; src/client.js
      client: ['./client.js'],
    },
  });

  merged.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor-client',
      filename: '[name].bundle.js',
      minChunks: (module) => module.resource && module.resource.indexOf('node_modules') !== -1,
    })
  );

  merged.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    })
  );

  // turn on webpack-dev-server if needed
  if (envVars && envVars.devserver) {
    merged.entry.client.unshift(
      `webpack-dev-server/client?http://localhost:${jssConfig.devServerPort}`
    );
  }

  return merged;
}
