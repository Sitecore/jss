---
name: layoutservice-rendering-contents
routeTemplate: ./data/component-templates/article.yml
title: Extending Rendering Contents
---

# Customizing Layout Service Rendering Output

By default, when serializing a rendering to JSON, the Layout Service will populate the rendering contents with the fields of the rendering's datasource item. You may have occasions where you would like to output something else, such as:

* Data from the context item
* Data from datasource or context item children
* Data from other items altogether
* A more limited view of any of the above, to avoid over-fetching unneeded data
* A calculated or otherwise more complex value
* Non-item data, such as information from xDB
* Non-Sitecore data from external systems

JSS and the Layout Service provide three options for customizing this output.

## Use JSS GraphQL Support

[JSS GraphQL](/docs/fundamentals/services/graphql) allows client code to have full control of the fetched data for a rendering, and the GraphQL schema can be extended with custom and even non-Sitecore data. When using *integrated* GraphQL, the data returned by the Layout Service for a component can be customized via a GraphQL query, which can be provided code-first or Sitecore-first. When using *connected* GraphQL, the Layout Service no longer returns any serialized fields, and the component's client code can specify the GraphQL query it requires to render.

See [Using GraphQL with JSS](/docs/fundamentals/services/graphql) for more information.


## Choose or configure a builtin Rendering Contents Resolver

JSS allows you to configure a *Rendering Contents Resolver* on each rendering, which determines how a rendering and its associated data are serialized. Rendering Contents Resolvers are configured in */sitecore/system/Modules/Layout Service/Rendering Contents Resolvers*. By default, JSS provides:

* *Datasource Resolver* - The default behavior, serializes the rendering's datasource item
* *Datasource Item Children Resolver* - Serializes the children of the datasource item
* *Context Item Resolver* - Serializes the context item instead of the datasource item
* *Context Item Children Resolver* - Serializes the children of the context item
* *Folder Filter Resolver* - Serializes the descendents of the datasource item, excluding folders

You can create your own configuration in the above folder using the available parameters:

* *Type* - This should be `Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver, Sitecore.LayoutService`, unless creating your own implementation (see below).
* *Include Server URL in Media URLs* - This should always be checked, unless you are running your app in *Integrated* mode exclusively.
* *Use Context Item* - Use the context item instead of the datasource item.
* *Item Selector Query* - Provide a Sitecore query to customize the serialized items. This will be relative to the datasource and/or context item, depending on the selection above. **Be careful** with this parameter, as it is easy to create Sitecore queries with severe negative performance impact.
* *Parameters* - Provide arbitrary parameters. These are not used by default, but potentially useful when creating your own implementation (see below).


## Create an IRenderingContentsResolver

The Layout Service allows full customization of the contents of a serialized rendering via the `IRenderingContentsResolver` interface. You can override the default `IRenderingContentsResolver` on a rendering by creating your own implementation and creating a *Rendering Contents Resolver* item, as described above, specifying your custom *Type*. The fields of the object returned by your implementation can then be bound to your JSS components as if they were item content (i.e. `props` in React).

### Create your Implementation

```csharp
public class ExampleRenderingContentsResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.IRenderingContentsResolver
{
    public bool IncludeServerUrlInMediaUrls { get; set; }
    public bool UseContextItem { get; set; }
    public string ItemSelectorQuery { get; set; }
    public NameValueCollection Parameters { get; set; }

    public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
    {
        //if you want to access the datasource item
        var datasource = !string.IsNullOrEmpty(rendering.DataSource)
            ? rendering.RenderingItem?.Database.GetItem(rendering.DataSource)
            : null;

        return new
        {
            name = datasource.Name,
            date = DateTime.Now,
            hello = "world"
        };
    }
}
```


## Why not a separate REST endpoint?

For some of the scenarios above, you could indeed create a separate REST endpoint to access the needed data. However, the techniques above offer a number of advantages:

* Avoids additional HTTP roundtrip(s)
* Automatically binds the data to component
* Makes the data available for server/universal rendering
* Easier to query additional data related to the current application, context item (route), or datasource item

## Why not extend the Layout Service context data?

There is some overlap between potential uses, but [extending the context](/docs/techniques/extending-layout-service/layoutservice-extending-context) is generally intended for cross-cutting information that may be used in multiple components, or for providing data for statically placed components not managed within a `Placeholder`. These approaches also ensure the data is made available when, and only when a content author utilizes that rendering within a route.

## Limitations

* You can mock values from a custom Rendering Contents Resolver configuration or implementation in your disconnected/dev route data, but they cannot be imported. Thus this is primarily a *Sitecore-first* approach. Consider using GraphQL for a code-first approach.
* Values from a custom `IRenderingContentsResolver` implementation cannot be edited in the Experience Editor.