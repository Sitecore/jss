# Angular for XMCloud

> Sitecore JSS Angular App for XM Cloud.

[Documentation](<TODO>)

This Single Page Application (SPA) built with Angular is designed to be fully compatible with XM Cloud, incorporating several key add-ons and features to streamline the development process and enable seamless integration. The supported key features are as follows:

- Context ID / envoy proxy

- Pages new editing integration via HTTP render engine endpoint (e.g. editing/render)

- Personalization middleware (can do layout manipulation directly since we are always SSR)

- Rewrites middleware

- Forms support

- Multisite

This SPA is tailored to enhance development workflows and enable full utilization of XM Cloud’s capabilities, providing a seamless and efficient foundation for developers.

## Add-ons added
Following are the add-ons added to the Angular base app to make it compatible with XM Cloud:

- `XMCloud Angular`: Adds support for the Sitecore Context data, which simplifies connecting the application to XM Cloud and configuring the integration of multiple composable Sitecore products. Also includes example components for SXA projects.

- `XMCloud Proxy`: Adds integration with XMCloud for the JSS SPA applications. Considered experimental.

## Environment Variables

The following environment variables can be set to configure the angular app. You can use the `.env` file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter                              | Description                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROXY_HOST`                        | Your XM Cloud Proxy hostname is needed to build the app and execute the client-side requests against the proxy server.                                                                                                                  |
| `PROXY_BUILD_PATH`                              | Your XM Cloud Proxy server path is needed to build the app. The build output will be copied to the proxy server path.
| `SITECORE_EDGE_CONTEXT_ID`                              | The Context ID, which covers many system configurations, required for connecting to the XM Cloud back end. This is an XM Cloud system environment variable. When the application runs on the XM Cloud rendering host, this value is always set to the preview Context ID.                   |
| `SITECORE_API_KEY`                              | The Context ID, which covers many system configurations, required for connecting to the XM Cloud back end. This is an XM Cloud system environment variable. When the application runs on the XM Cloud rendering host, this value is always set to the preview Context ID.                   |
| `SITECORE_API_HOST`                              | The API hostname, needed to build the application. When the application runs on the XM Cloud rendering host, this value is always set to your content management instance, and it will override any value set in your .env file. For example, https://<xmc_cm_host>.sitecorecloud.io.                   |
| `GRAPH_QL_ENDPOINT`                              | The GraphQL endpoint. For Experience Edge, the value is https://edge.sitecorecloud.io/api/graphql/v1. For a preview endpoint (a CM instance on XM Cloud or a local one), the value is <xmc_cm_host>/sitecore/api/graph/edge. When the application runs on the XM Cloud rendering host, this value is always set to the preview endpoint for your CM instance <xmc_cm_host>/sitecore/api/graph/edge , and it will override any value set in your .env file.    |
| `SITECORE_SITE_NAME`                              | The name of your site. This variable overrides the config.appName defined in the package.json file. You can find this value in the Sites dashboard by opening the actions menu for a site and navigating to Settings > Developer settings.                   |
| `DEFAULT_LANGUAGE`                              | The default language of your app.                   |
| `FETCH_WITH`                              | Determines how layout and dictionary data is fetched from Sitecore. The possible values are REST and GraphQL. You select the value during the app scaffold process. If the value isn't provided, the default is GraphQL.                   |
| `DEBUG`                  | Optional. Debug level for the proxy. Set the DEBUG environment variable to 'sitecore-jss:*,proxy*,http-proxy-middleware*' to see all logs.

## Build & run

Build your Angular SPA app bundle with `jss build`. The build output should be placed in the `dist` folder and will automatically get copied to the proxy app.

To run your app in production mode. Go to the proxy app:

1. Run `npm install`

2. Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!`.