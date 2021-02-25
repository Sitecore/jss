---
name: react-overview
routeTemplate: ./data/component-templates/article.yml
title: React Overview
---

# Using JSS with React

Sitecore JSS supports developing React applications with Sitecore.

## Sample Application

The [JSS CLI](/docs/client-frameworks/getting-started/quick-start) can be used to quickly create an `create-react-app`-based JSS application:

```sh
jss create my-react-jss-app react
cd my-react-jss-app
jss start
```

We recommend reading the [sample app walkthrough](/docs/client-frameworks/react/sample-app) to understand the sample app, but it's also well commented if you'd rather read code.

## Placeholder Techniques

The React Placeholder component is very powerful. Here are [some advanced techniques that can be used with placeholders](/docs/client-frameworks/react/react-placeholders).

## Code Splitting

JSS does not ship with code-splitting support out of the box for simplicity, but it is possible to implement using standard React component-based code splitting techniques, such as `react-loadable` or `loadable-components (recommended by React)`.

The JSS team has [blogged about one possible way to support code splitting using JSS and React](https://kamsar.net/index.php/2018/08/Code-splitting-with-Sitecore-JSS-React/).
