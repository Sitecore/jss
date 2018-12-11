---
name: integrated-mode-ssr
routeTemplate: ./data/component-templates/article.yml
title: Integrated Mode SSR
---

# Server-Side Rendering in Integrated Mode

When running in [integrated mode](/docs/fundamentals/application-modes), JSS applications are rendered using a Node server before being provided to the client. This takes the form of a JSS rendering engine that runs on the Sitecore server and provides rendering services for your JSS application.

> SSR is an essential component of Integrated Mode, as it is required for Experience Editor to operate. Experience Editor relies on being able to find the rendered markup of new components being added to the page when it prerenders them, and without SSR this will not operate correctly.

When using the JSS rendering engine for server-side rendering, there are specific things you must do:

### Export `renderView` function

The JSS rendering engine expects your app to export a global function named `renderView` with the following signature: `renderView(callback, routePath, data, viewBag)`

This function is invoked by the JSS rendering engine when a route using the JSS rendering engine is served.

For an example of how to declare this function in your code, see the `server/server.js` file in any sample app.

### Webpack library target

In order for the JSS rendering engine to invoke the `renderView` function your app exports, you _must_ set the `output.libraryTarget` of your webpack bundle to `'this'`. [Webpack docs](https://webpack.js.org/configuration/output/#output-librarytarget)

```javascript
{
  output: {
    libraryTarget: 'this' //required for use with JSS rendering engine
  }
}
```