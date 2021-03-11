---
name: layout-concepts
routeTemplate: ./data/component-templates/article.yml
title: Layout & Component Concepts
---
# Key Concepts: Layout, Components, Component Factory

## Layout
### Sitecore "Layout" vs Next.js "Layout"
Recall that Content Authors assemble page layout by adding renderings to placeholders (see [content authoring concepts](/docs/nextjs/introduction/content-authoring-concepts)). To be editable, a page must define at least one root (page-level) placeholder. So, in the context of Sitecore, "Layout" refers to a page's placeholder and renderings hierarchy. Content Authors define layout data through a WYSIWYG UI, and under the hood, it's saved to the database as XML data. JSS apps never work with this XML data; that is purely for powering Sitecore's authoring interface. When a JSS app needs layout data, it uses a Sitecore endpoint to fetch the JSON format data.

In the context on Next.js, "Layout" is a naming convention for a [top-level component that's shared by all pages](https://nextjs.org/learn/basics/assets-metadata-css/layout-component).

JSS merges these concepts, utilizing a [shared React component named "Layout"](https://github.com/Sitecore/jss/blob/4db9ab5831d9bfb31c20051deb1dfb02b2027968/samples/nextjs/src/Layout.tsx#L94) to define root placeholders. This serves as the entry point for rendering the components hierarchy based on how Content Authors assembled renderings in the WYSIWYG editor.

At first, it may seem redundant to define components twice (as Sitecore renderings and as React components). But remember that there are multiple options for implementing web apps on Sitecore, and JavaScript is just one of them. Sitecore saves layout data as XML because it's implementation agnostic. Multiple apps using different implementation approaches could coexist in the same Sitecore instance, and Content Authors would have the same authoring experience for all of them. This architecture makes managing content easier for business users.

### Adding more root placeholders
You are free to define multiple root placeholders. To do so:
1. Add additional <Placeholder> instances to `Layout`, giving each placeholder a *unique name*.
2. The next step varies, depending on your workflow. If you are working Code First, then add the new root placeholder names to the `config.rootPlaceholders` array in `package.json`. If you are working Sitecore First, add the new root placeholders to the layout definition item in Sitecore.

> Note: A common pattern is to define root placeholders for Header, Main Content, and Footer. Front-end developers and Sitecore developers should align on what is best based on business needs.

### Varying root placeholders by page template
Sometimes, it may be necessary to render different root placeholders depending on the page type. Since React components can return different elements conditionally, this can be achieved easily by returning different <Placeholder> components based on the value of `props.layoutData.sitecore.route.templateName` or `props.layoutData.sitecore.route.templateId`.

## Component Factory
In the context of a JSS app, every Sitecore rendering needs to have a matching JSS component implementation.

The Component Factory is a mapping between Sitecore renderings and their JSS component implementations.
Under the hood, the `componentFactory` is simply a JavaScript function in the sample app that accepts the component name as a parameter and returns the associated React component.

The following is a sample `componentFactory` file for an app with two components.
```javascript
import * as ContentBlock from 'src/components/ContentBlock';
import * as AnotherComponent from 'src/components/AnotherComponent';

const components = new Map();
components.set('ContentBlock', ContentBlock);
components.set('AnotherComponent', AnotherComponent);

export function componentModule(componentName: string) {
  return components.get(componentName);
};

export function componentFactory(componentName: string) {
  return components.get(componentName)?.default;
};
```

### Component Factory usage
The sample app is configured to import the `componentFactory` function from `src/temp/componentFactory.ts`. Then, the function is passed to the page wrapper ([`src/pages/[[...path]].tsx`](https://github.com/Sitecore/jss/blob/f91dea21caaf924b2cc043a56ac6cea9bd79c474/samples/nextjs/src/pages/%5B%5B...path%5D%5D.tsx#L36)) as a prop.

When JSS renders a page, it traverses through the layout data JSON fetched from Sitecore. When it comes across rendering names, it uses this `componentFactory` function to get the correct React component to instantiate.

### Component Factory generation
By default, the `src/temp/componentFactory.ts` file is generated programmatically, at build-time, by inspecting the `src/components` directory.

The logic for generating the mapping in the Component Factory is in [`scripts/generate-component-factory.ts`](https://github.com/Sitecore/jss/blob/dev/samples/nextjs/scripts/generate-component-factory.ts). By default, it recursively loops through `src/components` and all sub-directories, and processes all `.tsx` files, except for `.d.tsx` (type definition) files.

It does not matter whether components live directly under `src/components` or they're organized in folders. Given the example above, both `src` structures will generate a component factory with two components, named `SomeComponent` and `AnotherComponent`.

Example 1 - components directory under `src/components`
```
/src
  /components
    /SomeComponent.tsx
    /AnotherComponent.tsx
```

Example 2 - components organized in folders
```
/src
  /components
    /styleguide
      /SomeComponent.tsx
      /AnotherComponent.tsx
    /graphql
      /SomeComponent.tsx
      /AnotherComponent.tsx
```

This file structure aligns with how the JSS CLI generates new components. If you prefer a different structure, you can customize `scripts/generate-component-factory.ts`.

Programmatic generation of the component factory is not required; it makes development easier by eliminating the need to register new components manually. Additionally, when running the app on a local web server, it is smart enough to watch the component factory for changes so that developers can add new components quickly. If you prefer to maintain the component factory manually, do the following:
- Make sure `src/temp/componentFactory.ts` is included in source control.
- Delete `scripts/generate-component-factory.ts` and `scripts/templates/component-factory.ts`.
- Remove the reference to the deleted script from `scripts/bootstrap.ts`.

## Creating Components

### Using the CLI
> Note: If you've worked with other JSS SDKs before (React, Angular, or Vue), note that the default component structure in the Next.js sample app is different from the other samples. We decided to make this change to align with the structure that Next.js authors use in their [code samples](https://github.com/vercel/next.js/tree/master/examples).

New components can be added using the `jss scaffold <componentName>` command. The `componentName` parameter can be a component name or a relative path (relative to `src/components`). Examples:

Command `jss scaffold ComponentName` will generate:
- `src/components/ComponentName.tsx`
- `sitecore/definitions/components/ComponentName.sitecore.tsx` (this is needed for Code First workflow only)

Command `jss scaffold some/new/path/ComponentName` will generate files in the specified folder structure, creating new folders as needed:
- `src/components/some/new/path/ComponentName.tsx`
- `sitecore/definitions/components/some/new/path/ComponentName.sitecore.tsx` (this is needed for Code First workflow only)

If you don’t like the project structure generated by `jss scaffold`, you can customize `scripts/scaffold-component.ts`. If you are using the Sitecore First workflow, `scripts/scaffold-component.ts` can be updated to stop creating files under `sitecore/definitions` since they are not needed.

### Component Granularity
In React, components represent a single UI element, and composition is the recommended pattern for creating complex components. Read more about composition in React in React docs:
- [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

Unlike renderings, which are an authoring concept, components are a developer concept. In many cases, React components, and Sitecore renderings mean the same thing. But often, developers prefer to have a higher level of granularity in their code.

For example, consider a "Search Results" rendering on a Site Search page. From the perspective of the Content Author, the entire search results area is a single UI element. The author does not need to manage multiple variations of "Search Results," so there would be no value to gain from breaking it up for authoring. From the perspective of React, on the other hand, "Search Results" is a composition of components. For example, there would be a component for the results container, a component for individual result list items, and possibly even components for different UI sections of result list items.

Components exported to `Component Factory` need to make sense from the perspective of a Content Author. To add extra components that are meant for development only, you can leverage that component factory generation only looks at the `src/components` directory.

For example, in this structure, all components under "helpers" and "containers" will not be exported to Component Factory.
```
/src
  /components
  /containers
  /helpers
```

Managing what components are or aren't exported to Component Factory is the recommended way to abstract React component composition from Content Authors; avoid using placeholders for this purpose.
