---
name: view-engine
routeTemplate: ./data/component-templates/article.yml
title: JSS View Engine/SSR
---

# Server-Side JavaScript rendering

Server-side JavaScript rendering enables execution of the same JS application you run in dev but now within Content Management environment running full Sitecore instance.

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