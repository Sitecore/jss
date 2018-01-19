# node/express scaffolding for SSR outside of Sitecore Content Delivery

This is a sample setup showing one one of how you can configure rendering server on top of node.js and Express.

The setup is using `sitecore-jss-proxy` that enables request proxying to Sitecore CD along with the http cookies to enable tracking, personalization and contact identification.

> This is a sample setup that hasn't been tested in production and is not officially supported by Sitecore, so use this on your own risk.

You can use this as a starting ground to unlock deployment of your JSS apps to any managed node.js hosting environment (Azure App Service, Heroku, IBM BlueMix, you name it).

## Pre-requisites

1. Your Sitecore instance needs to be configured with JSS.Server and the API Key provisioned. Read more [here](https://jss.sitecore.net/#/setup/jss-server-install?id=jss-server-install) how to set it up.

    > LayoutService API should be returning output if you make the following request to your Sitecore instance. `http://sitecore-host/sitecore/api/layout/render/jss?item=/&sc_apikey={YOUR_API_KEY}`

1. Build your JS app bundle with `npm run build`.
  
    > You can use any of the samples from this repo.

2. Take the JS bundle files and copy them under this project's `./dist/Your-App-Name`.
  You can lookup the value of `Your-App-Name` from your JSS app's package.config:

  ```
  "config": {
    "appName": "JssBasicAppAngular",
  ```

## Setup

1. Open `config.js` and specify connection settings to your Sitecore CD instance, specifically `apiHost` and `apiKey`:

    ```javascript
    module.exports = {
      //change to https to enable Login functionality
      apiHost: 'http://your-sitecore-host',
      layoutServiceRoute: '/sitecore/api/layout/render/jss',
      //needs to be populated before use
      apiKey: '{API-KEY}', 
      pathRewriteExcludeRoutes: ['/dist', '/assets', '/sitecore/api'],
      debug: false,
      proxyOptions: {
        secure: false, //for demo ONLY, allows self-signed SSL certs
      },
    };
    ```

    > Sitecore API key needs to be provisioned ahead of time.

## Build & run
1. Run `npm install`

1. Run `npm run start`
  
You should be able to see the following message:
`server listening on port 3000!` and see all the communication between this server and your Sitecore CD instance in the console.

More info on this setup can be found [here](https://jss.sitecore.net/#/application-modes?id=headless-server-side-rendering-mode).