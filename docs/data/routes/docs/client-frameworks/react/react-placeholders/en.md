---
name: react-placeholders
routeTemplate: ./data/component-templates/article.yml
title: React Placeholder Techniques
---
# React Placeholder Techniques

There are several ways to use _placeholders_ in a JSS React app.

## What are placeholders?

Check out [understanding layout](/docs/fundamentals/understanding-layout) for a quick-start guide, but in essence think of a placeholder as a React component that contains dynamically added child components - and the child components are defined by Sitecore's layout definition.

A root placeholder is an essential piece of any JSS app, as otherwise Sitecore will not be able to provide meaningful content. However, placeholders can be arbitrarily nested as well - for example a `Tabs` component would likely expose a `tabs` placeholder that held child tab components that could be defined in Sitecore.

## Basic placeholder technique

The most basic, and most common way to add a placeholder is to use the `Placeholder` component:

```jsx
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const App = ({ route }) => (
  <div>
    <h1>My App</h1>
    <Placeholder name="jss-main" rendering={route} />
  </div>
);
```

The `name` is the key of the placeholder you're exposing, and the `rendering` is the current Sitecore-provided route data, or parent component data if you're exposing a placeholder from within another component.

## Higher order component placeholder technique

Another technique allows you to get _an array of the React components in a placeholder_ injected as a prop to the component that exposes the placeholder. This technique enables very powerful manipulation techniques that would be nearly impossible in traditional Sitecore development. This uses the _higher-order component_ pattern that is common in React.

```jsx
import { withPlaceholder } from '@sitecore-jss/sitecore-jss-react';

const Tabs = ({ tabs }) => {
  return (
    <div>
      {tabs}
    </div>
  );
};

export default withPlaceholder('tabs')(Tabs);
```

When you emit the component array, React will render the components where you emit them. The main advantage of this technique is that _there is no wrapper component_. If you use the `Placeholder` component, all child components render underneath it in the React component tree. If you emit the placeholder with this technique, the placeholder will have no wrapping component and will render inline. This is very useful when you're using React libraries that are based on a specific component hierarchy, for example this example of `react-fullpage`:

```jsx
<SectionsContainer>
  <Section color="#69D2E7">Page 1</Section>
  <Section color="#A7DBD8">Page 2</Section>
  <Section color="#E0E4CC">Page 3</Section>
</SectionsContainer>
```

In the preceding sample it's expected that the component hierarchy is `SectionsContainer` -> `Section`. If you wished to add the `Section` components using a placeholder, so that Sitecore could define them. If this were done using the `Placeholder` component, the hierarchy would instead look like `SectionsContainer` -> `Placeholder` -> `YourComponent` -> `Section`:

```jsx
<SectionsContainer>
  <Placeholder name="jss-sections" rendering={rendering} />
</SectionsContainer>
```

With the HOC-based placeholder, we can solve this in two different ways:

### Inline components

If the library doesn't mind a single layer of component wrapping, you can place the child component into your rendering component. This will result in a component hierarchy like `SectionsContainer` -> `YourComponent` -> `Section` in the sample above:

```jsx
import { withPlaceholder } from '@sitecore-jss/sitecore-jss-react';

const ContainerComponent = ({ sectionsPlaceholder }) => {
  return <SectionsContainer>{sectionsPlaceholder}</SectionsContainer>;
};

// you can also alias the prop for the placeholder when using the HOC - or pass an array of placeholders
export const ContainerSitecoreComponent = withPlaceholder({ placeholder: 'sections', prop: 'sectionsPlaceholder' })(ContainerComponent);

// the <Section> is in the child Sitecore component added to the placeholder
export const ChildSitecoreComponent = (props) => (
  <Section>
    <h1>Your JSS or other React components here</h1>
  </Section>
);
```

### Component transformation

If you need a completely flat component hierarchy (`SectionsContainer` -> `Section` in our example), you can take advantage of the injected prop being an array to transform the child components with a wrapper using the `map` function. When using this technique, the child Sitecore components can be completely unaware of the wrapping and render only their content for a clean separation of concerns.

```jsx
const ContainerComponent = ({ sectionsPlaceholder }) => {
  return (
    <SectionsContainer>
      {sectionsPlaceholder.map((component, index) => {
        // this if is important, as it prevents breakage when using Sitecore Experience Editor
        if (component.props && component.props.type === 'text/sitecore') return component;

        // wraps _all_ child components in a <Section> component
        return <Section key={index}>{component}</Section>;
      })}
    </SectionsContainer>
  );
};

export const ContainerSitecoreComponent = withPlaceholder({ placeholder: 'sections', prop: 'sectionsPlaceholder' })(ContainerComponent);
```

## Render Props API

If you like the [render props pattern](https://reactjs.org/docs/render-props.html) instead of higher order components, you'll be happy to know JSS supports render props too! Using the `<Placeholder>` component's `render` prop, you can take over rendering of the placeholder contents in the same way as with the higher order component - and be able to use dynamic props as well.

The following example illustrates how to get the components array and render it using render props.

```jsx
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const App = ({ route }) => (
  <div>
    <h1>My App</h1>
    <Placeholder name="jss-main" rendering={route} render={(components, placeholderData, props) => <div>{components}</div>} />
  </div>
);
```

> The `placeholderData` param provides the current placeholder's layout data. The `props` is a mirror of the props passed to the `<Placeholder>`. These arguments are optional if they are not needed.

## Direct Placeholder Introspection

If you need access to the placeholder's _data_, as opposed to its components, that is also possible. A good use case for this is components like tabs that may need to render pieces in two places (the tab title, and the tab contents). Because the placeholder hierarchy is a big JavaScript object, you can traverse it yourself using `props.rendering` to discover child component data and fields:

```jsx
const Tabs = ({ rendering, tabs }) => (
<Tab.Container>
  <div class="tabsHeading">
    {(rendering.placeholders.tabs || [])
      .filter((tab) => tab && tab.fields && tab.fields.title)
      .map((tab, index) => (
        <Tab.Heading key={index}>
          <Text field={tab.fields.title} />
        </Tab.Heading>
      ))}
  </div>
  
  <div class="tabContents">
    {tabs}
  </div>
</Tab.Container>
);

export default withPlaceholder('tabs')(Tabs);
```

Technically it is possible to take over and render a placeholder completely custom using this technique without using any sort of placeholder component or HOC. That's not usually a good idea, but there's a time and place where it could be appropriate.

## Enhancing placeholders

The `Placeholder` component supports a number of customizations that can enhance your experience. These same customizations are possible on the HOC placeholder by using the `propsTransformer` option to inject the same props using a function.

### Error Components

If a rendering error (i.e. an exception) occurs in a placeholder, it will display an _error component_ instead of the placeholder contents and log the error details to the console. You can customize this component by substituting your own React component using the `errorComponent` prop.

### Missing Component Components

If a placeholder contains a rendering name that is unknown to the `componentFactory` (for example, a backend developer creates a `Foo` rendering and adds it to a page, but there is no `Foo.js` yet), the rendering is replaced with the _missing component component_. The default implementation is a simple message, but you can customize it by substituting your own React component on the `missingComponentComponent` prop.