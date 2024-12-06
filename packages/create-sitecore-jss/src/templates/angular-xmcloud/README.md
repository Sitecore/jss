# Angular for XMCloud

> Sitecore JSS Angular App for XM Cloud. This feature is currently in public beta.
> If you encounter any issues or bugs, please submit a new issue in the [JSS GitHub Repo](https://github.com/Sitecore/jss)

[Documentation](https://doc.sitecore.com/xmc/en/developers/jss/latest/jss-xmc/introducing-sitecore-javascript-rendering-sdk.html)

This Single Page Application (SPA) built with Angular is designed to be fully compatible with XM Cloud, incorporating several key add-ons and features to streamline the development process and enable seamless integration.

The Angular XM Cloud integration consists of two parts:
- `XM Cloud Angular`: simplifies connecting the application to XM Cloud and configuring the integration of multiple composable Sitecore products, and provides out-of-the-box helper components.
- `XM Cloud Proxy`: Adds integration with XM Cloud for the JSS SPA applications and enables editing, personalization and component A/B/n testing support. See [XM Cloud Proxy](../node-xmcloud-proxy/) for more information.

The following key features are supported:

- `Context ID`: The Context ID environment variable simplifies setting up and configuring XM Cloud solutions. It's a unified identifier that maps to all your configured resources, such as content, sites, files, forms, and integration settings.

- `XM Cloud Pages editing integration`: full integration with Pages - the dynamic visual page editor of XM Cloud.

- `XM Cloud proxy personalization` with embedded personalization and component A/B/n testing.

- `Forms support`: consume and post XM Cloud Forms in JSS apps. Using Forms, marketers can create forms, collect data, and analyze form performance.

- `Internationalization` support.

> The following features and integrations are not supported by Angular and Proxy apps for XM Cloud:
> - Multisite
> - The XM Cloud Components application
> - BYOC components
> - SXA sitemap, redirects, error pages
> - Sitecore Experience Editor

## Getting Started

### Development

When building and running your app in connected (development) mode the proxy application is not needed.

Execute the following commands:
```shell
npm install
npm run build
npm run start:connected
```

> The following features are not supported in development mode:
> * personalization
> * server-side rendering
> * editing

### Production

To build and run in production mode you need to have your Angular app side by side with the [Node XM Cloud proxy](../node-xmcloud-proxy/).

Execute the following commands:

For the Angular app:
```shell
npm install

# It will build the angular app and copy the the resulting `/dist` folder into the specified proxy app folder
npm run build
```

For the Proxy app:

```shell
npm install
npm run start
```

For additional information on how to set up and run a SPA app in production mode against an XM Cloud instance you can check the [spa-starters monorepo](https://github.com/sitecorelabs/xmcloud-foundation-head/tree/main/headapps/spa-starter) in the XM Cloud Foundation Starter Kit.

## Environment Variables

The following environment variables can be used to configure the angular app. You can use the `.env` file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter                              | Description                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROXY_HOST`                        | Your XM Cloud Proxy hostname is needed to build the app and execute the client-side requests against the proxy server. Default value `http://localhost:3000`                                                                                                                  |
| `PROXY_BUILD_PATH`                              | Your XM Cloud Proxy server path is needed to build the app. The build output will be copied to the XM Cloud Proxy application path. Default value `<xmcloud_proxy_path>\dist`.
| `SITECORE_EDGE_CONTEXT_ID`                              | The Context ID, which covers many system configurations, is required for connecting to the XM Cloud back end. This is an XM Cloud system environment variable. When the application runs on the XM Cloud editing host, this value is always set to the preview Context ID.                   |
| `SITECORE_API_KEY`                              | The API key for GRAPH_QL_ENDPOINT authentication. It should be used in combination with SITECORE_API_HOST for local development when connecting to a local XM Cloud instance
| `SITECORE_API_HOST`                              | The API hostname, needed to build the application. This should be used in combination with SITECORE_API_KEY for local development. For example, https://<xmc_cm_host>.sitecorecloud.io.                   |
| `GRAPH_QL_ENDPOINT`                              | Your GraphQL Edge endpoint. This is typically optional. By default, the endpoint is calculated using the resolved Sitecore API hostname + the `graphQLEndpointPath` defined in your `package.json`. For a preview endpoint (a CM instance on XM Cloud or a local one), the value is <xmc_cm_host>/sitecore/api/graph/edge.  |
| `SITECORE_SITE_NAME`                              | The name of your site. This variable overrides the config.appName defined in the package.json file. You can find this value in the Sites dashboard by opening the actions menu for a site and navigating to Settings > Developer settings. The default value is the name of your app.                   |
| `DEFAULT_LANGUAGE`                              | The default language of your app. The default value is `en`                  |
| `DEBUG`                  | Optional. Debug level for the application. Set the DEBUG environment variable to 'sitecore-jss:*' to see all logs. Refer to the [official docs](https://doc.sitecore.com/xmc/en/developers/jss/22/jss-xmc/debug-logging-in-jss-apps.html#namespaces) for all the available namespaces.
