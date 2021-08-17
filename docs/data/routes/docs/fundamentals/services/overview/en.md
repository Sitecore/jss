---
name: services-overview
routeTemplate: ./data/component-templates/article.yml
title: JSS Services & APIs
---

# JSS Services & APIs

This section describes the services and APIs available in Sitecore Headless Services (formerly known as JSS Server Components) and the Sitecore JavaScript Rendering SDK (JSS).

The services and APIs described in this section, unless otherwise stated, are available for all our framework-specific rendering SDKs.

Our SDKs' most frequently used services follow a service-client-fetcher pattern of implementation and support REST request/response, GraphQL queries, or both. The services using this pattern are:

- [Layout Service](/docs/fundamentals/services/layout/overview) - available for all frameworks, with REST and GraphQL endpoints.
- [Dictionary Service](/docs/fundamentals/services/dictionary/overview) - available for all frameworks, with REST and GraphQL endpoints.
- [Sitemap Service](/docs/nextjs/services/graphql-sitemap-service) - available for Next.js only, GraphQL only.

Depending on your local development setup, chosen development workflow and framework, you might also need to become familiar with: 
- [App Configuration](/docs/fundamentals/services/app-configuration).
- [App Import](/docs/fundamentals/services/app-import).
- [GraphQL](/docs/fundamentals/services/graphql).
- [Tracking](/docs/fundamentals/services/tracking).
- [Forms](/docs/fundamentals/services/forms-service).
- [View Engine](/docs/fundamentals/services/view-engine).

## Terminology

Before diving into the specifics of each service, you should be aware of the following terminology for JSS services:

**Factory**

A factory creates an instance of a *service*. In the [Next.js sample application](https://github.com/Sitecore/jss/tree/5982057c9a92e3c1a899a2b741e64f6a4dc04713/samples/nextjs/src/lib), there are examples of factories for services with support for both GraphQL and REST. 

**Service**

A service is a JavaScript abstraction (class) that facilitates retrieving Sitecore data.
A service:
- Accepts a configuration object.
- Contains a fetch method.
- Has a *client* performing the fetching of data.
- Defines data models.
- Validates (developer input) logic.
- Implements a default *Fetcher*.

**Client**

A client uses a *JSS service* to interact with a Sitecore Headless Service or third-party service.

**Fetcher**

A fetcher describes the data-fetching function of *services*.

## Service Customization

As of JSS 18.0.0, the recommended method for customizing/extending a front-end JSS service is to:

1. extend the service itself, followed by
2. using your new service in a service factory.