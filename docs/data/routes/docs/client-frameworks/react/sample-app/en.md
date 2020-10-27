---
name: sample-app
routeTemplate: ./data/component-templates/article.yml
title: React Sample App
---

# The JSS React Sample App

JSS' React sample app is a practical sample that demonstrates many patterns of how to use JSS with React. It is designed to have just enough dependencies that Sitecore features can function (i.e. routing, translation), but also be as simple and approachable as possible. The sample is both a learning tool as well as a basis for writing production-ready applications; the sample content is designed to be easy to remove so you can replace it with production work.

## Getting Started

The React sample supports running in all [JSS application modes](/docs/fundamentals/application-modes). For example, to start the app in _disconnected mode_, run `jss start` to build the app and open a browser to view it.

> Prefer reading code to documentation? The sample app is designed to be easily traceable and contains lots of explanatory comments about implementation details. Go play!

## Routing + State Management

The sample app uses dynamic routing based on the [Layout Service](/docs/fundamentals/services/layout-service) (or local route data files in _disconnected mode_), and uses route/navigation changes to trigger app state changes. Thus tracing the primary execution flow should begin with the route configuration.

### Client-side routing

Starting from the main client-side entry point of the app in `index.js`:

* In `index.js` SSR data and state is handled and rendering is passed off to `<AppRoot>`
* In `AppRoot.js` the router is configured to respond to app routes and pass them off to `<RouteHandler>`
* In `RouteHandler.js`, Layout Service data is acquired for the current route, and the route and language state of the app are maintained. Actual app markup rendering is passed off to the `<Layout>` component.
* In `Layout.js`, the shell HTML and global elements of the JSS app, along with its root `<Placeholder>`(s) are rendered
* The remaining structure of the route is defined by the route data, which defines which components - and their content data - live in each placeholder.

### Server-side routing

When the React app is pre-rendered by a Node server, thus returning HTML to the client in the initial response, the route data flow is similar to client-side routing but has a few key differences.

1.  [Integrated mode only] Sitecore will receive the request, parse the route server-side, and determine whether the requested item will be handled by a JSS application, and thus which bundle to execute.
1.  [Headless mode only] A request is received by the Node SSR proxy and passed on to a Sitecore layout service
1.  The Node host will invoke the `renderView` function in the `server/server.js`. The function arguments include the route data / [Layout Service](/docs/fundamentals/services/layout-service) output.
1.  The `renderView` function performs the following steps:
    * Receive the data to use when server-side rendering (layout service, dictionary)
    * Sets the SSR data into the app's initial state using `setServerSideRenderingState()`
    * Render the app to HTML using React's SSR tools
    * Embed the rendered app within its `index.html` template and set metadata and SSR state. The SSR state (`window.__JSS_STATE__`) is used to rehydrate the app state on the client, preventing the need to call Layout Service for initial route data.
    * Invoke the render callback function with the final HTML

> Note: the sample app by default uses Apollo GraphQL tools to render the app to HTML on the server (`renderToStringWithData()`). This allows server-side rendering with the async results of GraphQL queries evaluated. If not using GraphQL, the more pedestrian `ReactDOMServer.renderToString()` can be used instead.

## App Build System

The JSS React app includes some build system helpers to make working with the app easier.

### Scaffolding

Scaffolding a new JSS React component is provided via `jss scaffold <componentName>`. The scaffold is defined by `scripts/scaffold-component.js`, and is fully customizable to your needs. Scaffolding creates the React component and the disconnected component definition files, then provides helpful feedback about what to do to make your component work.

### Dynamic Config Generation

The JSS app needs to be able to read aspects of the JSS configuration, such as the current Layout Service endpoint config. To accomplish this, before a build runs the `scripts/generate-config.js` script is run which dynamically assembles the `src/temp/config.js` file that the app can then import when it needs config access. This script is fully customizable - or removable - if you have different configuration requirements.

### Dynamic Component Factory Module

When a build is started, the JSS React app will automatically generate the _component factory_, a mapping between JSS component names and their React component implementations. This file, `src/temp/componentFactory.js`, is generated using conventions for defining your JSS components. This is useful to avoid needing to manually register new components. When the app is running locally, it is also smart enough to watch for new components and update the module. This auto generation is defined in `scripts/generate-component-factory.js`, and is fully customizable.

> Don't like conventions? Don't like code generation? We got you - this convenience feature is entirely removable in three steps:

1.  Remove `componentFactory.js` from `.gitignore` in the `src/temp/.gitignore` file.
1.  Delete `/scripts/generate-component-factory.js`
1.  Remove the reference to the deleted script from `/scripts/bootstrap.js`

### Disconnected Mode Support

The JSS [disconnected mode](/docs/fundamentals/application-modes) enables development of JSS apps using a local mock version of the Sitecore JSS services - Layout Service and Dictionary Service. This is accomplished by running a small Express app on a different port - 3042 by default - that hosts the mock services (`scripts/disconnected-mode-proxy.js`). `create-react-app` is then configured to proxy (the `proxy` section in `package.json`) requests to API paths to this mock service layer. The mock services layer is powered by a JSS manifest file that is automatically generated from your disconnected data definitions (`/data`, `/sitecore/definitions`). This manifest is automatically regenerated when the data is changed and live reloading is supported.

