---
name: how-is-nextjs-different
routeTemplate: ./data/component-templates/article.yml
title: What’s different about the Next.js SDK?
---
# What’s different about the Next.js SDK?
The Next.js SDK for Sitecore has some key differences from other Sitecore JavaScript SDKs.

## Architecture and Deployment
* Next.js provides built-in options for build time and runtime static site generation (SSG).
  * Out of the box, the Next.js SDK does not support Sitecore tracking or personalization with SSG or Sitecore GraphQL Edge.
* The _Headless SSR Proxy_ is not required for [production deployment](/docs/nextjs/deploying-to-production/deployment-options).
  * Next.js has built-in pre-rendering.
  * Next.js has [built-in rewrite / proxying support](https://nextjs.org/docs/api-reference/next.config.js/rewrites#rewriting-to-an-external-url) 
  * Sitecore tracking and analytics are supported through [header passing](/docs/nextjs/tracking-and-analytics/overview) (SSR with Sitecore Layout Service REST API only).
* [Experience Editor integration](/docs/nextjs/experience-editor/walkthrough) does not require a separate deployment, and only supports the [HTTP Rendering Engine](/docs/fundamentals/services/view-engine#http-rendering-engine).
  * There is no requirement to install node.js on your Sitecore Content Management role.
  * There is never a need to deploy your application to the Sitecore Content Management role.
* By default, the Next.js sample uses the new "Edge" Sitecore GraphQL schema, which mirrors the schema that will be available with Sitecore Experience Edge.

## Development
* Overall, less boilerplate code than other Sitecore JavaScript SDKs.
* Development and production runtime parity, including server-side rendering during development.
* The Next.js Styleguide sample:
    - has a simplified component filesystem structure.
    - defaults to TypeScript, which is supported out of the box by Next.js.
    - includes code generation for GraphQL schema types.
* A [container-based template](/docs/nextjs/getting-started-nextjs/walkthrough-dotnetnew/) is available for Next.js. The template is optimized for a [Sitecore-first workflow](/docs/fundamentals/dev-workflows/sitecore-first/).

## In Detail
* You should not use `jss deploy app` or `jss deploy files` when working with Next.js.
  * `jss deploy items` can be used for code-first item import.
  * You do not need to configure a `sitecoreDistPath` in your `package.json`.
* The `Link` and `RichText` field helpers support client-side routing out of the box.
* If you add `.graphql` files to your solution, or make changes to your Sitecore data model (templates), you should [update GraphQL introspection](/docs/nextjs/graphql/sample-app/).
* We configured Next.js to proxy Sitecore media requests. Therefore, the Layout Service excludes server URLs.
