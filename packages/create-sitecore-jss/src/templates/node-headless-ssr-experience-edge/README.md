# node/express scaffolding for SSR using Sitecore Experience Edge

Sitecore JSS for SSR using Experience Edge is considered experimental.

<!---
@TODO: Update to version 20.0.0 docs before release
-->
[Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/server-side-render-jss-apps-headlessly-using-a-sitecore-experience-edge-endpoint.html) 

> This is a sample setup that is not officially supported by Sitecore.

This is a sample setup showing one of how you can configure rendering server on top of node.js and Express using Experience Edge. It performs only render of the sample app, quering layout data and dictionary data without proxying requests.

## Pre-requisites

1. Your instance needs to be configured with Headless Services Module and the API Key provisioned.

	### // TODO: document how to test GraphQL queries

1. Next.js, React, Angular, and Vue samples support Experience Edge out of the box. The GraphQL components and query are compatible with the Experience Edge schema with no further changes necessary. Provide a `sc_apikey` header for authentication, this header is used for both Sitecore XM Edge schema and Sitecore Experience Edge. Refer to the GraphQL Connected demo component in the desired framework. 

1. Build your JS app bundle with `jss build`.

	> You can use JSS sample apps which support server side rendering (JSS integrated mode) to operate with this project.

1. Deploy the build artifacts from your app (`/dist` or `/build` within the app) to the `sitecoreDistPath` set in your app's `package.json` under the SSR sample root path. Most apps use `/dist/${jssAppName}`, for example `$ssrSampleRoot/dist/${jssAppName}`.

	> Another way to deploy the artifacts to the SSR sample is to change the `instancePath` in your app's `scjssconfig.json` to the SSR sample root path, and then use `jss deploy files` within the app to complete the deployment to the SSR sample.

## Setup

Open `config.js` and specify your application bundle and connection settings.

### Environment Variables

The following environment variables can be set to configure the SSR sample instead of modifying `config.js`, for environments where this is more desirable like containers:

| Parameter                              | Description                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITECORE_JSS_APP_NAME`                | The JSS app's name. Used when request layout data and dictionary using graphql query and the default value of `SITECORE_JSS_SERVER_BUNDLE` if it's not set.      |
| `SITECORE_API_KEY`                     | The API key provisioned on Sitecore Experience Edge. 																																																						|
| `SITECORE_JSS_SERVER_BUNDLE`           | Path to the JSS app's `server.bundle.js` file.        																																									                          |
| `SITECORE_EXPERIENCE_EDGE_ENDPOINT`    | Sitecore Experience Edge endpoint.																																																				                        |
| `DEFAULT_LANGUAGE` | The JSS app's default language. Used to determine language context in case language is not specified in request URL.|
| `PORT` 																 | Optional. Port which will be used when start sample. Default can be seen in [config.js](./config.js).                                                            |

## Build & run

1. Run `npm install`

1. Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!`.
