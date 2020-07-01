---
name: component-granularity
routeTemplate: ./data/component-templates/guide.yml
title: Component Granularity
---

# Component Granularity
- Components may be built as granular as desired, but placeholders should not be used to compose larger components.
- Larger, logical components should be composed in the front-end framework in a way that content authors would use them.  
- Only these components should be imported to Sitecore as renderings.
 
### In Code-First workflow
By default, the `scripts/generate-component-factory.js` script includes all files that follow the naming convention: `src/components/{ComponentName}/index.js`.
To ensure that your granular components are not being included in the componentFactory, you can:
* Use a filename other than `index.js` (example: `Background.js`, `Card.js`, etc)
* Move component to another folder (example: `src/shared/{ComponentName}.js`)
* Update `generate-component-factory.js` script to include components matching your conventions
 
![](/assets/img/guides/component-composition.png)
