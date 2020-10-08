---
name: javascript-rendering
routeTemplate: ./data/component-templates/article.yml
title: JavaScript Renderings
---

# Sitecore JavaScript rendering [Deprecated]

> This template is flagged as deprecated as of Oct 2020 because these rendering don't scale well. They satisfy edge-case requirements, and should generally be avoided.

This is a technique to allow JavaScript contents to render into a rendering added to a traditional Sitecore MVC page. Doing this allows embedding a JavaScript app within an existing Sitecore MVC site, as opposed to as its own standalone JSS site. This technique executes server-side rendering of the app and returns the rendered markup.

Compared to [Client-Side Embedding](/docs/techniques/mvc-integration/javascript-rendering), JavaScript Renderings have a different scope. With client embedding, a JSS app is embedded into a Sitecore MVC rendering, and rendered on the browser. JS renderings are pre-rendered on the Sitecore server (SSR) and serve working HTML at page load time, _however you cannot use them to host JSS apps_, because they are only provided with the data for their rendering. JavaScript renderings are also only compatible with Sitecore MVC, and will not work with Web Forms.

> Note: Please read the [important notes](#important-notes) section carefully to fully understand current limitations and potential pain points. It is important to understand that JS renderings are an alternate programming model from a JSS app. You cannot use JS renderings to place a regular JSS app within a Sitecore MVC rendering. This is because a JSS app is larger, full-layout-controlling app. A JS rendering is a piece within a Sitecore MVC site, and has the context of its datasource item not an entire layout.

## How it works

JSS allows creation of individual JavaScript renderings in Sitecore that will be rendered during MVC page execution, similar to a controller rendering or view rendering except rendered using JavaScript (Node.js). 

The JavaScript rendering definition asks you to specify a JavaScript module (CommonJS module) and an exported function within the module. For example, you might enter `/dist/jsrenderings/server.bundle.js` and `renderComponent` respectively.

> Note: JavaScript renderings are not limited to rendering frameworks that JSS supports; they are capable of executing any JavaScript that Node understands. This makes them useful for rendering anything JavaScript that supports server-side rendering.

When the rendering is being rendered, the Sitecore JavaScript render engine will use Node.js to load the module and invoke the exported function, passing in serialized data representing the rendering datasource / contents as well as various Sitecore context data. The result of the exported JavaScript function is raw HTML that will be rendered to the page along with HTML output from any other renderings assigned to the Sitecore item.

## Installation

* Follow the steps for [JSS Server Install](/docs/getting-started/jss-server-install)

## Getting Started

1. Create a JavaScript rendering in Sitecore
    * After installing the Sitecore JSS Server package, there will be a new rendering template available under `/sitecore/templates/JavaScriptServices` named `JavaScript Rendering`. Create a rendering item based on this template.

    * In the new rendering, specify the path to your server JavaScript file in the `Server Script Path` field. Note: this path is relative to the Sitecore web root.
        * For demo purposes, use `/dist/jss-component/sample.js`

    * In the `Exported Function Name` field, specify the name of the function that the server JavaScript exposes for invocation.
        * For demo purposes, use `render`

    * You can ignore `Client Script Path` and `Component Name` for this demo.

1. Assign the rendering to the presentation details of a MVC-based item.

1. Create a JavaScript module
    * Open a code editor and create a new JavaScript file named `sample.js`
    * Paste the following code:
    ```javascript
    module.exports = {
        render: (callback, data, viewBag) => {
            try {
                const parsedData = JSON.parse(data);
                const debug = `
                  <xmp>Component Name: ${parsedData.sitecore.rendering.name}</xmp>
                  <xmp>NODE_ENV output: ${process.env.NODE_ENV}</xmp>
                  <xmp>Rendering Data\n${JSON.stringify(parsedData, null, 2)}</xmp>
                  <xmp>Viewbag\n${JSON.stringify(JSON.parse(viewBag), null, 2)}</xmp>`;
              
                const html = `I was rendered by JavaScript! ${debug}`;
              
                callback(null, {
                    html,
                    status: 200,
                    redirect: null
                });
            } catch(e) {
                // important: ensure that all errors call the callback
                // and pass the first param (error) or the node process will hang
                // and you will be unhappy in powerful ways
                callback(e, null);
            }
        }
    };
    ```
    * This is a simple CommonJS module that exports a function named `render` accepting three arguments: `callback`, `data`, `viewBag`. This is the expected function signature for the Sitecore JavaScript rendering engine.  
    
    * Your rendering is expected to generate html and return that html via the `callback(error, result)` function. The callback function notifies the rendering engine that rendering is complete and provides the output of your rendering. The `callback` function takes two arguments - `error` and `result` - where `error` is a JavaScript Error object and `result` is an object containing the rendered HTML. Pass `null` for the unused parameter. `result` is a simple object with the following shape:
    
    ```js
    {
        html: '<p>hello world!</p>', // a string value containing the markup output of your rendering.
        status: 200, // HTTP status code to set - optional
        redirect: 'https://www.sitecore.com' // if set, causes a 302 redirect as the rendering result - status overrides the 302. Optional.
    }
    ```

1. Deploy module to Sitecore
    * Copy the file created in the previous step to `/dist/jss-component` in your Sitecore web root. This should match the `Server Script Path` specified in the JavaScript rendering you created previously.

You should now be able to browse to the item in which you added the JavaScript rendering and see a rendered `<h1 />` tag along with some JSON data. The `Rendering Data` output displays the format of the data passed as the `data` argument of the `render` method in the code. The `Viewbag` output displays the data as the `viewBag` argument of the `render` method.

## Rendering data

When the Sitecore JavaScript render engine invokes the exported function for the module defined in a JavaScript rendering, the function receives three arguments: `callback, data, viewBag`. This documentation section is intended to describe the `data` and `viewBag` arguments.

The general shape of the `data` argument is as follows:
```json
{
  "sitecore": {
    "rendering": {
      ...
    },
    "dataSource": {
      ...
    },
    "placeholders": {
      ...
    },
    "context": {
      ...
    }
  }
}
```

Each top-level property of the `data.sitecore` object is described below.

### `rendering`

This property is an object containing information about the Sitecore JavaScript rendering .

```json
"rendering": {
  "name": "TestRendering", // rendering item name
  "parameters": {}, // rendering parameters from the context rendering, serialized as a key/value dictionary
  "uid": "3096a357-b348-42e8-b6a7-60bef62931e5", // unique id of the context rendering from the context item presentation details
  "dataSource": "", // id of the datasource item assigned to the rendering (may be empty). This is the ID OF THE DATASOURCE ITEM, as opposed to the dataSource root property, which is the serialized datasource item fields.
  "componentName": "TestRendering" // value of the `Component Name` field in the JavaScript rendering item. if that field has no value, componentName will fall back to the rendering item name.
},
```

### `dataSource`

This property can be null or an object containing the output of the [rendering contents resolver](/docs/techniques/extending-layout-service/layoutservice-rendering-contents) assigned to the Sitecore JavaScript rendering.

Note: serialized field names will be returned with their letter case preserved, they are not automatically camelCased.

### `placeholders`

This property is an object containing the [layout service](/docs/fundamentals/services/layout-service) data for any placeholders set on the rendering item's `Layout Service Placeholders` field. The format of the `placeholders` object will match the format found in [route data for a JSS app](/docs/fundamentals/services/layout-service). You can use this to expose placeholders from within your JS rendering - for example, to embed Sitecore MVC or XSLT renderings _inside your JS rendering_.

### `context`

This property is an object containing various Sitecore context data:
```json
  "context": {
    "pageEditing": false, // is experience editor active
    "item": {
      "id": "75db0de9-5e31-4437-906a-2b4044f4a79c", // id of the context item
      "name": "BasicSample", // name of the context item
      "displayName": "BasicSample", // display name of the context item
      "version": 1, // version of the context item
      "database": "master", // database of the context item
      "language": "en", // language of the context item
      "templateId": "76036f5e-cbce-46d1-af0a-4143f9b557aa", // template id of the context item
      "templateName": "Sample Item", // template name of the context item
      "fields": { // serialized fields of the context item
        "Text": {
          "value": "<p>I am some text, who knows where I'll be rendered? Enigma wrapped in a mystery enshrouded by a riddle.</p>",
          "editable": "<p>I am some text, who knows where I'll be rendered? Enigma wrapped in a mystery enshrouded by a riddle.</p>"
        },
        "Title": {
          "value": "Components Page",
          "editable": "Components Page"
        }
      }
    },
    "site": {
      "name": "website" // context site name
    },
    "device": {
      "id": "fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3", // context device name
      "name": "Default" // context device id
    }
  }
```

You can add or remove context data by extending the `/sitecore/pipelines/getJsRenderingData` pipeline, either by adding your own processor or replacing or extending the existing `Sitecore.JavaScriptServices.ViewEngine.Pipelines.GetJsRenderingData.AddSitecoreContext` processor.

## ViewBag

By default, viewbag data contains the following:
```json
{
  "language": "en", // context language
  "httpContext": { // current HttpContext
    "request": {
      "url": "http://sc9-jss.local.net:80/basicsample", // HttpContextBase.Request.Url
      "path": "/basicsample", // HttpContextBase.Request.Path
      "querystring": {}, // HttpContextBase.Request.QueryString, serialized as a key/value dictionary
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" // HttpContextBase.Request.UserAgent
    }
  }
}
```

You can add or remove context data by extending the `/sitecore/pipelines/getRenderingEngineViewBag` pipeline, either by adding your own processor or replacing or extending the existing processors. It is important to note that this pipeline is shared between individual JavaSript module rendering and JSS app rendering, so be mindful of the data that are added to the viewbag. More information on extending the viewbag pipeline can be found [here](/docs/techniques/ssr/server-rendering-viewbag)


## Component Library

> We _strongly recommend_ that you bundle your JavaScript modules into a single module and use an exported factory function to determine which component to render based on the rendering definition passed to the factory function. More info on why in the [important notes](#important-notes) section.

We've provided a sample foundation for a React-based component library in the [samples repo](https://github.com/Sitecore/jss/tree/master/samples/sitecore-javascript-renderings)

1. `src/server.js` is the entry point for server-side rendering. The `renderComponent` function is exported and is the function we'll be specifying to be invoked in our Sitecore JavaScript renderings. The `renderComponent` function receives [rendering data](#rendering-data) and [viewbag data](#viewbag), parses the data for easier consumption by our components, and invokes `serverRenderer` with the data.

1. `src/boot/componentServerRenderer.js` is responsible for rendering a component to html using the `renderToString` method from `react-dom/server`. The server renderer function first uses the `componentFactory` to determine which component to render. This functionality is what allows us to use a single JavaScript module bundle for all of our components. The rendering data we receive from the JavaScript rendering engine contains the name of the component/rendering being rendered, so we can use that name to retrieve an actual React component instance and render the component using standard React methods.

1. `src/boot/componentFactory.js` is a simple `Map` allowing lookup of any known React component by name. The component factory acts as a registry for all known components in your library.

1. `src/boot/ServerHtml.js`. The `ServerHtml` component is a wrapper component that does a little dance so that our client script bundle can mount and re-hydrate our components in the browser. Basically, it wraps an actual component in a `<div />` and gives the `<div />` a unique id (the Sitecore rendering `uid`), then registers the component name, id and props data in a window object. While not ideal, we unfortunately need the wrapping `<div />` so that we have a DOM element to mount our component in when performing client-side rendering.

1. `src/client.js` is the entry point for client-side rendering. It iterates the window object where `ServerHtml` has registered rendered components, then uses `componentFactory` to get an instance of the registered component, then determines the DOM target element and component props data, then hydrates the SSR-rendered component. At this point, our client script bundle is responsible for managing the component based on client state changes.

At this point, run `jss deploy:watch` in the sample component library to build and deploy the server and client bundles to your Sitecore instance. By default, the bundles will be copied to `/dist/JssComponentsReactWeb` in your Sitecore webroot.

Now we need to create the corresponding Sitecore renderings and items.

1. Create a MVC-based item with two fields: `Title` (Single-Line Text) and `Text` (Rich Text). This item will be the page containing our JavaScript renderings. **NOTE**: The default _Sample Item_ template that Sitecore comes with satisfies these requirements. The out of the box `Home` item can be used here, as long as its layout is converted to MVC.

1. Sitecore JavaScript rendering. Just as we did in the [getting started](#getting-started) section, we need to a create Sitecore rendering for each component in our library. For the purposes of this demo, however, we'll only be creating a rendering for the `SampleRendering` component.

    * Create a rendering using the `JavaScript Rendering` template. For the purpose of this demo, give it a name of `SampleRendering`.

    * In the `Server Script Path` field, enter the following path: `/dist/JssComponentsReactWeb/server.bundle.js`. This is the path to our component library _server_ bundle.

    * In the `Exported Function Name` field, enter `renderComponent`. This the exported function from `src/server.js`.

    * In the `Client Script Path` field, enter `/dist/JssComponentsReactWeb/client.bundle.js`. This is the path to our component library _client_ bundle.

    * In the `Component Name` field, enter `SampleRendering`. This matches the key value specified in `src/boot/componentFactory.js`.

    * In the `Layout Service` template section (you may need to scroll down a ways), select `Context Item Resolver` in the `Rendering Contents Resolver` field. (more info on [rendering contents resolvers](/docs/techniques/extending-layout-service/layoutservice-rendering-contents))

    * Save.

1. Assign the rendering to the presentation details of the MVC-based item created previously.

1. In your MVC layout file (.cshtml), add the following code:

    ```html
    <!-- at the very top of the file -->
    @using Sitecore.JavaScriptServices.ViewEngine.Helpers

    <!-- just before the closing </body> tag -->
    <script src="/dist/JssComponentsReactWeb/vendor-client.bundle.js"></script>
    @Html.Sitecore().JavaScriptRenderingScripts()
    ``` 

    The `JavaScriptRenderingScripts` helper is an HtmlHelper extension defined in `Sitecore.JavaScriptServices.ViewEngine.Helpers.ScriptHelper, Sitecore.JavaScriptServices.ViewEngine`. The helper iterates all the JavaScript renderings in the context item and builds a unique list of all the `Client Script Path` field values from the renderings. The helper then generates `<script />` tags for each unique client script.

    You'll notice we also need to create a `<script />` tag for the `vendor-client.bundle.js`. This bundle is a result of using the webpack CommonsChunkPlugin and contains all third-party dependencies for our component library, e.g. `React`, `sitecore-jss`, etc... 

At this point, you should be able to browse to the item where you assigned your JavaScript renderings and see your components / renderings on the page.

#### Placeholder support

The sample component library comes with a `SamplePlaceholders` component that demonstrates exposing placeholders within a JS rendering. To try this example:

1. Register the `SamplePlaceholders` JS rendering with Sitecore, the same way as the `SampleRendering` component was in the previous example but with the different component name.
1. Create a placeholder settings item for the `js-rendering` placeholder that is exposed by the `SamplePlaceholders.js`. _Add at least one allowed rendering of any MVC type, including JS renderings, to the placeholder settings_.
1. Modify the `SamplePlaceholders` rendering item, and add the `js-rendering` placeholder settings to its `Layout Service Placeholders` field (scroll down to find it)
1. Add the `SamplePlaceholders` rendering to a page item's layout.
1. You should see an empty placeholder in the JS rendering that you can add other renderings to!

> **NOTE** JS renderings' placeholders _may_ contain non-JS rendering definitions (e.g. View Renderings, Controller Renderings, Method Renderings, XSLT Renderings, etc). There are two limitations to this technique:
> * The renderings must have a _single HTML root tag_ to work. For example, `<div>hello</div>` is fine, but `<div>hello</div><p>world</p>` is not.
> * You must add `json=false` to the _Rendering Parameters_ field on each native rendering definition item to allow it to render to HTML, instead of as JSON/layout service data.

#### Disconnected mode

The sample component library also has a disconnected mode that will render all components defined in the `componentFactory` to a single page (catalog) using static component data found in the `/data/component-content` folder of the sample library.

This mode allows you to use mock data to test your component rendering, in both server and client scenarios, without needing a Sitecore instance. You can modify styling for the component catalog via the `/assets/css/catalog-theme.css` stylesheet. Or, if you're feeling adventurous, modify the `build/create-static-index.js` file and add a reference to your own stylesheet. Or use one of myriad CSS-in-JS libraries for embedded style rendering.

> IMPORTANT: JS renderings in disconnected mode are for testing purposes only. They do not support the JSS import process that a JSS app would use, and the sample's disconnected data **does not** use the same format as a JSS app's disconnected data (it follows the shape of the rendering data described above instead).

#### Wrapping up

At this point, you should be able to create more React components in the sample component library, ensure they're mapped in the `componentFactory`, create rendering definitions in Sitecore, then add the renderings to pages.

## Important Notes

* Unlike a JSS app which renders the whole route/page, a JS rendering causes a Node invocation _for each JS rendering_ added to the Sitecore MVC layout. For example, if you had a very atomic layout with 50 renderings added, that would result in 50 separate Node invocations to render a page from Sitecore. With a JSS app, it is a single invocation because the whole layout is owned by JSS. This makes JS renderings appropriate when adding 1-2 micro JS apps to a larger traditionally rendered app. It is **not** designed to be a replacement rendering technology for Razor, and you will have decreased scalability if every rendering is a JS rendering.

* The JavaScript render engine creates one or more Node.js instances for each JavaScript module (based on module (file) path). Therefore, it is _highly recommended_ to use a single bundle of components that can be invoked with a factory function. Otherwise, each bundle will require its own Node instance(s) which can grow to unmanageable levels.

* When rendering individual JavaScript renderings, we use parts of Layout Service for resolving and serializing datasources as well as rendering placeholders. We use a separate [Layout Service named configuration](/docs/techniques/extending-layout-service/extending-layout-service-overview) for the individual JavaScript rendering process, named `jss-rendering`. This named configuration is set to use a "simple" placeholders resolver when rendering placeholders within individual JavaScript renderings. You can use [dynamic placeholders](/docs/techniques/dynamic-placeholders) as well, but you'll need to adjust the `<placeholdersResolver />` of the named configuration accordingly.

* Not all JavaScript can be rendered server-side. In other words, if your JavaScript module or any of its dependencies requires a browser in order to render, then it will not be able to render in a Node.js environment. You could perhaps use a Node.js browser shim as a workaround, but that will likely introduce overhead and complexity that will negatively impact rendering performance and provide questionable value.

* You and your DevOps / IT team have to be ok with Node.js running alongside Sitecore. That said, the Sitecore JavaScript rendering engine is very extensible and pluggable - meaning you _could_ replace the Node.js engine with something else that renders JavaScript.

* No WebForms. JavaScript renderings are only usable for Sitecore MVC-rendered items. This is not a caveat / limitation - don't use WebForms.

* There is currently no code-first tooling for individual components / renderings that exist outside of a JSS app.