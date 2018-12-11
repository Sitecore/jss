---
name: vue-tips
routeTemplate: ./data/component-templates/article.yml
title: Vue Tips
---
# JSS Vue Tips / Best Practices

## Placeholders wrap contents with a `<div />`

Vue templates and render functions require a single top-level element, it does not support rendering fragments or arrays of components, therefore the `Placeholder` component must wrap the components within it in a HTML element, e.g. `<div />`.
