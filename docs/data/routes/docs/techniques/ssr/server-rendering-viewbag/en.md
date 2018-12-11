---
name: server-rendering-viewbag
routeTemplate: ./data/component-templates/article.yml
title: Server Rendering View Bag
---
# Adding Data to Server Rendering View Bag

When operating in Integrated mode, i.e. [server-side rendering](/docs/techniques/ssr/integrated-mode-ssr) via Sitecore, JSS invokes a `renderView` function exposed by your app's server bundle.

```javascript
export const renderView = (callback, path, data, viewBag) => { ... }
```

The primary model/data passed into this function in the `data` argument is the output of the Layout Service, containing route and context data. This allows the app to initialize and render without a REST call, allowing for server-side rendering.

If your application requires additional data for server-side rendering, the `viewBag` argument can be populated with additional data via the `getRenderingEngineViewBag` pipeline. By default, JSS includes the rendered item's language (`viewBag.language`) and the application's translation dictionary (`viewBag.dictionary`) to facilitate server-side rendering of dictionary items.

## Extending the getRenderingEngineViewBag Pipeline

### Create your Processor

```csharp
public class AddExampleData : IGetRenderingEngineViewBagProcessor
{
    public void Process(GetRenderingEngineViewBagArgs args)
    {
        // would be accessible in renderView as viewBag.hello
        args.ViewBag.hello = "world";
    }
}
```

### Patch in your Processor

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <pipelines>
      <group groupName="javaScriptServices">
        <pipelines>
          <getRenderingEngineViewBag>
            <processor type="SitecoreJss.Examples.AddExampleData, SitecoreJss.Examples" />
          </getRenderingEngineViewBag>
        </pipelines>
      </group>
    </pipelines>
  </sitecore>
</configuration>
```

### Do Something with your Data in renderView

> Note that both the `data` and `viewBag` arguments receive JSON data as strings, since JSS "pre-encodes" them before they are passed through Microsoft JavaScriptServices, in order to control the JSON serialization process.

```javascript
const renderView = (callback, path, data, viewBag) => {
  data = JSON.parse(data);
  viewBag = JSON.parse(viewBag);

  //console output server-side will be routed to Sitecore logs
  console.log(`Hello ${viewBag.hello}`);

  // ...
}
```

```
5836 14:59:33 INFO  Hello world
```