## Using GraphQL + React

[GraphQL](https://graphql.org/) is a popular and extremely powerful API platform that is well suited to JSS apps' data needs when they extend beyond simple route data. [Sitecore GraphQL](/docs/fundamentals/services/graphql) is supported to enable accessing content or other custom data schemas (for example, aggregating an existing set of backend REST services).

> Sitecore GraphQL does not come with a disconnected mock service, so it can only operate with a JSS app in Connected, Integrated, or Headless application modes. If disconnected GraphQL functionality is required, [graphql-tools](https://github.com/apollographql/graphql-tools) has very powerful GraphQL mocking capabilities.

Refer to the [JSS + GraphQL](/docs/fundamentals/services/graphql) documentation to understand the overall capabilities first - we're only talking about React and _Connected GraphQL_ specifically here. _Integrated_ GraphQL works at the server level, so it is identical in any supported frontend framework.

The React sample app makes use of the [Apollo GraphQL client](https://www.apollographql.com/docs/react/). Usage is pretty simple: follow the `react-apollo` documentation, but instead of using the `graphql` higher order component, use the JSS-specific `GraphQLData` HOC instead. This service has the same API as Apollo, but performs some JSS-specific operations to make it more compatible with Sitecore.

> Complete examples of using connected and integrated GraphQL are provided with the sample app and are heavily commented, for example `src/components/GraphQL-ConnectedDemo`. Please refer to these samples for implementation details.

### Sitecore Context Access

JSS ships with a React higher order component that can inject the Sitecore context - in other words route-level data, as opposed to component-level data - into any component. Common examples of needing context data might be to get at page title or meta keywords fields stored on the route level, or to conditionally alter rendering when in Experience Editor mode. Here's an abbreviated example of using it:

```javascript
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

const MyComponent = (props) => <div>Page editing: {props.sitecoreContext.pageEditing}</div>;

// wrap MyComponent in the HOC (note the double function invocation - important)
export default withSitecoreContext()(MyComponent);
```

Usage of `withSitecoreContext()` is dependent on having a `<SitecoreContext>` component wrapping anything using `withSitecoreContext()` that maintains a `SitecoreContextFactory` instance in the component hierarchy. Here's an example of that:

_Root.js_ (the root component in your app)

```javascript
import React from 'react';
import { SitecoreContext, SitecoreContextFactory } from '@sitecore-jss/sitecore-jss-react';
import componentFactory from './componentFactory';

export default class extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      contextFactory: new SitecoreContextFactory()
    }

    // Setup default sitecoreContext state
    if (props.ssrState && props.ssrState.sitecore && props.ssrState.sitecore.route) {
      // set the initial sitecore context data if we got SSR initial state
      this.state.contextFactory.setSitecoreContext({
        route: props.ssrState.sitecore.route,
        itemId: props.ssrState.sitecore.route.itemId,
        ...props.ssrState.sitecore.context,
      });
    } else if (props.ssrState) {
      this.state.contextFactory.setSitecoreContext(props.ssrState.sitecore.context)
    } else {
      this.state.contextFactory.setSitecoreContext(null);
    }
  }

  render() {
    return (
      <SitecoreContext contextFactory={this.state.contextFactory}>
        <YourAppsComponentsHere />
      </SitecoreContext>
    )
  }
}
```

> NOTE: Don't use `SitecoreContextFactory` singleton through the app, use `withSitecoreContext`.

The final piece of using `withSitecoreContext()` is to ensure that the `props.sitecoreContext` is updated when the Sitecore context changes. You can wrap component by `withSitecoreContext({ updatable: true })` in order to get access to `props.updateSitecoreContext` and update `props.sitecoreContext` inside the nested component. This could be when the route changes in your app, or when server-side rendering passes down a state object - any time new layout data is pulled from Sitecore and rendered.

```javascript
import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

class RouteHandler extends React.Component {
  getContext = () => this.props.sitecoreContext

  async updateRouteData() {
    const routeData = await getRouteData("/"); // makes a request for new route data, for example
    
    this.props.updateSitecoreContext(routeData.sitecore.context);
  }
}

export default withSitecoreContext({ updatable: true })(RouteHandler)
```

> NOTE: You shouldn't store `ssrInitialState` global variable and use it across the application. Instead you should pass `ssrInitialState` into `AppRoot` and store all required data inside `SitecoreContext`. As mentioned above you can access it using `withSitecoreContext()`.

### UI Components

UI components are the most important part of the JSS app. Thankfully, they are no different from any other React component - except that they are dynamically added inside a `Placeholder` component, which provides them with an ambient `fields` prop.

```javascript
import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const Welcome = ({ fields }) => (
  <div>
    <Text field={fields.title} />
  </div>
);

export default Welcome;
```

> While the Welcome component is written as a _stateless functional component_ because there is no internal component state or need for lifecycle methods, you can also use the ES6 class syntax and extend from `React.Component`. Generally speaking, JSS does not place any limitations on the usage of normal React conventions.

### Handling Sitecore Field Types

You probably noticed the `<Text />` component being used above.
It is a special component that comes with JSS and as a helper for rendering the field value properly for editing inside Experience Editor. There are a number of helpers for different field types, such as images, dates, and rich text fields. Consult the _Styleguide_ page in the sample app for working live examples of all these field types.
