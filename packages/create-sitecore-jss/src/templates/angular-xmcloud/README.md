# Angular for XMCloud

> Sitecore JSS Angular App for XM Cloud. For the current release this feature is experimental.

[Documentation](<TODO>)

This Single Page Application (SPA) built with Angular is designed to be fully compatible with XM Cloud, incorporating several key add-ons and features to streamline the development process and enable seamless integration. The supported key features are as follows:

- `Context ID`: The Context ID environment variable simplifies setting up and configuring XM Cloud solutions. It's a unified identifier that maps to all your configured resources, such as content, sites, files, forms, and integration settings.

- `Pages new editing integration via HTTP render engine endpoint`: Before JSS 22.1, JSS Next.js apps integrated with Sitecore editors through chromes, where data was sent via a POST request. With the 22.1 release, a new metadata method was introduced, rendering the app inside an iframe in XM Cloud Pages, offering benefits like faster load times, simpler configuration, and direct local host connections without tunneling.

- `XM Cloud proxy personalization` with embedded personalization and A/B Component Test support.

- `Forms support`: provides the capability to consume and post Sitecore Forms from JSS apps. Sitecore Forms is a form-authoring framework that enables marketers to author their own forms, collect data, and analyze form performance.

This SPA is tailored to enhance development workflows and enable full utilization of XM Cloud’s capabilities, providing a seamless and efficient foundation for developers.

## Components and Supporting Applications

The following components and supporting applications have been added to the Angular base app to ensure compatibility with XM Cloud:

- `XM Cloud Angular`: Adds support for the Sitecore Context data, which simplifies connecting the application to XM Cloud and configuring the integration of multiple composable Sitecore products. Angular app provides components and can be used during development. Once the app is built and its build artifacts are copied into the proxy, the proxy app can be used to connect to an XMCloud instance and render its content (including personalization etc).

- `XM Cloud Proxy`: Adds integration with XMCloud for the JSS SPA applications and enables editing, personalization and A/B component testing support.

## Environment Variables

The following environment variables can be set to configure the angular app. You can use the `.env` file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter                              | Description                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROXY_HOST`                        | Your XM Cloud Proxy hostname is needed to build the app and execute the client-side requests against the proxy server. Default value `http://localhost:3000`                                                                                                                  |
| `PROXY_BUILD_PATH`                              | Your XM Cloud Proxy server path is needed to build the app. The build output will be copied to the XMCloud Proxy application path. Default value `<xmcloud_proxy_path>\dist`.
| `SITECORE_EDGE_CONTEXT_ID`                              | The Context ID, which covers many system configurations, required for connecting to the XM Cloud back end. This is an XM Cloud system environment variable. When the application runs on the XM Cloud rendering host, this value is always set to the preview Context ID.                   |
| `SITECORE_API_KEY`                              | The API key for GRAPH_QL_ENDPOINT authentication. For Experience Edge, you can find the API key in the Sites dashboard by opening the actions menu for a site and navigating to Settings > Developer settings. Copy the value for SITECORE_API_KEY. For a preview endpoint (a CM instance either on XM Cloud or locally), use your preview API Key from the CM instance.
| `SITECORE_API_HOST`                              | The API hostname, needed to build the application. This should be used in combination with SITECORE_API_KEY for local development or local container setup. For example, https://<xmc_cm_host>.sitecorecloud.io.                   |
| `GRAPH_QL_ENDPOINT`                              | Your GraphQL Edge endpoint. This is typically optional. By default, the endpoint is calculated using the resolved Sitecore API hostname + the `graphQLEndpointPath` defined in your `package.json`. For a preview endpoint (a CM instance on XM Cloud or a local one), the value is <xmc_cm_host>/sitecore/api/graph/edge.  |
| `SITECORE_SITE_NAME`                              | The name of your site. This variable overrides the config.appName defined in the package.json file. You can find this value in the Sites dashboard by opening the actions menu for a site and navigating to Settings > Developer settings. Default value `<appName>`,
`                  |
| `DEFAULT_LANGUAGE`                              | The default language of your app. Default value `en`                  |
| `DEBUG`                  | Optional. Debug level for the proxy. Set the DEBUG environment variable to 'sitecore-jss:*,proxy*,http-proxy-middleware*' to see all logs. Refer to the [official docs](https://doc.sitecore.com/xp/en/developers/hd/latest/sitecore-headless-development/debug-logging-in-jss-apps.html#namespaces) for all the available namespaces.

## Build & run

Build your Angular SPA app bundle with `jss build` or `npm run build`. The build output should be placed in the `dist` folder and will automatically get copied to the proxy app. 

To run your app in production mode. Go to the proxy app:

1. Run `npm install`

2. Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!`.