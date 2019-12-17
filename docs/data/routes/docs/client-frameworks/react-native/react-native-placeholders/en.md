---
name: react-native-placeholders
routeTemplate: ./data/component-templates/article.yml
title: React-Native Placeholder Techniques
---

# React-Native Placeholder Techniques

Here are several ways to use `placeholders` in a JSS React-Native app.
## What are placeholders?
Check out [understanding layout](/docs/fundamentals/understanding-layout) for a quick-start guide, but in essence think of a placeholder as a React-Native component that contains dynamically added child components - and the child components are defined by Sitecore's layout definition.

A root placeholder is an essential piece of any JSS app, as otherwise Sitecore will not be able to provide meaningful content. However, placeholders can be arbitrarily nested as well - for example a `Tabs` component would likely expose a `tabs` placeholder that held child tab components that could be defined in Sitecore.

## Basic placeholder technique

The most basic, and most common way to add a placeholder is to use the `Placeholder` component:

```jsx
import React from 'react'
import { View, Text } from 'react-native'
import { Placeholder } from '@sitecore-jss/sitecore-jss-react-native';

const App = ({ rendering }) => (
  <View>
    <Text>My App</Text>
    <Placeholder name="jss-main" rendering={rendering} />
  </View>
);
```

The `name` is the key of the placeholder you're exposing, and the `rendering` is the current Sitecore-provided route data, or parent component data if you're exposing a placeholder from within another component.

## Render Props API

If you like the [render props pattern](https://reactjs.org/docs/render-props.html) instead of higher order components, you'll be happy to know JSS supports render props too! Using the `<Placeholder>` component's `render` prop, you can take over rendering of the placeholder contents in the same way as with the higher order component - and be able to use dynamic props as well.

The following example illustrates how to get the components array and render it using render props.

```jsx
import React from 'react';
import { View, Text } from 'react-native'
import { Placeholder } from '@sitecore-jss/sitecore-jss-react-native';

const App = ({ rendering }) => (
  <View>
    <Text>My App</Text>
    <Placeholder name="jss-main" rendering={rendering} render={(components, placeholderData, props) => <View>{components}</View>} />
  </View>
);
```

> The `placeholderData` param provides the current placeholder's layout
> data. The `props` is a mirror of the props passed to the
> `<Placeholder>`. These arguments are optional if they are not needed.

## Missing Component Components

If a placeholder contains a rendering name that is unknown to the `componentFactory` (for example, a backend developer creates a `Foo` rendering and adds it to a page, but there is no `Foo.js` yet), the rendering is replaced with the _missing component component_. The default implementation is a simple message, but you can customize it by substituting your own React-Native component on the `missingComponentComponent` prop.