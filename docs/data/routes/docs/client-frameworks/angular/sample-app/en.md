---
name: sample-app
routeTemplate: ./data/component-templates/article.yml
title: Angular Sample App
---
# The JSS Angular Sample App

JSS' Angular sample app is a practical sample that demonstrates many patterns of how to use JSS with Angular. It is designed to have just enough dependencies that Sitecore features can function (i.e. routing, translation), but also be as simple and approachable as possible. The sample is both a learning tool as well as a basis for writing production-ready applications; the sample content is designed to be easy to remove so you can replace it with production work.

## Getting Started

The Angular sample supports running in all [JSS application modes](/docs/fundamentals/application-modes). For example, to start the app in _disconnected mode_, run `jss start` to build the app and open a browser to view it.

> Prefer reading code to documentation? The sample app is designed to be easily traceable and contains lots of explanatory comments about implementation details. Go play!

## Routing + State Management

The sample app uses dynamic routing based on the [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) (or local route data files in _disconnected mode_), and uses route/navigation changes to trigger app state changes. Thus tracing the primary execution flow should begin with the route configuration.

### Client-side routing

Client-side routing occurs in the web browser. The flow of client-side routing is:

1. A route change (or initial load) triggers Angular routing, configured in `src/app/routing/routing.module.ts`.
1. Most URLs will fall through to the JSS "catch all" route, which is needed because the local application is not aware of all the potential routes (items/"pages") configured in Sitecore.
1. The catch-all route is configured with a `matcher` rather than a path, specifically the `jssRouteMatcher` function. This function uses the `JssRouteBuilderService` to attempt to parse the URL as a Sitecore-formatted route (`/[language]/then/the/item/path/`).
1. The `jssRouteMatcher` returns the `language` and `serverRoute` parameters, which are then provided to the configured route resolver, `JssRouteResolver`.
1. `JssRouteResolver` first invokes `changeRoute` on the `JssContextService`.
1. `JssContextService` on the client side will retrieve the route from one of the following:
    * If running in _Integrated_ or _Headless SSR_ mode immediately following a server render, an attempt is made to obtain route data from the `TransferState`, which should contain the server-side rendering state. When this occurs, the HTTP call to layout service is skipped.
    * In any other case, the route data is fetched via HTTP call to the Sitecore [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service).
1. The `JssContextService` will retain the current route state (more on this later), and return it to the `JssRouteResolver`. The route resolver performs routines necessary for Experience Editor support.
1. Finally the configured route component (defined in `routing.module.ts`, defaults to `app/routing/layout/layout.component.ts`) is loaded into into the `router-outlet` defined in `src/app/app.component.ts` and is provided with the data from the route resolver. This _layout component_ is responsible for:
    * Handling the UI for data fetching errors, such as HTTP 404s and 500s
    * Updating route-level state, such as the page title or other meta fields
    * Binding valid route data to the root `sc-placeholder`, ultimately rendering the full route layout with all its components.

### Server-side routing and data transfer

When the Angular app is pre-rendered by a Node server, thus returning HTML to the client in the initial response, the route data flow is similar but has a few key differences.

1. [Integrated mode only] Sitecore will receive the request, parse the route server-side, and determine whether the requested item will be handled by a JSS application, and thus which bundle to execute.
1. [Headless mode only] A request is received by the Node SSR proxy and passed on to a Sitecore layout service
1. The Node host will invoke the `renderView` function in the `server.bundle.ts` artifact. The function arguments include the route data / [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) output.
1. The `renderView` function will use Angular SSR to render the application, with two key differences in its module initialization:
    * The `AppServerModule` is used instead, which provides server-specific implementations of some services.
    * The initial route state is injected via DI using a `JSS_SERVER_TO_SSR` injection token.
1. Routing executes server-side as it does client-side, ultimately invoking the server-side implementation of `JssService`, the `JssServerService`.
1. The `JssServerService` returns the route data from the `JSS_SERVER_TO_SSR` injection token, and also places the data in `TransferState` for reading on the client-side.
1. Route rendering continues as it does on the client.

