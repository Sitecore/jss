---
name: layoutservice-static-context-rendering
routeTemplate: ./data/component-templates/article.yml
title: Layout Service Static Context Rendering
---

# Using Layout Service Static Context Rendering

Static Context Rendering is a powerful advanced technique that is great for complex global headers and footers. It is a specific use of [Extending Route Context Data](/docs/techniques/extending-layout-service/layoutservice-extending-context). Using this technique, the layout service output of _static items_ (i.e. a route item with layout called 'navigation') is injected into the layout service context for every route on a JSS app, including 404 pages. This technique essentially involves composing your page from _multiple_ Sitecore layout definitions - a layout for your header from a static item, a layout for your content from the current route item, and a layout for your footer from another static item.

So why would you want this? In a word, personalization. When driving your header and footer using static layouts, you can share the layout and personalization rules set on that layout _on every route_ at the same time. If you instead added a navigation component to the layout of each route, any personalization would have to be applied on a per-route basis.

JSS comes with a `RenderStaticItemProcessor` class which is not enabled by default that allows the injection of static layout. To use it, there are a number of steps that need to be completed. Note that this guide is written from a Sitecore-first perspective.

## Creating your static rendered item

To get started, you need an item to render the layout of. The simplest way to do this is to create a _route_ item - it already has the right layout, and will render correctly for Experience Editor.

![route item](/assets/img/static-rendering-route.png)

In order to create the layout on this item, you will need to also create a new placeholder, i.e. `jss-header`:

* Create new component(s) that can be added to the header, such as `Navigation Item`. All JSS component features are supported, including placeholder nesting and [Integrated GraphQL](/docs/techniques/graphql/integrated-graphql).
* Create a placeholder settings item in `/sitecore/layout/Placeholder Settings`
* Add the allowed component(s) to the placeholder settings item
* Add the placeholder settings item to the `Layout Service Placeholders` field on your JSS app's _layout item_ (in `/sitecore/layout/Layouts/JavaScriptServices`)
    ![setting LS placeholders field](/assets/img/static-rendering-ls-placeholders.png)

## Adding the static rendering to Layout Service context

The process of rendering a static layout into the LS context is fairly simple. A _pipeline processor_ is added into the `getLayoutServiceContext` pipeline, just like in [Extending Route Context Data](/docs/techniques/extending-layout-service/layoutservice-extending-context). This processor defines the item path (or ID), the name of the JS property to set, and can filter whether it applies or not by JSS app name, LS config name, or route path.

To use the following example, copy it to a file in `App_Config/Include/*.config` under your Sitecore installation.

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <pipelines>
      <group groupName="layoutService">
        <pipelines>
          <getLayoutServiceContext>
            <processor type="Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext.RenderStaticItemProcessor, Sitecore.JavaScriptServices.ViewEngine" resolve="true">
              <!-- the path or ID of the Sitecore item to render into the LS context -->
              <Item>/sitecore/content/JssReactWeb/home/navigation</Item>
              <!-- name of the JS property to put the layout into on the context; for example 'navigation' adds it to 'sitecore.context.navigation' in the LS JSON -->
              <ContextKey>navigation</ContextKey>
              <!-- optionally you can scope the rendering to a specific JSS app by name. This is usually a good idea, especially in multi-tenant Sitecore installs. -->
              <Applications hint="list">
                <app id="1">JssReactWeb</app>
              </Applications>
              <RunWhenNoItemResolved>true</RunWhenNoItemResolved>
            </processor>
          </getLayoutServiceContext>
        </pipelines>
      </group>
    </pipelines>
  </sitecore>
</configuration>
```

With this config patch installed, you should be able to inspect a Layout Service request and see the new context key being added. You should also see an empty array of components in your new placeholder:

```json
{
  "sitecore": {
    "context": {
      ...
      "navigation": {
        "sitecore": {
          "route": {
            "name": "navigation",
            ...
            "placeholders": {
              "navigation": []
            }
          }
        }
      }
    }
  }
}
```

At this point we can define a layout, but to support Experience Editor we will need to add the placeholder to the JSS app so we can edit the components in it.

## Implementing a conditionally editable placeholder

The placeholder for a static rendering can use the exact same JSS `Placeholder` helper component that a route-based placeholder would use. When adding the static placeholder to your JSS app code, it's important to be aware of these considerations:

* The placeholder component will need to be passed the Sitecore Context data (each app's styleguide has an example of doing this), and will need to have the static context key passed in as the placeholder's data source. Here is an example of doing this in React:

    ```jsx
    import React from 'react';
    import {
      withSitecoreContext,
      Placeholder,
    } from '@sitecore-jss/sitecore-jss-react';

    const StaticPlaceholder = ({ sitecoreContext, name }) =>
      (<Placeholder name={name} rendering={sitecoreContext.navigation.sitecore.route} />);

    export default withSitecoreContext()(StaticPlaceholder);
    ```
* The layout data returned for a static context will _never include Experience Editor markup_, even if the site is viewed in EE. This is for your authors' protection, as the static layout is a global element that should not be edited in the context of another page (and it breaks EE).

One possible technique to allow both display and editing of the static content is to conditionally alter the placeholder source data, so that when editing the static source item (e.g. `navigation`) the placeholder uses the local placeholder data (which includes EE data) but when on any other item it uses the context data instead (which is always read-only). Here is an example of doing that in React that extends the example above:

```jsx
import React from 'react';
import {
  withSitecoreContext,
  Placeholder,
  getChildPlaceholder,
} from '@sitecore-jss/sitecore-jss-react';

function ConditionalStaticPlaceholder({ sitecoreContext, name, ...otherProps }) {
  let placeholderData = sitecoreContext.navigation.sitecore.route;

  // if we have route data that places components in the target placeholder,
  // we're editing the definition item of the static item, so we should
  // render as a normal placeholder
  if (sitecoreContext.route) {
    const childPlaceholder = getChildPlaceholder(sitecoreContext.route, name);

    if (childPlaceholder && childPlaceholder.some((rendering) => rendering.componentName)) {
      placeholderData = sitecoreContext.route;
    }
  }

  return <Placeholder name={name} rendering={placeholderData} {...otherProps} />;
}

export default withSitecoreContext()(ConditionalStaticPlaceholder);
```

Then to use it, it's just like a normal React placeholder component:

```jsx
<ConditionalStaticPlaceholder name="navigation" />
```

## Putting it together

Now we have:
* Created a route item to store our static layout
* Added a placeholder definition to Sitecore to put some components into
* Added the placeholder component to our JSS app

That's all there is to it - if you enter Experience Editor on your static rendering item, it should allow adding components to your static navigation layout. Then if you visit a different route, the static components should follow the browser around.

Feel free to try some personalization settings too!

![editing a static item](/assets/img/static-rendering-ee.png)

## Limitations

There is an important limitation when using this technique. Within the context of the static layouting, the _context item_ is the static item, not the current route. In other words if you visited the home route and it rendered the navigation route statically, while Sitecore was rendering the `home` content the context item is `home`, and while it is rendering the `navigation` content, the context item is `navigation`.

This means that personalization rules that rely on _item hierarchy_ will not work correctly on a static layout item - because the hierarchy context is always the static item and not the current route. A common example of such a rule is `where the item is the [name] item or one of its descendants`.