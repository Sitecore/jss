---
name: ssr-experience-edge
routeTemplate: ./data/component-templates/article.yml
title: SSR using Sitecore Experience Edge
---

# Server-side rendering using Sitecore Experience Edge

You can configure server-side rendering (SSR) for your JSS application using a Sitecore Experience Edge endpoint. 

Sitecore provides a [sample for server-side rendering using a Sitecore Experience Edge endpoint](https://github.com/Sitecore/jss/tree/dev/samples/node-headless-ssr-experience-edge), Node.js, and Express. 

 > NodeJS is a third-party technology that you must configure according to your specific use-case scenarios for Headless mode.

The application renders your JSS application, querying layout and dictionary data without proxying the requests.

> The sample for SSR using a Sitecore Experience Edge endpoint is _experimental_ and not officially supported by Sitecore.

## Pre-requisites

To use this technique, you need:

1. A Sitecore instance with [Headless Services installed](/docs/client-frameworks/getting-started/jss-server-install).

2. A Sitecore API key. 

3. A React, Vue or Angular application built with JSS that:

   - Supports [server-side rendering in integrated mode](/docs/techniques/ssr/integrated-mode-ssr).

   - Supports the Experience Edge GraphQL schema. 

   > JSS applications, except those based on Next.js, still use the legacy/non-Edge GraphQL schema. You will need to update your application's GraphQL components and queries to be compatible with the Experience Edge schema. See the [GraphQL-ConnectedDemo](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx) component and [the associated GraphQL query](https://github.com/Sitecore/jss/blob/dev/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.graphql) in the Next.js sample application.

   - Provides the `SITECORE_API_KEY`. The `GraphQLRequestClient` uses the API key to set the `sc_apikey` header for authentication on both the Sitecore XM Edge schema and Sitecore Experience Edge.

## How to use the sample

To use the SSR rendering with Sitecore Experience Edge:

1. Create the SSR application based on the `node-headless-ssr-experience-edge` sample. In this example, we name it `jss-edge`.

   ```
   jss create jss-edge node-headless-ssr-experience-edge
   ```

2. In your React/Vue/Angular app's root directory, build your JSS app for production with `jss build`.

3. Copy the production build artifacts from your app (`/dist` or `/build` within the app) to the `sitecoreDistPath` set in your app's `package.json` under the SSR sample root path. For example, `jss-edge/dist/<JSS app name>`.

> Alternatively, change the `instancePath` in your JSS app's `scjssconfig.json` to the SSR sample root path, and then use `jss deploy files` to complete the deployment to the SSR sample.

5. In `jss-edge/config.js`, set the values for:

   - `appName` to the value set for your JSS application in `config.appName` in the `package.json` file.
   - `bundlePath` to the path where you copied the built JSS app's `server.bundle.js`. For example: `'./dist/<JSS app name>/server.bundle'`. 
   - `endpoint` to your Experience Edge endpoint.
   - `apiKey` to the [API key provisioned on Sitecore Experience Edge](https://doc.sitecore.com/en/developers/101/developer-tools/test-your-queries.html#UUID-779f6288-57a9-7a09-aa44-3c130d3cad33_procedure-idm4588913365819232428308238427).
   - `defaultLanguage` to the JSS app's default language used to determine language context if no language is specified in the request URL.
   - `port` for starting the SSR sample. 

   Alternatively, you can define values for the [environment variables](#environment-variables) used by the SSR sample.

6. Test the SSR application by running `npm run start`.

## Environment Variables

You can set the following environment variables to configure the SSR sample instead of modifying `config.js`, for environments where this is more desirable, like containers:

| Parameter                           | Description                                                  |
| ----------------------------------- | ------------------------------------------------------------ |
| `SITECORE_JSS_APP_NAME`             | The JSS app's name. Used when request layout data and dictionary using graphql query and the default value of `SITECORE_JSS_SERVER_BUNDLE` if not set. |
| `SITECORE_API_KEY`                  | [The API key provisioned on Sitecore Experience Edge.](https://doc.sitecore.com/en/developers/101/developer-tools/test-your-queries.html#UUID-779f6288-57a9-7a09-aa44-3c130d3cad33_procedure-idm4588913365819232428308238427)         |
| `SITECORE_JSS_SERVER_BUNDLE`        | Path to the JSS app's `server.bundle.js` file.               |
| `SITECORE_EXPERIENCE_EDGE_ENDPOINT` | Sitecore Experience Edge endpoint.                           |
| `DEFAULT_LANGUAGE`                  | The JSS app's default language. Used to determine language context if language unspecified in the request URL. |
| `PORT`                              | Optional. Port used when starting the sample. See the default in [config.js](https://github.com/Sitecore/jss/blob/dev/samples/node-headless-ssr-experience-edge/config.js). |