## Routing Transfer to Placeholders

Let's take a look inside the `src/routing/layout/layout.component.html`. This is where the app's _root placeholder_ is defined, which handles rendering route data from the router.

```html
<sc-placeholder name="jss-main" [rendering]="route"></sc-placeholder>
```

Here we can see the `sc-placeholder` Angular component placed inside with the `name="jss-main"`. The `sc-placeholder` component is imported from `@sitecore-jss/sitecore-jss-angular` library.

> The `sc-placeholder` component can be applied to an existing DOM element as an attribute as well.

As the name indicates, `sc-placeholder` is responsible for defining the place to render one or more real components.

How are the components for a given placeholder defined? They are exposed in data that is fed into the ScPlaceholder component via the rendering input:

```ts
[rendering]="route"
```

If we trace where route data comes from, we will see in the `src/routing/layout/layout.component.ts` we get a route reference injected:

```ts
export class AppComponent implements OnInit {
  route: any;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }
}
```

This route reference contains the `data` observable that we can subscribe to to receive current route data across route changes:

```ts
route: RouteData;

ngOnInit() {
  this.activatedRoute.data.subscribe((data: { jssState: JssState }) => {
    this.route = data.jssState.sitecore.route;
  }
}
```

Having access to the `placeholders` object within the `route` property, the `sc-placeholder` component will do the rest, i.e. will find the matching placeholder by name (`jss-main`) and will render the array of components the route data defines to be within it. Here's an example of a component implementation (the `sc-placholder` will set the `rendering` input automatically).

```ts
import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  @Input() rendering: ComponentRendering;
}
```

The `rendering` property includes all information available to the component, including data fields:

```ts
{
  componentName: 'Welcome',
  fields: {
    title: {
      value: 'Sitecore Experience Platform + JSS',
    },
    text: {
      value: '<p>...</p>',
    },
    logoImage: {
      value: {
        src: '/sitecore/assets/sc_logo.png',
        alt: 'Logo'
      },
    },
  }
}
```

That's basically how the magic happens.

See [placeholder techniques](/docs/client-frameworks/angular/angular-placeholders) for more on how to use placholders.

## App Build System

The JSS Angular app includes some build system helpers to make working with the app easier.

### Scaffolding

An [Angular Schematic](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) is provided via `jss scaffold <componentName>` to make it easy to create new JSS components in your app. This schematic is based on the default `ng generate component` scaffolding, but also creates the disconnected component definition file and provides helpful feedback about what to do to make your component work.

### Dynamic Config Generation

The JSS app needs a more dynamic configuration system than Angular's environments files will give us, as the settings also need to integrate with configurations defined in the `scjssconfig.json` file and the `package.json` _config_ section. To accomplish this, before a build runs the `scripts/generate-config.ts` script is run which dynamically assembles the `app/environments/environment*.ts` files. This script is fully customizable - or removable - if you have different configuration requirements.

### Dynamic Component Factory Module

When a build is started, the JSS Angular app will automatically generate an Angular module that contains all the defined JSS components, using conventions. This is useful to avoid needing to manually register new components. When the app is running locally, it is also smart enough to watch for new components and update the module. This auto generation is defined in `scripts/generate-component-factory.ts`, and is fully customizable.

> Don't like conventions? Don't like code generation? We got you - this convenience feature is entirely removable in three steps:
  1. Remove `app/components/.gitignore`
  1. Delete `/scripts/generate-component-factory.ts`
  1. Remove the reference to the deleted script from `/scripts/bootstrap.ts`

### Disconnected Mode Support

The JSS [disconnected mode](/docs/fundamentals/application-modes) enables development of JSS apps using a local mock version of the Sitecore JSS services - Layout Service and Dictionary Service. This is accomplished by running a small Express app on a different port - 3042 by default - that hosts the mock services (`scripts/disconnected-mode-proxy.ts`). `angular-cli` is then configured to proxy (`/proxy.conf.js`) requests to API paths to this mock service layer. The mock services layer is powered by a JSS manifest file that is automatically generated from your disconnected data definitions (`/data`, `/sitecore/definitions`). This manifest is automatically regenerated when the data is changed and live reloading is supported.

