---
name: sample-app
routeTemplate: ./data/component-templates/article.yml
title: Vue Sample App
---

# The JSS Vue Sample App

JSS' Vue sample app is a practical sample that demonstrates many patterns of how to use JSS with Vue. It is designed to have just enough dependencies that Sitecore features can function (i.e. routing, translation), but also be as simple and approachable as possible. The sample is both a learning tool as well as a basis for writing production-ready applications; the sample content is designed to be easy to remove so you can replace it with production work.

> The sample app was built using [`@vue/cli`](https://github.com/vuejs/vue-cli) as a starting point. However, the `sitecore-jss-vue` package has no dependencies on `@vue/cli`.

## Getting Started

The Vue sample supports running in all [JSS application modes](/docs/fundamentals/application-modes). For example, to start the app in _disconnected mode_, run `jss start` to build the app and open a browser to view it.

> Prefer reading code to documentation? The sample app is designed to be easily traceable and contains lots of explanatory comments about implementation details. Go play!

## Component Format

The JSS Vue sample primarily uses [Single-File Components (SFC)](https://vuejs.org/v2/guide/single-file-components.html) for presentational components. However, you are free to use whichever component declaration and registration method you choose, e.g. `render` functions, inline `template` properties, etc...

## Routing + State Management

The sample app uses dynamic routing based on the [Layout Service](/docs/fundamentals/services/layout-service) (or local route data files in _disconnected mode_), and uses route/navigation changes to trigger app state changes. Thus tracing the primary execution flow should begin with the route configuration.

### Client-side routing

Starting from the main client-side entry point of the app in `main.js`:

1.  In `main.js` SSR data and state is gathered and passed off to `createApp.js`.
1.  In `createApp.js`, the Vue app instance is created and configured along with the app router via `router.js`, and rendering is passed off to `AppRoot.vue`. If any initial state / route data is provided for the app, the state is set and managed using a customizable Vue plugin for JSS: `lib/SitecoreJssStorePlugin.js`.
1.  In `AppRoot.vue`, the `<router-view />` component is declared and is responsible for rendering the components matched for the current route, as defined in `router.js`.
1.  In `router.js` the router is configured to respond to app routes and pass them off to the `RouteHandler` component.
1.  In `RouteHandler.js`, we bind any route (Layout Service) data provided by the `SitecoreJssStorePlugin` to a Vue reactive data object. If no initial data is present, Layout Service data is acquired for the current route, and the route and language state of the app are updated. Subsequent route changes will update the global app state via the `SitecoreJssStorePlugin`.
1.  In `RouteHandler.js`, actual app markup rendering is passed off to the `Layout.vue` component. Because we have bound the global app state to a reactive data object, the `Layout.vue` component will re-render when new Layout Service / route data is received. Also, the global app state provides a way for components that live outside of `Layout.vue` to react to route / context data changes.
1.  In `Layout.vue`, the shell HTML and global elements of the JSS app, along with its root `Placeholder`(s) are rendered.
1.  The remaining structure of the route is defined by the route data, which defines which components - and their content data - live in each placeholder.

### Server-side routing

When the Vue app is pre-rendered by a Node server, thus returning HTML to the client in the initial response, the route data flow is similar to client-side routing but has a few key differences.

1.  [Integrated mode only] Sitecore will receive the request, parse the route server-side, and determine whether the requested item will be handled by a JSS application, and thus which bundle to execute.
1.  [Headless mode only] A request is received by the Node SSR proxy and passed on to a Sitecore layout service.
1.  The Node host will invoke the `renderView` function in the `server/server.js` file. The function arguments include the route data / [Layout Service](/docs/fundamentals/services/layout-service) output.
1.  The `renderView` function performs the following steps:
    * Receive the data to use when server-side rendering (layout service, dictionary)
    * Create and initialize the app via the same `createApp.js` file used in client-side rendering.
    * In `createApp.js`, SSR data is set into the app's initial state using a customizable Vue plugin for JSS: `lib/SitecoreJssStorePlugin.js`.
    * Render the app to HTML using Vue's SSR tools
    * Embed the rendered app within its `index.html` template and set metadata and SSR state. The SSR state (`window.__JSS_STATE__`) is used to rehydrate the app state on the client, preventing the need to call Layout Service for initial route data.
    * Invoke the render callback function with the final HTML

> Note: while the `SitecoreJssStorePlugin` does provide some app-level state management capabilities, it is not intended to be a substitute for more robust tooling such as Vuex. If you choose to use Vuex (or similar) for app-level state management, you will likely not need to use the state management features of the `SitecoreJssStorePlugin`.

## App Build System

The JSS Vue app includes some build system helpers to make working with the app easier.

### Scaffolding

Scaffolding a new JSS Vue component is provided via `jss scaffold <componentName>`. The scaffold is defined by `scripts/scaffold-component.js`, and is fully customizable to your needs. Scaffolding creates the Vue component and the disconnected component definition files, then provides helpful feedback about what to do to make your component work.

> Note: Vue components are scaffolded using [Single File Components](https://vuejs.org/v2/guide/single-file-components.html). If you prefer not to use Single File Components, as mentioned above you can customize the scaffolding script to your needs.

### Dynamic Config Generation

The JSS app needs to be able to read aspects of the JSS configuration, such as the current Layout Service endpoint config. To accomplish this, before a build runs, the `scripts/generate-config.js` script is run which dynamically assembles the `src/temp/config.js` file that the app can then import when it needs config access. This script is fully customizable - or removable - if you have different configuration requirements.

### Dynamic Component Factory Module

When a build is started, the JSS Vue app will automatically generate the _component factory_, a mapping between JSS component names and their Vue component implementations. This file, `src/temp/componentFactory.js`, is generated using conventions for defining your JSS components. This is useful to avoid needing to manually register new components. When the app is running locally, it is also smart enough to watch for new components and update the module. This auto generation is defined in `scripts/generate-component-factory.js`, and is fully customizable.

> Don't like conventions? Don't like code generation? We got you - this convenience feature is entirely removable in three steps:

1.  Remove `componentFactory.js` from `.gitignore` in the `src/temp/.gitignore` file.
1.  Delete `/scripts/generate-component-factory.js`
1.  Remove the reference to the deleted script from `/scripts/bootstrap.js`

### Disconnected Mode Support

The JSS [disconnected mode](/docs/fundamentals/application-modes) enables development of JSS apps using a local mock version of the Sitecore JSS services - Layout Service and Dictionary Service. This is accomplished by running a small Express app on a different port - 3042 by default - that hosts the mock services (`scripts/disconnected-mode-proxy.js`). `@vue/cli` is then configured to proxy (via the `vueConfig.devServer` section in `vue.config.js`) requests to API paths to this mock service layer. The mock services layer is powered by a JSS manifest file that is automatically generated from your disconnected data definitions (`/data`, `/sitecore/definitions`). This manifest is automatically regenerated when the data is changed and live reloading is supported.

## Using GraphQL + Vue

[GraphQL](https://graphql.org/) is a popular and extremely powerful API platform that is well suited to JSS apps' data needs when they extend beyond simple route data. [Sitecore GraphQL](/docs/fundamentals/services/graphql) is supported to enable accessing content or other custom data schemas (for example, aggregating an existing set of backend REST services).

> Sitecore GraphQL does not come with a disconnected mock service, so it can only operate with a JSS app in Connected, Integrated, or Headless application modes. If disconnected GraphQL functionality is required, [graphql-tools](https://github.com/apollographql/graphql-tools) has very powerful GraphQL mocking capabilities.

Refer to the [JSS + GraphQL](/docs/fundamentals/services/graphql) documentation to understand the overall capabilities first - we're only talking about Vue and _Connected GraphQL_ specifically here. _Integrated_ GraphQL works at the server level, so it is identical in any supported frontend framework.

The Vue sample app makes use of the [vue-apollo](https://akryum.github.io/vue-apollo/) library which in turn integrates with the [Apollo GraphQL client](https://www.apollographql.com/client). Usage is fairly straightforward and you can follow the `vue-apollo` documentation for implementation specifics.

> When server-side rendering (SSR), the sample app uses the `prefetch` functionality of `vue-apollo` to prefetch GraphQL query data and render the app to HTML on the server. This allows server-side rendering with the async results of GraphQL queries evaluated. If not using GraphQL, the `vue-apollo` prefetching functionality can be removed. It is _important_ to note that when `vue-apollo` is prefetching queries the queries do _not_ have access to instantiated components. This means no access to component props, state, or other instance properties. If queries need that type of data to populate query variables, the data will need to be extracted from the SSR state available via the `renderView` function.

> Complete examples of using connected and integrated GraphQL are provided with the sample app and are heavily commented, for example `src/components/GraphQL-ConnectedDemo`. Please refer to these samples for implementation details.

### Sitecore Context and Route-Level Data Access

The JSS Vue app ships with a customizable Vue plugin that attaches Sitecore context and route data - in other words route-level data, as opposed to component-level data - to any Vue component instance. Common examples of needing context or route data might be to get at page title or meta keywords fields stored on the route level, or to conditionally alter rendering when in Experience Editor mode. Here's an abbreviated example of using it:

```javascript
export default {
  name: 'MyComponent',
  computed: {
    context() {
      return this.$jss.sitecoreContext();
    },
    routeData() {
      return this.$jss.routeData();
    },
  },
};
```

Usage of `this.$jss` is dependent on installing the `SitecoreJssStorePlugin`:

_createApp.js_ (where your Vue instance is created, e.g. `new Vue()`)

```javascript
import SitecoreJssStorePlugin from './lib/SitecoreJssStorePlugin';

Vue.use(SitecoreJssStorePlugin);
```

The final piece of using `this.$jss.sitecoreContext()` and `this.$jss.routeData()` is to ensure that the `store` used by the `SitecoreJssStorePlugin` is updated when the Sitecore context/route data changes. This could be when the route changes in your app, or when server-side rendering passes down a state object - any time new layout data is pulled from Sitecore and rendered. To accomplish this, we use the `this.$jss.store.setSitecoreData()` function to update the JSS plugin store with data received from Layout Service. The `setSitecoreData` function accepts raw Layout Service data and updates the app-level context and route data accordingly. You can see an example of usage in `RouteHandler.js`. An abbreviated example is below:

```javascript
export default {
  name: 'MyComponent',
  methods: {
    updateRouteData() {
      const routeData = await getRouteData("/"); // makes a request for new Layout Service data, for example

      // push the Layout Service data into the JSS plugin store
      this.$jss.store.setSitecoreData(routeData);
    }
  }
}
```

### UI Components

UI components are the most important part of the JSS app. Thankfully, they are no different from most other Vue components - except that they are stateless functional components and are dynamically added inside a `Placeholder` component, which provides them with an ambient `fields` prop.

```javascript
<template>
  <div>
    <sc-text :field="fields.title" />
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
export default {
  name: 'MyComponent',
  props: {
    fields: {
      type: Object,
    },
  },
  components: {
    ScText: Text,
  },
};
</script>
```

More information for the various JSS helper components can be found on the [Vue Reference page](/docs/client-frameworks/vue/reference)

### Handling Sitecore Field Types

You probably noticed the `Text` component being used above. It is a special component that comes with JSS and is a helper for rendering field values properly for editing inside Experience Editor. There are a number of helpers for different field types, such as images, dates, and rich text fields. Consult the _Styleguide_ page in the sample app for working live examples of all these field types.
