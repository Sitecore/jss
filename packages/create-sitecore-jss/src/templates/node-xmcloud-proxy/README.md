# Node XM Cloud Proxy

> Sitecore XM Cloud Proxy is in public beta.
> If you encounter any issues or bugs, please submit a new issue in the [JSS GitHub Repo](https://github.com/Sitecore/jss)

[Documentation]((https://doc.sitecore.com/xmc/en/developers/jss/latest/jss-xmc/introducing-sitecore-javascript-rendering-sdk.html)) 

This Node.js-based proxy app is the backbone for enabling seamless integration between XM Cloud and various SPA frameworks like React, Angular, or Vue laying the groundwork for future JSS starter kits built for other front-end JavaScript frameworks. It acts as a middleware layer to handle critical functionalities such as server-side rendering (SSR), enabling editing and personalization, A/B/n component testing, and integrating Sitecore Forms. By serving as the rendering host, it ensures a smooth connection between Sitecore XM Cloud services and your front-end applications, making it easier to build dynamic, personalized, and localized experiences for users.

This is a sample setup showing one of how you can configure XM Cloud rendering server on top of Node.js and Express.js

## Features Supported

- `Context ID`: the Context ID environment variable simplifies setting up and configuring XM Cloud solutions. It's a unified identifier that maps to all your configured resources, such as content, sites, files, forms, and integration settings.

- `XM Cloud Pages editing integration`: full integration with Pages - the dynamic visual page editor of XM Cloud.

- `XM Cloud proxy personalization` with embedded personalization and Component A/B/n Testing support.

- `Forms support`: provides the capability to consume and post Sitecore Forms from JSS apps. Sitecore Forms enables marketers to author their own forms, collect data, and analyze form performance.

- `Internationalization` support.

> The following features and integrations are not supported by Node XM Cloud Proxy:
> - Multisite
> - XM Cloud Components application
> - BYOC components
> - SXA sitemap, redirects, error pages
> - Sitecore Experience Editor

## Getting Started

Here are the main configurations defined in the `config.ts` file in the node XM Cloud proxy app:

- Server Bundle Configuration:

  - The app loads a `server.bundle.js` file, pre-built from your SPA app.
  - This file contains the required configuration options.
- GraphQL Endpoint Setup:

  - Defines a graphQLEndpoint for handling Sitecore GraphQL requests. It differentiates between production (Sitecore Edge) and development (Sitecore CM) endpoints.
  - Constructs the target URL and path for proxy requests, ensuring compliance with http-proxy-middleware requirements.

- Port Configuration:

  - Configures the port for running the proxy, with a default of 3000 or an environment-specified port.

- Personalization Configuration (personalizeConfig):

  - Sets up Sitecore personalization through PersonalizeConfig, defining settings for both Sitecore Experience Edge and CDP endpoints.
  - Contains options to control personalization features, including:
    - Timeouts for Edge and CDP endpoints (default 400ms, configurable via environment variables).
    - Scope and site name used for Sitecore Personalize.
    - Enable/Disable Switch: Functions that allow you to conditionally disable personalization based on the environment (such as disabling it in development mode) and and cookie consent policy.
    - Language Configuration: defaultLanguage serves as a fallback if language data is unavailable in layout data.

This configuration is designed to be flexible and secure, with dynamic settings managed via environment variables where appropriate.

### Environment Variables

The following environment variables can be used to configure the Node XM Cloud Proxy app instead of modifying config.js. You can use the .env file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter           | Description                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROXY_BUNDLE_PATH` | Path to the JSS SPA app's `server.bundle.js`. Default can be seen in [config.js](./config.js).                                                                                          |
| `PROXY_PORT`        | Optional. Port which will be used when start sample. Default can be seen in [config.js](./config.js).                                                                                   |
| `DEBUG`             | Optional. Debug level for the proxy. Set the DEBUG environment variable to 'sitecore-jss:_,proxy_,http-proxy-middleware\*, 'sitecore-jss:layout','sitecore-jss:personalize' to see all logs. |
| `JSS_EDITING_SECRET`             | Required when working with the Sitecore Editor to secure the `/api/editing/render` endpoint exposed by your proxy app. An alphanumeric value of at least 16 characters is recommended. |
| `PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT=`             | Optional. Timeout (ms) for Sitecore CDP requests to respond within. Default is 400. |
| `PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT`             | Optional. Timeout (ms) for Sitecore Experience Edge requests to respond within. Default is 400. |


## Pre-requisites

1. SPA application supports XM Cloud out of the box.

2. Build your SPA application bundle with `jss build` or `npm run build`. The build output should be placed in the `dist` folder.

## Run

1. Run `npm install`

2. Run `npm run start`

If the operation is successful, you’ll see the following message:
`server listening on port 3000!`.

## Deployment options

### Deploy to Netlify

Follow these steps to deploy your application to Netlify. The deployed site can be used as an editing host in XM Cloud.

1. Run `npm init` in the root directory (which contains SPA and Node XM Cloud Proxy app folder) and add the following scripts to package.json:
   ```
      "build": "cd ./<your-proxy-app-name> && npm run build-all && cd ..",
      "install": "cd ./<your-proxy-app-name> && npm install && npm run install-all && cd ..",
   ```
2. Ensure that `<your-proxy-app-name>/package.json` includes the following commands to handle the build and install steps properly:
   ```
      "build-all": "cd ../angular && npm run build && cd ../<your-proxy-app-name> && tsc",
      "install-all": "cd ../angular && npm i && cd ../<your-proxy-app-name>"
   ```
3. Configure `serverless-http`:
    - Install the npm package
      ```
        npm i serverless-http
        ```
    - Import serverless-http in `<your-proxy-app-name>/src/index.ts` file.
        ```
          export const handler = serverless(server);
        ```
4. Create a `netlify.toml` file and ensure that the following Netlify configuration is added there:
   - The following allows the proxy app to be treated as Netlify functions. [Functions Overview](https://docs.netlify.com/functions/overview/)
     ```
        [functions]
        directory = "<your-proxy-app-name>/src"
        node_bundler = "esbuild"
        included_files = ["<your-proxy-app-name>/dist/**"]
     ```
   - To ensure that static assets are accessed properly, you might need to add the following redirects statement to the toml file:
     ```
        [[redirects]]
        from = "/dist/browser/*"
        status = 200
        to = "/browser/:splat"
     ```
   - By default, redirects won’t be applied if there’s a file with the same path as the one defined in the `from` property. Setting `force` to `true` will make the redirect rule take precedence over any existing files.
     ```
       [[redirects]]
       from = "/*"
       status = 200
       to = "/.netlify/functions/index/:splat"
       force = true
     ```
   - Add the following build command:
     ```
     [build]
     command = "npm run build"
     publish = "<your-proxy-app-name>/dist"
     ```
5. Create your [Netlify deployment](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/):
   - Set up all your necessary environment variables like `SITECORE_EDGE_CONTEXT_ID`, `SITECORE_SITE_NAME` etc.
   - Configure your build settings in the Build and Deploy tab under Site configuration.
      - sample configuration:
       ```
        Base Directory: /
        Build command: npm run build
        Publish directory: /proxy/dist
        Functions directory: /proxy/src
        ```
   NOTE: If `proxy/dist` folder is not picked up properly by Netlify make sure that the `PROXY_BUILD_PATH` env variable is unix style path e.g. `../proxy/dist`

### Deploy to Vercel

> Deployment to Vercel is not yet supported.
