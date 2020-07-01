---
name: js-vs-jss
routeTemplate: ./data/component-templates/guide.yml
title: JS vs JSS
---

# JS vs JSS

The JSS framework was built with the goal to stay out of the way of front-end developers as much as possible. In other words, technical concepts, patterns, and best practices learned from building "vanilla" front-end framework apps should, for the most part, work within JSS too (routing being the biggest exception).

> However, there's a very important conceptual difference between building "vanilla" front-end framework apps and JSS front-end framework apps.

## "Vanilla" Front-End Framework App
When building a "vanilla" JavaScript app, you build a single set of components for a single type of interface (the interface where end-users will interact with your app).
> Developers control component layout
> Page composition is known at development-time
> Component hierarchy is known at development-time

## Front-End Framework App with JSS
When building a JavaScript app for a Content Management System, you build a single set of components for two distinct interfaces. The first is the interface where end-users will interact with your app, just like in the "vanilla" case. And the second is the authoring interface, where Content Authors arrange your components on pages and manage content values.

Since Content Authors are the ones setting up component layout,
> Page composition is *not* known at development-time
> Component hierarchy is *not* known at development-time
