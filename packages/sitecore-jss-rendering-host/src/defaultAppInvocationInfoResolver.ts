import importFresh from 'import-fresh';
import path from 'path';
import { AppInvocationInfoResolver } from './ssrMiddleware';

/**
 * Returns the default AppInvocationInfoResolver, which is responsible for resolving the function, within your app bundle,
 * that should be invoked for rendering your app.
 *
 * By default, the resolver assumes a folder structure of:
 * `./{baseAppPath}/{JSSAppName}/{serverBundleName}.js`
 *
 * `JSSAppName` is the `id` property of the JSON request body that is POSTed to the rendering host by Sitecore.
 *
 * `serverBundleName` is the name of the JavaScript file (typically a bundle) that contains the function for rendering your app.
 *
 * @param {string} [baseAppPath='./dist'] The base path to your JSS app(s), defaults to `./dist`
 * @returns {AppInvocationInfoResolver} resolver
 */
export function getDefaultAppInvocationInfoResolver({
  appPathResolver = (requestJson: any) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return path.resolve(baseAppPath, requestJson.id, serverBundleName);
  },
  baseAppPath = './dist',
  serverBundleName = 'server.bundle',
}) {
  const resolver: AppInvocationInfoResolver = (requestJson: any) => {
    // default resolution assumes folder structure of:
    // ./dist/{JSSAppName}/{ServerBundleName}.js
    const modulePath = appPathResolver(requestJson); // path.resolve(baseAppPath, requestJson.id, serverBundleName);
    const resolvedModule = importFresh(modulePath);
    const resolvedRenderFunctionName = requestJson.functionName || 'renderView';
    const renderFunction = resolvedModule[resolvedRenderFunctionName];

    if (!renderFunction) {
      throw new Error(`The module "${modulePath}" has no export named "${resolvedRenderFunctionName}".
        Ensure that your server bundle is transpiled to CommonJS (or equivalent) format that can be
        resolved by a Node.js 'require' statement. And ensure that your server bundle exports a function
        named "${resolvedRenderFunctionName}".`);
    }

    const renderFunctionArgs = requestJson.args;

    return {
      renderFunction: (...args) => {
        console.log(`[SSR] rendering app at ${modulePath} via render function named ${resolvedRenderFunctionName}`);
        return renderFunction(...args);
      },
      renderFunctionArgs,
    };
  };

  return resolver;
}
