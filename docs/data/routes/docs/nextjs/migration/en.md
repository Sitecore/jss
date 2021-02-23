---
name: migration
routeTemplate: ./data/component-templates/article.yml
title: Migration Guide
---
# Migration Guide: React to Next.js

## Component structure
The default component structure in the Next.js sample app is different from the React sample.

The React sample used a directory for every component, and didn't provide a way to use directories to group related components. As a result, route names were included in component names to show grouping, which is not good practice because components should be reusable across different routes.

The React sample used a structure like this:
```
/src
  /components
    /Styleguide-SomeComponent
      /index.tsx
    /Styleguide-AnotherComponent
      /index.tsx
    /GraphQL-SomeComponent
      /index.tsx
    /GraphQL-AnotherComponent
      /index.tsx
```

In the Next.js sample, components do not need a parent directory. They can live directly under `src/components`...
```
/src
  /components
    /SomeComponent.tsx
    /AnotherComponent.tsx
```

... or they can be categorized into folders for organization.
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
