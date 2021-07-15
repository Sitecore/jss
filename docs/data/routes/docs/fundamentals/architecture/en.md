---
name: architecture
routeTemplate: ./data/component-templates/article.yml
title: Architecture
---

# JSS Architecture

JSS is comprised of a series of APIs and services. At a fundamental level JSS extends Sitecore's dynamic, component-based [layout model](/docs/fundamentals/understanding-layout) to the frontend. Whereas in a traditional JS application each route tends to host known components, in a JSS app a route's components and their data are defined dynamically by Sitecore (or disconnected data when in disconnected mode).

Driving layout dynamically enables JSS apps to support content editor driven layouts and support data-driven personalization and multivariate testing - all the power of Sitecore with all the flexibility of a headless deployment model.

## JSS Elements

<img alt="JSS High Level Elements" src="/assets/img/jss-high-level-elements.png" class="img-fluid img-thumbnail" />

* **JSS SDKs**: A series of **[npm packages](https://www.npmjs.com/org/sitecore-jss)** facilitate working with Sitecore data and layout in JavaScript. Framework-specific SDKs provide Sitecore's dynamic *placeholder* layout system and helpers for rendering Sitecore fields so they can be editable by authors.
* **[Sitecore Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service)**: provides the composition of route/pages, as well as the needed data for each component. The client SDKs make it easy to consume this data and render a data-driven (that is, Sitecore-driven) layout.
* **[JavaScript view engine](/docs/fundamentals/services/view-engine)**: Allows Sitecore to perform server-side rendering (SSR) of JavaScript applications, enabling use of the Sitecore Experience Editor.
* **Application import**: Developers may take a [code-first approach](/docs/fundamentals/dev-workflows/code-first) when using JSS via the [Application Import Service](/docs/fundamentals/services/app-import), which generates Sitecore renderings, templates and/or content based on data and JavaScript-defined Sitecore entities such as renderings and templates.

## Sitecore Integration and Data Flow

<img alt="JSS Sitecore Integration and Data Flow" src="/assets/img/jss-sitecore-integration-data-flow.png" class="img-fluid img-thumbnail" />

* Using [manifest definitions](/docs/techniques/working-disconnected/manifest-api) and the [JSS CLI](/docs/fundamentals/cli), developers can deploy an application "code first" via the [Import Service](/docs/fundamentals/services/app-import). Note that this is optional -- you always have the option of working [Sitecore-first](/docs/fundamentals/dev-workflows/sitecore-first).
* As described above, the [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) provides the data needed to render the JSS app. It is typically consumed for both initial render on the server, as well as directly from the browser on route change.
* The JSS [View Engine](/docs/fundamentals/services/view-engine) runs within the Sitecore instance and provides server-side rendering via communication with an out of process [node.js](https://nodejs.org) instance, which it manages.
* JSS apps may consume the [JSS Dictionary Service](/docs/fundamentals/services/dictionary-service), [Sitecore GraphQL](/docs/fundamentals/services/graphql), other [Sitecore.Services.Client](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/sitecoreservicesclient) services, or custom REST endpoints as needed.
* For a true headless architecture, you may utilize independent node.js host(s) for server-side rendering of your application, via the [sitecore-jss-proxy](/docs/techniques/ssr/headless-mode-ssr) module.
* [App configuration](/docs/fundamentals/services/app-configuration) within Sitecore provides app-specific settings for the Import Service and View Engine.