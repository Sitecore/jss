# Node XM Cloud Proxy

> Sitecore JSS Proxy for XM Cloud is considered experimental.

[Documentation](<TODO>)

This is a sample setup showing one of how you can configure XM Cloud rendering server.

## Pre-requisites

1. SPA sample supports XM Cloud out of the box.

1. Build your SPA app bundle with `jss build`. The build output should be placed in the `dist` folder.

## Setup

Open `config.js` and specify your application settings.

### Environment Variables

The following environment variables can be set to configure the Proxy sample instead of modifying `config.js`. You can use the `.env` file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter                              | Description                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROXY_BUNDLE_PATH`                        | Path to the JSS SPA app's `server.bundle.js`. Default can be seen in [config.js](./config.js) file.                                                                                                                    |
| `PROXY_PORT`                              | Optional. Port which will be used when start sample. Default can be seen in [config.js](./config.js) file.                                                             |
| `DEBUG`                  | Optional. Debug level for the proxy. Set the DEBUG environment variable to 'sitecore-jss:*,proxy*,http-proxy-middleware*' to see all logs.                                                                                                                  |

## Build & run

1. Run `npm install`

1. Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!`.
