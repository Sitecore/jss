---
name: vue-placeholders
routeTemplate: ./data/component-templates/article.yml
title: Vue Placeholder Techniques
---

# Vue Placeholder Techniques

There are several ways to use _placeholders_ in a JSS Vue app.

## What are placeholders?

Check out [understanding layout](/docs/fundamentals/understanding-layout) for a quick-start guide, but in essence think of a placeholder as a Vue component that contains dynamically added child components - and the child components are defined by Sitecore's layout definition.

A root placeholder is an essential piece of any JSS app, as otherwise Sitecore will not be able to provide meaningful content. However, placeholders can be arbitrarily nested as well - for example a `Tabs` component would likely expose a `tabs` placeholder that held child tab components that could be defined in Sitecore.

## Basic placeholder technique

The most basic, and most common way to add a placeholder is to use the `Placeholder` component:

```
<template>
  <div>
    <h1>My App</h1>
    <sc-placeholder name="jss-main" :rendering="route" />
  </div>
</template>
<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';

export default{
  name: 'MyComponent',
  props: {
    route: {
      type: Object
    }
  },
  components: {
    ScPlaceholder: Placeholder,
  }
}
</script>
```

The `name` is the key of the placeholder you're exposing, and the `rendering` is the current Sitecore-provided route data, or parent component data if you're exposing a placeholder from within another component.

## SitecoreJssPlaceholderPlugin technique

Another technique allows you to get _an array of the Vue components in a placeholder_ attached as a computed property to the component instance that exposes the placeholder. This technique enables very powerful manipulation techniques that would be nearly impossible in traditional Sitecore development. This technique is enabled by using the `SitecoreJssPlaceholderPlugin` Vue plugin provided in the `sitecore-jss-vue` package.

#### Plugin installation

All of the following examples assume you have installed the `SitecoreJssPlaceholderPlugin` on your Vue instance:

```
import { createApp, createSSRApp } from 'vue';
import { SitecoreJssPlaceholderPlugin } from '@sitecore-jss/sitecore-jss-vue';
import componentFactory from './path/to/your/componentFactory.js';

const app = isSSR ? createSSRApp(vueOptions) : createApp(vueOptions);

// The plugin uses a "global" componentFactory, but you can override
// the `componentFactory` at the component level if needed.
app.use(SitecoreJssPlaceholderPlugin, { componentFactory });
```

### Basic Usage

```
<template>
  <div>
    <component v-for="(tab, index) in tabs" :is="tab" :key="`tab${index}`" />
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    rendering: {
      type: Object,
    },
  },
  withPlaceholder: {
    placeholders: 'tabs',
  },
};
</script>
```

### How It Works

