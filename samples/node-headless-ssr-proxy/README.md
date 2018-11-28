# node/express scaffolding for SSR outside of Sitecore Content Delivery

This is a sample setup showing one one of how you can configure rendering server on top of node.js and Express.

The setup is using `sitecore-jss-proxy` that enables request proxying to Sitecore CD along with the http cookies to enable tracking, personalization and contact identification.

> This is a sample setup that is not officially supported by Sitecore.

You can use this as a starting point to unlock deployment of your JSS apps to any managed node.js hosting environment (Azure App Service, Heroku, IBM BlueMix, you name it).

## Pre-requisites

1.  Your Sitecore instance needs to be configured with JSS.Server and the API Key provisioned. Read more [here](https://jss.sitecore.net/docs/getting-started/jss-server-install) how to set it up.

    > LayoutService API should be returning output if you make the following request to your Sitecore instance. `http://sitecore-host/sitecore/api/layout/render/jss?item=/&sc_apikey={YOUR_API_KEY}`

1.  Build your JS app bundle with `jss build`.

    > You can use any of the JSS sample apps. Other apps must support server side rendering (JSS integrated mode) to operate with this project.

1.  Deploy the build artifacts from your app (`/dist` or `/build` within the app) to the `sitecoreDistPath` set in your app's `package.json` under the proxy root path. Most apps use `/dist/${jssAppName}`, for example `$proxyRoot/dist/${jssAppName}`.

> Another way to deploy the artifacts to the proxy is to change the `instancePath` in your app's `scjssconfig.json` to the proxy root path, and then use `jss deploy files` within the app to complete the deployment to the proxy.

## Setup

Open `config.js` and specify your application bundle and connection settings to your Sitecore CD instance. `config.js` is heavily commented for your perusal.

### Environment Variables

The following environment variables can be set to configure the proxy instead of modifying `config.js`, for environments where this is more desirable like containers:

| Parameter                              | Description                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `SITECORE_JSS_SERVER_BUNDLE`           | Path to the JSS app's `server.bundle.js` file.                                                                                             |
| `SITECORE_API_HOST`                    | Sitecore instance host name. Should be HTTPS in production.                                                                                |
| `SITECORE_LAYOUT_SERVICE_ROUTE`        | Optional. The path to layout service for the JSS application. Defaults to `/sitecore/api/layout/render/jss`.                               |
| `SITECORE_API_KEY`                     | The Sitecore SSC API key your app uses.                                                                                                    |
| `SITECORE_PATH_REWRITE_EXCLUDE_ROUTES` | Optional. Pipe-separated list of absolute paths that should not be rendered through SSR. Defaults can be seen in [config.js](./config.js). |
| `SITECORE_ENABLE_DEBUG`                | Optional. Writes verbose request info to stdout for debugging. Defaults to `false`.                                                        |

## Build & run

1.  Run `npm install`

1.  Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!` and see all the communication between this server and your Sitecore CD instance in the console.

More info on this setup can be found [here](https://jss.sitecore.net/#/application-modes?id=headless-server-side-rendering-mode).

## Production Notes

- Ensure that `debug: false` in `config.js`. Console output will cause terrible scaling.
- Customise `error.html` in case your app throws HTTP 500 errors.
- Load test the proxy prior to launch to ensure proper performance levels for your needs.
