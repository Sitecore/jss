---
name: understanding-layout
routeTemplate: ./data/component-templates/article.yml
title: Understanding Layout
---
# Understanding Layout

> This is a crash course in how Sitecore handles layouting. Experienced Sitecore developers can skip this section.

JSS extends Sitecore's dynamic, component-based [layout model](/docs/fundamentals/understanding-layout) to the frontend, so to be an effective JSS developer you must also understand how Sitecore composes layouts (or routes). Whereas in a traditional JS application each route hosts known components, in a JSS app a route's components and their data are defined dynamically by Sitecore (or disconnected data when in disconnected mode).

Driving layout dynamically enables JSS apps to support content editor driven layouts and support data-driven personalization and multivariate testing - all the power of Sitecore with all the flexibility of a headless deployment model.

Sitecore's layout engine works by defining named _placeholders_ that you can place one or more _components_ into. A _component_ in JSS is exactly what it sounds like: a JS component. A _placeholder_ is another JS component that is added to your components that defines where dynamic components are rendered.

Conceptually a placeholder is similar to a `<div>` tag with child elements (where each child is a component), or a static component tree in JS tools such as React. Suppose we had the following pseudocode:

    // app.js (entry point)
    <div>
      <placeholder name="jss-content" />
    </div>

    // HelloWorld.js (component)
    <div>hello world!</div>

    // layout definition
    placeholders:
        jss-content:
        - componentName: HelloWorld
        - componentName: HelloWorld

This might result in a rendered HTML such as this:

    <div>
        <div>hello world!</div>
        <div>hello world!</div>
    </div>

Placeholders can be nested: components can have placeholders on them, not just at the root. A common example of this might be a hierarchy like `main (placeholder) > Tabs (component) > tabs (placeholder) > Tab (component)`.

JSS app development generally consists of designing a placeholder/component hierarchy and then implementing each component. Each supported JS library (such as React) implements this architecture in a slightly different idiomatic way; consult the library-specific documentation for more details.

## Placeholder Naming Considerations

Choosing meaningful placeholder names can enhance the maintainability of any JSS app. Consider the names of placeholders carefully when assigning them, and follow these best practices:

* Prefix placeholder names with an app-specific prefix. Instead of `content`, use `myapp-content`. This is important because a Sitecore instance can host multiple JSS apps and websites, and things work best if they do not have conflicting placeholder names.
* Choose a name that describes the _general_ purpose of the placeholder, and avoid jargon.
* Assign a user-friendly _display name_ for each placeholder in `/sitecore/definitions/placeholders.sitecore.js`. While simply using a placeholder on a route is enough to register it, adding a display name will give your app a nice feel for authors. Display names need not be unique.