The `SitecoreJssPlaceholderPlugin` uses a mixin that attaches to the `beforeCreate` hook to look for a `withPlaceholder` property on a component definition. The plugin then uses the value provided by the `withPlaceholder` property to find the specified placeholder data, e.g. `tabs` in the `rendering` prop data. The plugin then creates a computed property on the component, using the name of the placeholder as the property name by default, and assigns an array of all the Vue components for that placeholder to the computed property. This allows you to use the built-in Vue [dynamic component](https://v3.vuejs.org/guide/component-basics.html#dynamic-components) to render the placeholder components in your template.

When you iterate the component array in your template, Vue will render the components where you emit them. The main advantage of this technique is that _there is no wrapper component_. If you use the `Placeholder` component, all child components render underneath it in the Vue component tree. If you emit the placeholder contents with this technique, the placeholder contents will have no wrapping component and will render inline. This is very useful when you're using Vue libraries that are based on a specific component hierarchy, for example this example of `vue-carousel`:

```
<carousel>
  <slide>Slide 1 Content</div>
  <slide>Slide 2 Content</div
  <slide>Slide 3 Content</div
</carousel>
```

In the preceding sample it's expected that the component hierarchy is `Carousel` -> `Slide`. If you wished to add the `slide` components using a placeholder, so that Sitecore could define them, and this were done using the `Placeholder` component, the hierarchy would instead look like `Carousel` -> `Placeholder` -> `SitecoreSlideWrapper` -> `Slide`:

```
<carousel>
  <sc-placeholder name="jss-slides" :rendering="rendering" />
</carousel>
```

With the placeholder computed property, we can solve this in two different ways:

### Inline components

If the library doesn't mind a single layer of component wrapping, you can place the child component into your rendering component. This will result in a component hierarchy like `Carousel` -> `SitecoreSlideContainer` -> `Slide` in the sample below:

##### Carousel Container

```
<template>
  <carousel>
    <component v-for="(slide, index) in $options.computed.slidesPlaceholder" :is="slide" :key="`slide${index}`" />
  </carousel>
</template>

<script>
export default {
  name: 'ContainerComponent',
  props: {
    rendering: {
      type: Object,
    },
  },
  withPlaceholder: {
    // you can alias the computed prop name for the placeholder or pass an array of placeholders
    placeholders: {
      placeholder: 'slides',
      computedPropName: 'slidesPlaceholder',
    },
  },
};
</script>
```

##### Slide Container

```
<!-- This component would be added to the Sitecore placeholder and wraps the carousel `<slide />` component. -->
<template>
  <slide>Your JSS or other Vue components here</slide>
</template>
<script>
export default {
  name: 'SitecoreSlideContainer',
}
</script>
```

### Component transformation

If you need a completely flat component hierarchy (`Carousel` -> `Slide` in our example), you can take advantage of the computed prop being an array to transform the child components with a wrapper using an inline template. When using this technique, the child Sitecore components can be completely unaware of the wrapping and render only their content for a clean separation of concerns.

```
<template>
  <carousel>
    <template v-for="(slide, index) in $options.computed.slidesPlaceholder">
      <!-- this `v-if` is important, as it helps prevents breakage of the carousel markup when using Sitecore Experience Editor -->
      <component v-if="slide.isxEditorComponent" :is="slide" />

      <!-- wraps _all_ child components in a <slide> component -->
      <slide v-else :key="`slide${index}`">
        <component :is="slide" />
      </slide>
    </template>
  </carousel>
</template>

<script>
export default {
  name: 'ContainerComponent',
  props: {
    rendering: {
      type: Object,
    },
  },
  withPlaceholder: {
    // you can alias the computed prop name for the placeholder or pass an array of placeholders
    placeholders: {
      placeholder: 'slides',
      computedPropName: 'slidesPlaceholder',
    },
  },
};
</script>
```

## Slot API

If you like the [slot pattern](https://v3.vuejs.org/guide/component-slots.html#slots) instead of a dynamic computed prop, you'll be happy to know JSS placeholder a default scoped slot too! Using the `<Placeholder>` component's `default` scoped slot prop, you can take over rendering of the placeholder contents in the same way as with the dyanmic computed prop.

The following example illustrates how to get the components array and render it using the default scoped slot.

```
<template>
  <sc-placeholder :rendering="rendering" name="jss-main">
    <div v-slot="{components, isEmpty}">
      <!--
        The placeholder is considered "empty" if it contains no assigned presentation components.
        However, if in Experience Editor (EE) mode, the placeholder may still contain EE-generated components.
      -->
      <template v-if="!isEmpty">
        <template v-for="(component, index) in components">
          <!--
            If the component is a presentation component, i.e. not an EE-generated component,
            we may want to wrap it in another component or markup.
          -->
          <div v-if="!component.isxEditorComponent" :key="index">
            <component :is="component" />
          </div>
          <!-- Else the component is an EE-generated component, render it as-is -->
          <component v-else :is="component" :key="index" />
        </template>
      </template>
      <template v-else>
        <!--
          In EE-mode, we still want to render "empty" placeholders so that content authors can
          assign components to them.
        -->
        <component v-for="(component, index) in components" :is="component" :key="index" />
      </template>
    </div>
  </sc-placeholder>
</template>

<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'MyComponent',
  props: {
    rendering: {
      type: Object,
    }
  },
  components: {
    ScPlaceholder: Placeholder,
  },
};
</script>
```

## Direct Placeholder Introspection

If you need access to the placeholder's _data_, as opposed to its components, that is also possible. A good use case for this is components like tabs that may need to render pieces in two places (the tab title, and the tab contents). Because the placeholder hierarchy is a big JavaScript object, you can traverse it yourself using `$props.rendering` to discover child component data and fields:

```
<template>
  <div class="tabs-container">
    <div class="tabs-heading">
      <ul>
        <li v-for="(tab, index) in rendering.placeholders['jss-tabs']" :key="`tab${index}`">
          <button :class="`${index === activeTabIndex ? 'active' : null}`" v-on:click="activeTabIndex = index">
            <sc-text :field="tab.fields.title" />
          </button>
        </li>
      </ul>
    </div>
    <div class="tabs-content">
      <component :is="activeTab" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  props: {
    rendering: {
      type: Object,
    }
  },
  data() {
    return {
      activeTabIndex: 0,
    };
  },
  withPlaceholder() {
    return {
      placeholders: [
        {
          placeholder: 'jss-tabs',
          computedPropName: 'tabsPlaceholder',
        },
      ],
    };
  },
  computed: {
    activeTab() {
      return this.$options.computed.tabsPlaceholder && this.$options.computed.tabsPlaceholder[this.activeTabIndex];
    },
  },
}
</script>
```

Technically it is possible to take over and render a placeholder completely custom using this technique without using any sort of placeholder component or plugin. That's not usually a good idea, but there's a time and place where it could be appropriate.

## Multiple Placeholders

You can render multiple placeholders in your components using any of the techniques outlined above. Below are some relevant examples:

### Basic

```
<template>
  <div>
    <h1>My App</h1>
    <sc-placeholder name="jss-column-1" :rendering="rendering" />
    <sc-placeholder name="jss-column-2" :rendering="rendering" />
  </div>
</template>
<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';

export default{
  name: 'MyComponent',
  props: {
    rendering: {
      type: Object
    }
  },
  components: {
    ScPlaceholder: Placeholder,
  }
}
</script>
```

### SitecoreJssPlaceholderPlugin

```
<template>
  <div>
    <div class="col-1">
      <component v-for="(comp, index) in this.$options.computed.phColumn1" :is="comp" :key="`comp${index}`" />
    </div>
    <div class="col-2">
      <component v-for="(comp, index) in this.$options.computed.phColumn2" :is="comp" :key="`comp${index}`" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    rendering: {
      type: Object,
    },
  },
  withPlaceholder: {
    placeholders: [
      {
        placeholder: 'jss-column-1',
        computedPropName: 'phColumn1',
      },
      {
        placeholder: 'jss-column-2',
        computedPropName: 'phColumn2',
      },
    ],
  },
};
</script>
```

## SitecoreJssPlaceholderPlugin API

As described earlier in The `SitecoreJssPlaceholderPlugin` uses a mixin that attaches to the `beforeCreate` hook to look for a `withPlaceholder` property on a component definition. The plugin then uses the value provided by the `withPlaceholder` property to find the specified placeholder data, e.g. `tabs` in the `rendering` prop data. The plugin then creates a computed property on the component, using the name of the placeholder as the property name by default, and assigns all of the Vue components for that placeholder to the computed property. This allows you to use the built-in Vue [dynamic component](https://v3.vuejs.org/guide/component-basics.html#dynamic-components) to render the placeholder components in your template.

## Enhancing Placeholders

The Placeholder component supports a number of customizations that can enhance your experience.

### Error Components

If a rendering error (i.e. an exception) occurs in a placeholder, it will display an _error component_ instead of the placeholder contents and log the error details to the console. You can customize this component by substituting your own Vue component using the `errorComponent` prop.

### Missing Component Components

If a placeholder contains a rendering name that is unknown to the `componentFactory` (for example, a backend developer creates a `Foo` rendering and adds it to a page, but there is no `Foo.js` yet), the rendering is replaced with the _missing component component_. The default implementation is a simple message, but you can customize it by substituting your own Vue component on the `missingComponentComponent` prop.