## Using GraphQL + Angular

[GraphQL](https://graphql.org/) is a popular and extremely powerful API platform that is well suited to JSS apps' data needs when they extend beyond simple route data. [Sitecore GraphQL](/docs/fundamentals/services/graphql) is supported to enable accessing content or other custom data schemas (for example, aggregating an existing set of backend REST services).

> Sitecore GraphQL does not come with a disconnected mock service, so it can only operate with a JSS app in Connected, Integrated, or Headless application modes. If disconnected GraphQL functionality is required, [graphql-tools](https://github.com/apollographql/graphql-tools) has very powerful GraphQL mocking capabilities.

Refer to the [JSS + GraphQL](/docs/fundamentals/services/graphql) documentation to understand the overall capabilities first - we're only talking about Angular and _Connected GraphQL_ specifically here. _Integrated_ GraphQL works at the server level, so it is identical in any supported frontend framework.

The Angular sample app makes use of the [Apollo GraphQL client](https://www.apollographql.com/docs/angular/). Usage is pretty simple: follow the `apollo-angular` documentation, but instead of injecting `Apollo`, inject `JssGraphQLService` instead. This service has the same API as Apollo, but performs some JSS-specific operations to make it more compatible with Sitecore.

> Complete examples of using connected and integrated GraphQL are provided with the sample app and are heavily commented, for example `src/app/components/graph-ql-connected-demo`. Please refer to these samples for implementation details.

## Translation and the Dictionary

### Using the `da-DK` language version

The Angular Sample contains sample content in both `en` and `da-DK`, and language switching should work without additional effort in _Disconnected_ mode. To import the additional language layer for use in other modes, an additional deploy is required:

```
> jss deploy items --language da-DK -c -d
```

> Note: To deploy an alternate language to Sitecore, the language must be first registered in Sitecore. An error will occur when importing an unregistered language.

### Use of `ngx-translate`

In order to be able to dynamically load and utilize the Sitecore dictionary, the Angular sample uses the [`ngx-translate`](http://www.ngx-translate.com) library, rather than the builtin compile-time Angular translation support.

Other libraries or approaches may be used, but this library's ability to consume custom `TranslateLoader` implementations makes it easy to tie into the Sitecore dictionary both client-side and server-side.

The initialization for `ngx-translate` can be found in the main `AppComponent`. This includes logic to switch displayed languages based on the current language state in `JssContextService`, thus allowing `ngx-translate` to synchronize language state with the language in the current route.

The loaders for `ngx-translate` are initialized differently for client rendering (in `AppJssInfrastructureModule`) and server rendering (in `AppServerModule`).

There are several mechanisms of using/outputting translated values with `ngx-translate`. See the module's documentation for more information.

### Translation loaders

#### `JssTranslationLoaderService`

This implementation loads the Sitecore dictionary from the Dictionary Service provided by JSS, found at `/sitecore/api/jss/dictionary/`, using `HttpClient`. It is used as a "fallback" during both client and server rendering.

#### `JssTranslationServerLoaderService`

This implementation attempts to load the dictionary from the `viewBag` data which Sitecore provides during server rendering via the `JSS_SERVER_TO_SSR` injection token. When executing JSS applications, Sitecore will provide the dictionary in the view bag by default as a convenience. If the dictionary is not found, the loader will attempt to obtain the dictionary from a "fallback" loader (as configured, the `JssTranslationLoaderService`). Any obtained dictionary will also be placed in `TransferState` for consumption by the client application.

#### `JssTranslationClientLoaderService`

This implementation attempts to load the dictionary from `TransferState`, and falls back to a provided "fallback" loader (as configured, the `JssTranslationLoaderService`).
