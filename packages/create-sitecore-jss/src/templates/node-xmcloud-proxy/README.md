# Node XM Cloud Proxy

> Sitecore JSS Proxy for XM Cloud is considered experimental.

[Documentation](<TODO>)

This proxy will serve as the backbone for supporting various SPA frameworks by handling server-side rendering (SSR), data queries, and middleware functionalities.

This is a sample setup showing one of how you can configure XM Cloud rendering server.

## Features Supported

- Context ID / envoy proxy

- Pages new editing integration via HTTP render engine endpoint (e.g. editing/render)

- XMCloud proxy personalization

- Forms support

## Configuration Setup

Open `config.js` and specify your application settings.

### Environment Variables

The following environment variables can be set to configure the Proxy sample instead of modifying `config.js`. You can use the `.env` file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter                              | Description                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROXY_BUNDLE_PATH`                        | Path to the JSS SPA app's `server.bundle.js`. Default can be seen in [config.js](./config.js) file.                                                                                                                    |
| `PROXY_PORT`                              | Optional. Port which will be used when start sample. Default can be seen in [config.js](./config.js) file.                                                             |
| `DEBUG`                  | Optional. Debug level for the proxy. Set the DEBUG environment variable to 'sitecore-jss:*,proxy*,http-proxy-middleware*, 'sitecore-jss:layout','sitecore-jss:personalize' to see all logs.

## Pre-requisites

1. SPA sample supports XM Cloud out of the box.

2. Build your SPA app bundle with `jss build` or `npm run build`. The build output should be placed in the `dist` folder.            |

## Build & run

1. Run `npm install`

2. Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!`.
