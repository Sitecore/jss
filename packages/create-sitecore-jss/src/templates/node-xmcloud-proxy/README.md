# node/express scaffolding for XMCloud using Sitecore Experience Edge

> Sitecore JSS Proxy for XMCloud is considered highly experimental.
<!---
@TODO: Update to next version docs before release
-->

[Documentation (Experience Platform)](<TODO>)


This is a sample setup showing one of how you can configure XMCloud rendering server on top of node.js and Express using Experience Edge.

## Pre-requisites

1. Angular sample supports Experience Edge out of the box.

1. Build your SPA app bundle with `jss build`.

   > You can use JSS sample apps which support XMCloud to operate with this project.

## Setup

Open `config.js` and specify your application settings.

### Environment Variables

The following environment variables can be set to configure the SSR sample instead of modifying `config.js`. You can use the `.env` file located in the root of the app or set these directly in the environment (for example, in containers).

| Parameter                              | Description                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROXY_BUNDLE_PATH`                        | Path to the JSS app's `server.bundle.js` file.                                                                                                                    |
| `PROXY_PORT`                              | Optional. Port which will be used when start sample. Default can be seen in [config.js](./config.js).                                                             |

## Build & run

1. Run `npm install`

1. Run `npm run start`

You should be able to see the following message:
`server listening on port 3000!`.
