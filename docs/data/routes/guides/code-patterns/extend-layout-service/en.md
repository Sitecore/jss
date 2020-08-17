---
name: extend-layout-service
routeTemplate: ./data/component-templates/guide.yml
title: Extend Layout Service
---

JSS components are hydrated with dynamic data from the Layout Service output, which can be customized by developers to fulfill various business requirements. Two popular techniques for augmenting Layout Service output from the Sitecore side are [extending Sitecore Context](/docs/techniques/extending-layout-service/layoutservice-extending-context) and [using Rendering Contents Resolvers](/docs/techniques/extending-layout-service/layoutservice-rendering-contents#choose-or-configure-a-builtin-rendering-contents-resolver).

---

## Extending Sitecore Context
On the front-end, `Sitecore Context` is available to all components. Extending `Sitecore Context` is best for data that represents global application state (`isUserLoggedIn`, `currentLanguage`, etc).

### Security considerations

It's important to remember that Layout Service output is not secure, and can be inspected client-side. Treat it like an open API, ensuring you are not exposing sensitive or excess data.

When extending `Sitecore Context`:
- Only add specific fields that are needed for front-end components. (i.e. Do not inject the entire Sitecore Context object from backend Sitecore pipelines into the Layout Service response)
- Add data that represent global app state and needs to be accessed by multiple components
- Avoid exposing sensitive information (Ex. Be aware of serialization depth to avoid accidentally exposing extra data via complex objects)

### Community References
[Gary Wenneker's blog - Extending the Layout Service](https://gary.wenneker.org/sitecore-jss-extending-the-layout-service/)

---

## Rendering Contents Resolvers
Rendering Content Resolvers are applied to components on a component by component basis. This option is best for encapsulating data that is specific to one or a small set of components.

### OOTB Resolvers
JSS provides 5 resolvers out of the box

  > Relevant definitions:
  > - The `context item` is usually the current page
  > - The `datasource` is the item populating data for the current component.

* `Datasource Resolver` - This is the default and serializes your data source.
* `Datasource Item Children Resolver` - Serializes the children of the data source, excluding itself.
* `Context Item Resolver` - Serializes the context item.
* `Context Item Children Resolver` - Serializes the children of the context item.
* `Folder Filter Resolver` - Serializes the descendants of a datasource, excluding folders (because of the Item Selector Query: .*[@@templateid!=‘{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}’])

### Custom Resolvers

The use case for creating a custom Content Resolver would be when the default 5 resolvers are not suitable for your needs and there is a need to change the way data is serialized and returned from the Layout Service for a few renderings. This is not suitable if too many renderings have to utilize Custom Content Resolver.
 
If the application contains custom Content Resolvers, check that all resolvers
- Do not expose sensitive information
 
 
The Custom Content Resolvers can only be used in Connected mode. In Disconnected mode can also be achieved using a different approach by modifying the disconnected-mode-proxy.js -  [https://www.coreysmith.co/jss-extend-layout-service-rendering-data/](https://www.coreysmith.co/jss-extend-layout-service-rendering-data/) 
 
Also, any data you return through a CCR is going to be output in the fields property of your rendering. If you wish to modify something in the root of the rendering, CCR is not suitable.
 
Every rendering in your application can use a different CCR. If you want the Add ATLSUG Members field to apply to any rendering, you’ll have to:
 
* Create a custom implementation of RenderingContentsResolver, e.g., AtlSugMembersRenderingContentsResolver.
* Update the Type field of all five of the RCRs listed above with your new type, plus any other custom RCRs in your solution.
* Add all five of the out-of-the-box RCRs listed above into source control.
 
Now what if you want to add another customization, like Add Queen City SUG Members? You’ll have to extend AddAtlSugMembersRenderingContentsResolver and repeat the process above.
 
When creating a custom resolver there are two options to do it. You can choose to implement the IRenderingContentsResolver interface and build the implement the logic yourself or inherit from the RenderingContentsResolver class. 
The second one is great as it has some methods to override which are useful when you want to resolve items from elsewhere in the content tree.
 
In case you need to change many renderings and add more complicated customizations of the Layout Service, a better approach is to apply a global Layout Service Configuration -  [https://gary.wenneker.org/sitecore-jss-using-a-custom-layout-service-configuration/](https://gary.wenneker.org/sitecore-jss-using-a-custom-layout-service-configuration/) 
 

#### Sample customizations

From  [http://joost-sitecore.blogspot.com/2020/01/sitecore-jss-layout-service-extensions.html](http://joost-sitecore.blogspot.com/2020/01/sitecore-jss-layout-service-extensions.html) 

* Custom Descendants resolver
The default content resolver in the JSS version we used only returned the specific datasource item a rendering has with its fields. We were looking for a solution that the content resolver would return the entire content tree of this datasource item, so including all descendants of that item. This for all kinds of purposes. You can find the code sample  [here](https://gist.github.com/djewst/91f217b1724628f43ff4b021b2b41f60) .
 
* Custom GraphQL extension resolver
For some renderings, we wanted the option to give the content editor to add a random piece of content that might be defined somewhere else on the site. For this we created an extension that allows, for a specific place in this component, to configure a custom GraphQL query to grab a piece of content and display it. This extension reuses the existing GraphQL fields that every JsonRendering has out of the box. You can find the code sample  [here](https://gist.github.com/djewst/e2c8a00bccf85747e16917fd2ccd4ce5) .

---

## Extending Sitecore Context Client-Side

The script that initializes the Sitecore Context is a singleton that lives in your JSS app, not in the base JSS modules. So plugging in a custom version of Sitecore Context that extends the base class is straightforward. See `/src/lib/SitecoreContextFactory.js` in the React starter.

---

## Other Methods of Extending Layout Service Output
- Integrated GraphQL 

---

## Extending Layout Service  in Disconnected Mode

Check out ["Adding Content Items to Sitecore JSS Disconnected Layout Service Context With customizeContext"](https://www.adamlamarre.com/adding-content-items-to-sitecore-jss-disconnected-layout-service-context-with-customizecontext/) by [Adam Lamarre](https://twitter.com/erzr)