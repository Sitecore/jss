---
name: layoutservice-extending-context
routeTemplate: ./data/component-templates/article.yml
title: Extending Layout Service Context
---

# Extending Context Data Returned by the Layout Service

In addition to returning the name, fields, and placeholders/renderings of the requested item, the Layout Service output also contains a `context` property. Like `Sitecore.Context` in .NET-based Sitecore development, this property can be used to provide data on cross-cutting concerns and other information derived from the HTTP Context, such as the current site context and page mode. It's also useful for providing data for statically placed components on a page, i.e. those not managed through a `Placeholder` and Sitecore layout, such as header and footer navigation.

Out of the box, JSS includes the following properties in the `context`:

* `pageEditing` - Provided by Layout Service, a boolean indicating whether the route is being accessed via the Experience Editor.
* `pageState` - Like `pageEditing`, but a string: `normal`, `preview` or `edit`.
* `site` - Provided by Layout Service, an object containing the `name` of the current Sitecore site context.

You can enable/disable the out of the box properties and add your own data to the `context` via the `getLayoutServiceContext` pipeline provided by the Layout Service.

### Context Extension performance considerations

When creating custom Context Extensions be careful about their performance as they don't have the same caching options as e.g. JSON Renderings, Sublayouts etc. (`Vary by data / Vary by user / ...`). If your custom extension is slow or performs a lot of API calls / item reads you will find this slow performance is visible on every page load where the extension is activated.

If you want to share content between multiple pages e.g. header and footer content, consider either using GraphQL and caching the data at the client or in your delivery application implement your own data cache and eviction policy per Context Extension.

## Extending the getLayoutServiceContext Pipeline

### Create your Processor

You'll want to extend the `JssGetLayoutServiceContextProcessor` base provided by JSS, unless you truly wish to make your extension available to consumers of Layout Service outside of JSS, in which case you can implement the `Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext.IGetLayoutServiceContextProcessor` interface.

The JSS base class gives you the ability to configure the Layout Service configuration, JSS app(s), and JSS route(s) for which the processor should execute.


```csharp
public class ExampleContextExtension : Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext.JssGetLayoutServiceContextProcessor
{
    public ExampleContextExtension(IConfigurationResolver configurationResolver) : base(configurationResolver)
    {
    }

    protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
    {
        args.ContextData.Add("securityInfo", new
        {
            isAnonymous = !Sitecore.Context.User.IsAuthenticated
        });
    }
}
```

### Patch and Configure your Processor

Create a configuration patch for your processor, and configure the app(s) and/or route(s) for which the processor should execute, as demonstrated below.

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <pipelines>
      <group groupName="layoutService">
        <pipelines>
          <getLayoutServiceContext>
            <processor type="SitecoreJss.Examples.ExampleContextExtension, SitecoreJss.Examples" resolve="true">
              <AllowedConfigurations hint="list">
                <!-- Unless you change the Layout Service config used by your JSS app, this should always be present. -->
                <jss>jss</jss>
              </AllowedConfigurations>
              <Applications hint="list">
                <!-- Restrict the JSS apps for which this processor will execute. -->
                <reactApp>JssReactWeb</reactApp>
              </Applications>
              <Routes hint="list">
                <!-- Restrict the route items for which this processor will execute. IDs, item paths, and wildcard item paths are allowed. -->
                <services>/sitecore/content/JssReactWeb/Home/Services*</services>
                <portfolio>{BAD2C001-1746-4312-8422-B28806A1191E}</portfolio>
              </Routes>
            </processor>
          </getLayoutServiceContext>
        </pipelines>
      </group>
    </pipelines>
  </sitecore>
</configuration>
```

### Confirm Output via the Layout Service

http://JssReactWeb/sitecore/api/layout/render/jss?item=/Services&sc_apikey={YOUR_API_KEY}

```json
"context": {
    "securityInfo": {
        "isAnonymous": true
    },
    "pageEditing": false,
    "site": {
        "name":"JssReactWeb"
    },
    "navigation": [
        {
            "name":"Home",
            "path":"/",
            "children": [
                {
                    "name":"About",
                    "path":"/about"
                },
                {
                    "name":"Portfolio",
                    "path":"/portfolio"
                },
                {
                    "name":"Services",
                    "path":"/services"
                }
            ]
        }
    ]
}
```
