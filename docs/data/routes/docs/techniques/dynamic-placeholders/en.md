---
name: dynamic-placeholders
routeTemplate: ./data/component-templates/article.yml
title: Dynamic Placeholders
---

# Dynamic Placeholders

Dynamic Placeholders were included in Sitecore 9.0 and JSS is taking advantage of this long awaited feature.
Understanding of Dynamic Placeholders is not required for utilizing Sitecore JSS. But if you wish
to understand the technical details behind Dynamic Placeholders and their use with Sitecore JSS,
read on.

### What are Dynamic Placeholders?

One of the keystones of Sitecore architecture is data-driven page layout, based on addressing
the location of components using *placeholder keys*. Components define their available placeholders
in their code/markup, and are placed according to their defined placeholder on the page. Placeholder
addresses are usually *fully-qualified*, meaning they contain the full hierarchy of placeholders,
delimited with a forward slash ('/'), like a URL path.

This is best understood visually.

![Sitecore Layout](/assets/img/sitecore-layout.gif)

However the shortcomings of this addressing system become apparent when you attempt to place the same
component more than once at the same placeholder address.

In the example layout below, it's unclear which *Tabs* component the *Tab* should be placed in when
given the placeholder path */phContent/phTab*. Out of the box, Sitecore would put it in the first one.

![Which Placeholder?](/assets/img/which-placeholder.png)

To overcome this, we can make the placeholder keys *dynamic*. There are three main approaches to doing so:

1. Attach an index to the placeholder key based on the position of the component. e.g. */phContent/phTab_1*
1. Utilize the unique identifier (uid) which Sitecore gives a component when it's placed on a page. e.g. */phContent/phTab_8DFE46A3-5D17-43E1-835D-129D18BD59AC*
1. Some combination of both.

The UID approach is a bit more resilient when it comes to moving component and other scenarios in the Sitecore Experience Editor.

![Dynamic Placeholder](/assets/img/dynamic-placeholder.png)

### Dynamic Placeholders in Sitecore JSS

Using Dynamic Placeholders with Sitecore JSS presents some challenges:

* The application needs to be able to render without Sitecore, and we don't have a rendering UID prior to importing the application
and its components into Sitecore.
* Developers are structuring component layout via Javascript objects, and shouldn't have to consider whether their particular layout
will be affected by this shortcoming of the Sitecore layout engine.
* Similarly, when adding a `Placeholder` to a component, the developer should not need to consider whether the placeholder needs to be dynamic or not.

To overcome these challenges, Sitcore JSS makes the following design decisions:

* Utilize a tree/nested route layout structure instead of "addressing" components on a page. Route data consumed by JSS must place child components within the
*placeholders* collection itself, so there is no ambiquity as to where in the layout the component should be placed.
  * In disconnected developer mode, this is simply the structure of the route data as created by the developer.
  * In connected/integrated modes, the layout data from Sitecore (containing dynamic placeholder keys) is converted into a nested structure before rendering.
* When importing components and route data into Sitecore, assume all placeholders are dynamic (except the immediate children of the root placeholder).
* Utilize a dynamic placeholder format which includes the rendering UID.
* Generate the rendering UID when creating the manifest, prior to Sitecore import. This will ultimately allow more flexibility in the dynamic placeholder
format, if needed.