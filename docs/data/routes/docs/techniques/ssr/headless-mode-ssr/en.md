---
name: headless-mode-ssr
routeTemplate: ./data/component-templates/article.yml
title: Headless with sitecore-jss-proxy
---

# Headless SSR via `sitecore-jss-proxy`

JSS supports headless server-side rendering using any service that supports hosting Node.js applications. In this technique the JSS app receives an incoming HTTP request, which is then rewritten and proxied into a Layout Service request to a Sitecore server. The reply from Layout Service is then provided to the app's SSR infrastructure to render to HTML, the same way that Integrated Mode would work within Sitecore, and then finally the resultant HTML is returned to the client.

All Sitecore marketing features are supported by this headless mode, including personalization, tracking, multivariate testing, etc.

## How to use

1. Clone [the JSS samples repository](https://github.com/sitecore/jss) and copy the `samples/node-headless-ssr-proxy` folder to your disk, for example: `c:\jss-headless`.

  This sample app acts as a HTTP proxy to the Sitecore server, proxying incoming requests to Layout Service, and then rendering the resultant JSON to HTML before returning it. The app is heavily commented.

1. Create a production build of your app with `jss build`. Ensure that the `layoutServiceHost` in the app's `scjssconfig.json` is set to the hostname _of the `node-headless-ssr-proxy` proxy_ (not directly to Sitecore). For local testing, this would default to `http://localhost:3000`. In production, it would likely be something like `https://www.mysite.com`. It is also possible to make requests directly to Sitecore, if you do not wish to run everything through the reverse proxy. Proxying the data APIs has the advantage of allowing Sitecore to live behind a firewall.

1. Copy the production build artifacts from your app to the proxy (i.e. `/node-headless-ssr-proxy/dist/MyApp`). The path copied to should match the relative path that is set in the `sitecoreDistPath` config in the app's `package.json` file (`/dist/MyApp` in the previous example).

1. Open `/config.js` file and,
    * Set `bundlePath` to the path to your built JSS app's `server.bundle.js`, i.e. `'./dist/myappname/server.bundle'`
    * Set `apiHost` to your Sitecore instance host and the `apiKey` to your SSC API Key (see [server setup](/docs/getting-started/jss-server-install) if you don't have an API key yet)
    * Set `apiKey` to your Sitecore SSC API key
    * Set the dictionary service path in `createViewBag()` to your app's dictionary service URL. If you are not using dictionaries, you can remove the whole `createViewBag()` function, which enables dictionary caching.

    > NOTE: It is possible to configure these settings using environment variables as well, if that is preferable. This is great for containers and some PaaS hosts.

1. Open a command line in your `node-headless-ssr-proxy` folder, and run `npm install` then `npm start`.

  The console should show `server listening on port 3000!`.
  To test, browse to `http://localhost:3000/` and you should see the same app rendering now in the headless configuration.

## Tips & Tricks

### Media URLs in headless mode

The [Layout Service](/docs/fundamentals/services/layout-service) will return URLs to images with the Sitecore server URL included. For example:

* The Sitecore server is `http://siteco.re`
* An image in a media field, or a rich text field, would be returned something like `http://sitecor.re/-/media/jss.jpg`
* In headless mode if the proxy is `http://proxy`, what we really want is `http://proxy/-/media/jss.jpg` or even better, `/-/media/jss.jpg`

In headless mode it is possible to use the headless proxy without exposing the Sitecore server publicly, which makes media URLs that contain the Sitecore server URL problematic. It is easy enough to tell Sitecore to not include the server as part of media requests, however. Place the following contents in a _config patch_ file under `App_Config/Include/ADescriptiveName.config`:

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <layoutService>
      <configurations>
        <config name="jss">
          <rendering>
            <renderingContentsResolver>
              <IncludeServerUrlInMediaUrls>false</IncludeServerUrlInMediaUrls>
            </renderingContentsResolver>
          </rendering>
        </config>
      </configurations>
    </layoutService>
  </sitecore>
</configuration>
```

> NOTE: this configuration is appropriate for servers that run _headless mode_ or _integrated mode_ JSS sites - generally Content Delivery servers. Enabling this configuration will cause images to break when JSS sites are run in _connected mode_, as the images will be served as if local - so do not enable this for servers where development is occurring.
