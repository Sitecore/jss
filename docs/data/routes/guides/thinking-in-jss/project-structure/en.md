---
name: project-structure
routeTemplate: ./data/component-templates/guide.yml
title: Project Structure
---

> This recommendations on this page apply the portion of a project that contains  front-end code.

## The default structure that JSS CLI generates

Recall that `jss scaffold` is a command for generating files for new component. Since `jss scaffold` creates new files on the file system, it thereby makes some decisions about components structure. The default location convention is `src/components/{ComponentName}/index.js`.

Sample component structure
```
src/
  components/
    layout/
      Header/
        index.js
      Footer/
        index.js
    Article/
      index.js
    Navigation/
      index.js
  index.js
```

This file structure is significant because it is used by the `Component Factory` to determine which components should be mapped to Sitecore renderings.

---

## How front-end components get mapped to Sitecore renderings

> The component factory is simply a JavaScript `Map` object that matches front-end components to names of Sitecore renderings.

`src/boot/componentFactory.js` *(This is a generated file)*
```javascript
import Article from 'components/Article';
import Disclaimers from 'components/Disclaimers';
import Hero from 'components/Hero';
import Logo from 'components/Logo';
import MainNav from 'components/navigation/MainNav';
import SideNav from 'components/navigation/SideNav';
import ArticleContainer from 'containers/ArticleContainer';
import PageContainer from 'containers/PageContainer';
import Row from 'containers/Row';

const components = new Map();
components.set('Article', Article);
components.set('Disclaimers', Disclaimers);
components.set('Hero', Hero);
components.set('Logo', Logo);
components.set('MainNav', MainNav);
components.set('SideNav', SideNav);
components.set('ArticleContainer', ArticleContainer);
components.set('PageContainer', PageContainer);
components.set('Row', Row);

const componentFactory = (componentName) => components.get(componentName);
export default componentFactory;
```

By default, the `Component Factory` does not add all components under `src` to the `Map`; it only adds components that follow a specific filesystem path convention: `src/components/{ComponentName}/index.js`.

---

## Component Granularity
- Components may be built as granular as desired, but placeholders should not be used to compose larger components.
- Larger, logical components should be composed in the front-end framework in a way that content authors would use them.  
- Only these components should be imported to Sitecore as renderings.
 

By default, the `scripts/generate-component-factory.js` script includes all files that follow the naming convention: `src/components/{ComponentName}/index.js`.
To ensure that your granular components are not being included in the componentFactory, you can:
* Use a filename other than `index.js` (example: `Background.js`, `Card.js`, etc)
* Move component to another folder (example: `src/shared/{ComponentName}.js`)
* Update `generate-component-factory.js` script to exclude components matching your conventions
 
![](/assets/img/guides/component-composition.png)

---

## Can front-end devs use a different file structure?
Sure! Front-end developers are free to adjustment the project structure to their liking.

- Customize `scripts/scaffold-component.js` to change the file structure and file content created by `jss scaffold`. (Community guide: [Customizing Scaffolding of Components](https://codealamode.blog/jss-customizing-scaffolding-components) by [Anastasiya Flynn](https://twitter.com/AnastasiyaFlynn))

- Customize `scripts/generate-component-factory.js` to change how the `Component Factory` is generated.

As long as the end result is that components intended for Content Author editing are included in the Component Factory map, and all other helper components are ignored, then everything will work fine.

---

## Helix
[Helix](https://helix.sitecore.net/) is a set of patterns and conventions for back-end Sitecore developers that deal with solution organization and dependency management. Helix is very popular amongst the Sitecore community, so it's recommended that all developers at least learn the concepts (since it will likely come up in a solution structure debate eventually).

From a technical perspective, JSS *component code* is not required to adhere to Helix principles, and front-end developers may define conventions that differ from those of the back-end team.

However, some front-end developers have reported that following Helix principles for component structure and dependency management helped reduce technical debt and the cost of maintenance over time. 
[JSS Helix React template](https://github.com/jflheureux/jss-app-templates)