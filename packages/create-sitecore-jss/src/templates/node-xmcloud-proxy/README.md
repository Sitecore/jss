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

## Deploy to Netlify

1. All of the netlify configuration is in `netlify.toml`
2. proxy/package.json has extra commands, they ensure build and install steps would work:

```
    "build-all": "cd ../angular && npm run build && cd ../proxy && tsc",
    "install-all": "cd ../angular && npm i && cd ../proxy"
```
3. <%- appName %>/package.json has its own commands that would be used by netlify:
```
    "build": "cd ./proxy && npm run build-all && cd ..",
    "install": "cd ./proxy && npm run install-all && cd ..",
    "deploy-netlify": "netlify build && netlify deploy --prod"
```
4. To ensure that static assets are accessed properly we may need to add redirects statement for them to the toml file: 
```
  [[redirects]]
  from = "/dist/browser/*"
  status = 200
  to = "/browser/:splat"
```
5. To ensure that static files under /dist are not accessible via browser add `force=true`
```
  [[redirects]]
  from = "/*"
  status = 200
  to = "/.netlify/functions/index/:splat"
  force = true
```
6. Create your netlify deployment: [A Step-by-Step Guide: Deploying on Netlify | Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
7. Set up environment variables.
8. Set up your build settings in Build and Deploy tab.
9. If proxy/dist folder is not picked up properly by Netlify make sure to add env variable in the netlify site where path is unix style path e.g. `../proxy/dist`