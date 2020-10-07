---
name: layout-service
routeTemplate: ./data/component-templates/guide.yml
title: Layout Service Customization Guide
---

> Tip: A reference of the Layout Service request model properties is documented in Sitecore Headless Development documentation - ["Sitecore Layout Service"](https://doc.sitecore.com/developers/100/developer-tools/en/sitecore-layout-service.html)

---

## When to customize Layout Service output

JSS components are hydrated with dynamic data from the Layout Service output, which can be customized by developers to fulfill various business requirements. The OOTB techniques for augmenting Layout Service output are
1. [Extending Sitecore Context](/docs/techniques/extending-layout-service/layoutservice-extending-context)
2. [Using Rendering Contents Resolvers](/docs/techniques/extending-layout-service/layoutservice-rendering-contents#choose-or-configure-a-builtin-rendering-contents-resolver)
3. [Using Integrated GraphQL](/docs/techniques/graphql/integrated-graphql)
4. [Using Connected GraphQL](/docs/techniques/graphql/connected-graphql)

### Security considerations

Layout Service output is not secure, and can be inspected client-side. Treat it like an open API, ensuring you are not exposing sensitive or excess data.

When extending `Sitecore Context` or building custom `Rendering Content Resolvers`:
- Only add specific fields that are needed for front-end components. (Ex. Do not inject the entire Sitecore Context object from backend Sitecore pipelines into the Layout Service response)
- Add data that represent global app state and needs to be accessed by multiple components
- Avoid exposing sensitive information (Ex. Be aware of serialization depth to avoid accidentally exposing extra data via complex objects)

---

## Extending Sitecore Context

Layout Service provides data about the `Sitecore Context` that a component is rendering in. On the front-end, `Sitecore Context` is available to all components. Extending `Sitecore Context` is great for data that represents global application state like `isUserLoggedIn` or `currentLanguage`.

### Extending Sitecore Context in Disconnected Mode

Community Guide
- ["Adding Content Items to Sitecore JSS Disconnected Layout Service Context With customizeContext"](https://www.adamlamarre.com/adding-content-items-to-sitecore-jss-disconnected-layout-service-context-with-customizecontext/) by [Adam Lamarre](https://twitter.com/erzr)


---

## Rendering Contents Resolvers
Layout Service provides data to components that's necessary for their rendering. By default, Layout Service provides values defined by Content Authors for the component's fields (i.e. fields on its data source). Sometimes, components need dynamic data to render. For example, a "Navigation" component may generate its markup based on child pages created by Content Authors. `Rendering Content Resolvers` are used to customize the data for individual components. This option is best for encapsulating data that is specific to one or a small set of components.

### OOTB Resolvers
JSS provides 5 resolvers out of the box
* `Datasource Resolver` - This is the default and serializes your data source.
* `Datasource Item Children Resolver` - Serializes the children of the data source, excluding itself.
* `Context Item Resolver` - Serializes the context item.
* `Context Item Children Resolver` - Serializes the children of the context item.
* `Folder Filter Resolver` - Serializes the descendants of a datasource, excluding folders (because of the Item Selector Query: .*[@@templateid!=‘{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}’])

> Definitions:
> - The `context item` is (usually) the current page
> - The `datasource` is the item populating data for the current component.

### Building Custom Resolvers

The use case for creating a custom Content Resolver would be when the default 5 resolvers are not suitable for your needs and there is a need to change the way data is serialized and returned from the Layout Service for a few components. 
 
### Community Guides

- [Extending the Layout Service](http://gary.wenneker.org/sitecore-jss-extending-the-layout-service/) by [Gary Wenneker](https://twitter.com/GaryWenneker).

- In case you need to change many renderings and add more complicated customizations of the Layout Service, a better approach is to apply a global Layout Service Configuration. [Sitecore JSS: Using a custom Layout Service configuration](http://gary.wenneker.org/sitecore-jss-using-a-custom-layout-service-configuration/) by [Gary Wenneker](https://twitter.com/GaryWenneker).
 

### Sample implementations

Combining integrated GraphQL and Rendering Contents Resolver output

- Custom Descendants resolver: gets descendant items of the context item's data source. [JSS and arbitrary item hierarchies](https://joost-sitecore.blogspot.com/2020/01/sitecore-jss-layout-service-extensions.html) by [Vitalii Tylyk](https://twitter.com/vitalii_tylyk). (This post also shows a sample of solving this scenario with Integrated GraphQL).

 
- Custom resolver that enables using both, an `Integrated GraphQL` query and a `Rendering Content Resolver` in the same component (by default you can only use one or the other). [Combining integrated GraphQL and Rendering Contents Resolver output](https://blog.vitaliitylyk.com/combining-integrated-graphql-and-rendering-contents-resolver-output/) by [Vitalii Tylyk](https://twitter.com/vitalii_tylyk).

---

## Other Customization Methods

### Alternative method to extend Layout Service data

["Sitecore JSS - Extend Layout Service Rendering Data"](https://www.coreysmith.co/jss-extend-layout-service-rendering-data) by [Corey Smith](https://twitter.com/sitecorey)

### Extend Sitecore Context from the JSS app

The `SitecoreContextFactory` stores the Sitecore context for the app. The script that initializes the `SitecoreContextFactory` singleton lives in your JSS app, not in the base JSS modules (See [`/src/lib/SitecoreContextFactory.js`](https://github.com/Sitecore/jss/blob/dev/samples/react/src/lib/SitecoreContextFactory.js) . So a custom version of `SitecoreContextFactory` that extends the base class can be plugged in here.

---

## Customize Layout Service response via dataApi options

Refer to [Customizing route handling: Using the `querystringParams` option](/guides/code-patterns/routing#customizing-route-handling)
