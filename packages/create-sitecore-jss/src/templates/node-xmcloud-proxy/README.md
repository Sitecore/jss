# Node XM Cloud Proxy

> Sitecore JSS Proxy for XM Cloud is considered experimental.

[Documentation](TODO)

This proxy will serve as the backbone for supporting various SPA frameworks by handling server-side rendering (SSR), data queries, and middleware functionalities.

This is a sample setup showing one of how you can configure XM Cloud rendering server.

## Features Supported

- `Context ID`: The Context ID environment variable simplifies setting up and configuring XM Cloud solutions. It's a unified identifier that maps to all your configured resources, such as content, sites, files, forms, and integration settings.

- `Pages new editing integration via HTTP render engine endpoint`: Before JSS 22.1, JSS Next.js apps integrated with Sitecore editors through chromes, where data was sent via a POST request. With the 22.1 release, a new metadata method was introduced, rendering the app inside an iframe in XM Cloud Pages, offering benefits like faster load times, simpler configuration, and direct local host connections without tunneling.

- `XM Cloud proxy personalization` with embedded personalization and A/B Component Test support.

- `Forms support`: provides the capability to consume and post Sitecore Forms from JSS apps. Sitecore Forms is a form-authoring framework that enables marketers to author their own forms, collect data, and analyze form performance.

## Configuration Setup

The config.ts file in this proxy app handles essential configurations for server-side rendering, data queries, and middleware functionalities. Here are the main configurations defined:

- Server Bundle Configuration:

  - The app loads a server.bundle.js file, pre-built from your SPA app, for SSR support.
  - This file contains the configuration and factory functions essential for rendering and data querying.

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
    - Enable/Disable Switch: Functions that allow you to conditionally disable personalization based on the environment (e.g., disabled in development mode) and cookie consent policy.
    - Language Configuration: defaultLanguage serves as a fallback if language data is unavailable in layout data.

This configuration is designed to be flexible and secure, with dynamic settings managed via environment variables where appropriate.

### Environment Variables

The following environment variables can be set to configure the Proxy sample instead of modifying `config.js`. You can use the `.env` file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter           | Description                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROXY_BUNDLE_PATH` | Path to the JSS SPA app's `server.bundle.js`. Default can be seen in [config.js](./config.js) file.                                                                                          |
| `PROXY_PORT`        | Optional. Port which will be used when start sample. Default can be seen in [config.js](./config.js) file.                                                                                   |
| `DEBUG`             | Optional. Debug level for the proxy. Set the DEBUG environment variable to 'sitecore-jss:_,proxy_,http-proxy-middleware\*, 'sitecore-jss:layout','sitecore-jss:personalize' to see all logs. |

## Pre-requisites

1. SPA sample supports XM Cloud out of the box.

2. Build your SPA app bundle with `jss build` or `npm run build`. The build output should be placed in the `dist` folder. |

## Build & run

1. Run `npm install`

2. Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!`.

## Deploy to Netlify

`NOTE: If you are using the Angular starter from the XM-Cloud Foundation repository within a monorepo, please skip to Step 3.`

1. Run `npm init` in the root directory and add the following scripts to package.json:
   ```
      "build": "cd ./<your-proxy-app-name> && npm run build-all && cd ..",
      "install": "cd ./<your-proxy-app-name> && npm install && npm run install-all && cd ..",
   ```
2. Ensure that `<your-proxy-app-name>/package.json` includes the following commands to handle the build and install steps properly::
   ```
      "build-all": "cd ../angular && npm run build && cd ../<your-proxy-app-name> && tsc",
      "install-all": "cd ../angular && npm i && cd ../<your-proxy-app-name>"
   ```
3. Add `serverless-http` to the list of dependencies in `<your-proxy-app-name>/package.json` and then add the following variable to your ``<your-proxy-app-name>/src/index.ts` file.
    ```
      export const handler = serverless(server);
    ```
4. Create a `netlfiy.toml` file if not already created and ensure that the following Netlify configuration is added there:
   - Following functions lets the proxy app to treated as netlify functions. [Functions Overview](https://docs.netlify.com/functions/overview/)
     ```
        [functions]
        directory = "<your-proxy-app-name>/src"
        node_bundler = "esbuild"
        included_files = ["<your-proxy-app-name>/dist/**"]
     ```
   - To ensure that static assets are accessed properly we may need to add redirects statement for them to the toml file:
     ```
        [[redirects]]
        from = "/dist/browser/*"
        status = 200
        to = "/browser/:splat"
     ```
   - To ensure that static files under /dist are not accessible via browser add `force=true` to the above
     ```
       [[redirects]]
       from = "/*"
       status = 200
       to = "/.netlify/functions/index/:splat"
       force = true
     ```
   - Build command
     ```
     [build]
     command = "npm run build"
     publish = "<your-proxy-app-name>/dist"
     ```
5. Create your netlify deployment: [A Step-by-Step Guide: Deploying on Netlify | Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
   a. Set up all your necessary environment variables like SITECORE_EDGE_CONTEXT_ID, SITECORE_SITE_NAME etc.
   b. Set up your build settings in Site configuration --> Build and Deploy tab.
      sample configuration:
        Base Directory: /
        Build command: npm run build
        Publish directory: /proxy/dist
        Functions directory: /proxy/src
   NOTE: If proxy/dist folder is not picked up properly by Netlify make sure that the `PROXY_BUILD_PATH` env variable is unix style path e.g. `../proxy/dist`
