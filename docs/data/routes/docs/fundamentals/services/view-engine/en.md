---
name: view-engine
routeTemplate: ./data/component-templates/article.yml
title: JSS View Engine/SSR
---

# Server-Side JavaScript rendering

Server-side JavaScript rendering enables execution of the same JS application you run in dev but now within the Content Management environment running a full Sitecore instance. Rendering is performed by a rendering engine.

Sitecore provides 2 implementations of a rendering engine:
- nodejs (enabled by default)
- http (available only in Sitecore 9.1.1 and later)

You can [configure a rendering engine per JSS app](/docs/fundamentals/services/app-configuration) by using the `serverSideRenderingEngine` attribute. 

> If you are using SXA you can configure a rendering engine in the settings of your JSS tenant. There is an "Server side rendering engine" field for that.

# Node.js rendering engine

Node.js view engine uses a `node.js` instance (running on your Content Management server) to server-side render your app.

This is made possible thanks to extensible ASP.NET and Sitecore MVC infrastructure allowing for custom JavaScript renderers to be plugged in, which hand-off the JS bundle and Layout Service output to `node.js` via ASP.NET NodeServices:

```javascript
{
  "name": "home",
   ...
  "placeholders": {
    "name": "main",
    "path": "main",
    "elements": [
      {
        "componentName": "Welcome",
        ...
        "contents": {
          "Text": {
            "value": "World"
          },
          "Title": {
            "value": "Hello"
          }
        }
      }
    ]
  }
}
```

The returning HTML string from `node.js` is returned back in response.

This is how the whole mechanism works in a nutshell.

![Server-side JavaScript rendering](/assets/img/server-side-rendering.png)

The page-level items that correspond to the route are expected to have a conventional presentation details set on them:

![Layout details as normal](/assets/img/layout-details.png)

The `JSS App` layouts are used simply as indicators of JavaScript-based rendering, and point at an empty Razor view. The `WelcomeRendering` is a real Sitecore rendering item of a new type `React JavaScript Rendering` that is defined as usual under `/sitecore/layout/renderings`.

Each configured `<app />` will receive its own `node.js` engine instance, allowing the applications to run in isolation.

By default, an exported `renderView` function in your app's server bundle is invoked to produce the static rendering of your application. Note that data passed into this function is "double encoded" in order to preserve JSON formatting, and you must  `JSON.parse()` it before use.

> "Mixed-mode" rendering is possible with JSS from two perspectives. You can embed JSS applications in the layout of a standard Sitecore MVC page by use of the `EmbeddedJsApp` rendering. You can also place any Sitecore rendering in a JSS route and utilize the serialized output of its datasource. You can also place a `json=false` rendering parameter on any MVC-compatible rendering used in a JSS route to get its rendered HTML output.

## Pros and cons of Node.js rendering engine

*Pros*

- Simple setup - just install `node.js` on Sitecore server
- No need to manually manage `node.js` instances
- Built-in pooling

*Cons*

- Difficult to customize `node.js` startup, e.g profiling, debugging
- Limited control over pooling / clustering
- Need to install `node.js` on Sitecore servers
- JSS app artifacts need to be deployed to Sitecore server

# Http rendering engine

Http rendering engine uses a remote `node.js` instance, also known as a rendering host. The communication between Sitecore Content Management instance and a rendering host is performed via a http call. In such a setup, `node.js` and JSS app artifacts do not need to be deployed to the Content Management server.

## How to use

To configure a http rendering engine you need to make some changes in both client-side and server-side of your JSS app.

### Client-side setup

The React sample app implementation provides an [example](https://github.com/Sitecore/jss/tree/dev/samples/react) of a rendering host setup. 

To run the rendering host:
1. Update the `tunnelUrl` setting in the `packages.json` file. It should point to a URL of your rendering host (can be local or remote url). For local testing you can set it to "http://localhost:5000". This URL is needed at build time to replace all static asset urls (such as images, javascript and css files) to become absolute instead of relative. This ensures that static assets are rendered properly by a remote Sitecore instance, since they are not deployed to Sitecore servers anymore.
2. Run `npm run build:rendering-host` command. This will build an app for the rendering host and place it into the */build* folder. This build is not much different from the default `build` command: the only difference is that `build:rendering-host` is replacing static asset URLs to be absolute based on `tunnelUrl` setting.
3. Run `npm run start:rendering-host` command. This will run a rendering host instance on http://localhost:5000 (default) and start a [Ngrok tunnel](https://ngrok.com/). The tunnel will expose your local rendering host to an outside world via a public HTTP endpoint. This can be useful when you want to render your JSS app in Experience Editor of a remote Sitecore instance for testing purposes (for example when you are working on a new feature).

### Server-side setup

Update your [JSS app configuration](/docs/fundamentals/services/app-configuration):
1. Set `serverSideRenderingEngine` to `http`
2. Set `serverSideRenderingEngineEndpointUrl` to point to your rendering host URL (e.g http://localhost:5000)

> Note: the URL of a rendering host can also be set dynamically via the `sc_httprenderengineurl` query string parameter.
For this to work, ensure that `<AllowOptionsOverride>true</AllowOptionsOverride>` is set to `true` in your http rendering engine configuration (*\App_Config\Sitecore\JavaScriptServices\Sitecore.JavaScriptServices.ViewEngine.Http.config*).

After this change Sitecore will start using your remote rendering host for SSR.

## Pros and cons of Http rendering engine

*Pros*

- Node.js is not needed on Sitecore server, you choose where to host the rendering host
- JSS app artifacts do not need to be deployed to Sitecore server
- Full control over Node.js management: startup, pooling, clustering, profiling, debugging, etc.
- With the help of tunneling software like [Ngrok](https://ngrok.com/), frontend developers are able to test Experience Editor integration by using their local JSS apps for SSR. This is possible by dynamically setting the rendering host URL in Experience Editor with the help of the `sc_httprenderengineurl` query string parameter.

*Cons*

- You need to control the rendering host yourself and ensure it is "awake" and always available

