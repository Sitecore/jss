# Sitecore JavaScript Rendering SDK (JSS)

[![Build Status](https://dev.azure.com/sitecorejss/sitecore-jss-ci/_apis/build/status/Sitecore.jss?branchName=master)](https://dev.azure.com/sitecorejss/sitecore-jss-ci/_build/latest?definitionId=1?branchName=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](contributing.md#pull-requests)

This repository contains source code for all Sitecore JSS packages and sample applications to help you get started using Sitecore JSS.

This repository contains the following sample applications:

1. [Next.js](/samples/nextjs)

   The Next.js-based sample application demonstrates common use cases.

   Features: 
   - Written in TypeScript.
   - Support for Next.js static HTML export, incremental static site generation, server-side rendering, and hybrid rendering.
   - Dynamic author-defined URLs via Next.js pages and the Sitecore Layout Service.
   - Dynamic component rendering based on author-defined page layouts.
   - Helper components for rendering various Sitecore field types.
   - Sitecore Experience Editor integration via Next.js Preview Mode.
   - Sitecore route querying for static site generation.
   - Next.js client-side routing support for Sitecore link and rich text fields.
   - Internationalization support via Sitecore language versions and Next.js internationalized routing.
   - Fetching of layout and dictionary data using REST or GraphQL.
   - Component-level data fetching for Sitecore-driven components.
   - Sitecore tracking, analytics, and personalization support (SSR-only).
   - Support for JSS code-first workflow and mock Sitecore services.
   - Other great built-in Next.js features like component-level CSS, code splitting, fast refresh, and more.
   - Compatible with [Vercel](https://vercel.com/) deployment.

   <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
   [Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-next-js.html)

2. [React](/samples/react)

   Built using [create-react-app](https://github.com/facebook/create-react-app) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting, and wrapping techniques, and other helpful JSS patterns.

   <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
   [Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-react.html)

3. [Angular](/samples/angular)

   Built using [angular-cli](https://cli.angular.io/) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting, and wrapping techniques, and other helpful JSS patterns.

   <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
   [Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-angular.html)

4. [Vue](/samples/vue)

   Built using [@vue/cli](https://cli.vuejs.org/) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting, and wrapping techniques, and other helpful JSS patterns. 
 
   <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
   [Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-vue-js.html)

5. [React Native](/samples/react-native)

   This app demonstrates experimental JSS usage with React Native. Due to the experimental nature of React Native support in JSS, this app does not have feature parity with the other framework samples (e.g., React, Vue).

   <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
   [Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-react-native.html)

6. [Headless Server-Side Rendering with Node.js](/samples/node-headless-ssr-proxy)

   JSS supports headless server-side rendering using any service that supports hosting Node.js applications. 

   <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
   [Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/server-side-render-jss-apps-headlessly-using-the-jss-proxy.html)

7. [Headless Server-Side Rendering with Sitecore Experience Edge](/samples/node-headless-ssr-experience-edge)

   JSS supports headless server-side rendering using Sitecore Experience Edge. 

   <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
   [Documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/server-side-render-jss-apps-headlessly-using-a-sitecore-experience-edge-endpoint.html) 

## Getting started with JSS

  <!---
   @TODO: Update to version 20.0.0 docs before release
   -->
- [Official JSS documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdks--jss-.html)
- [StackExchange](https://sitecore.stackexchange.com/)
- [Community Slack](https://sitecorechat.slack.com/messages/jss)
- [Sitecore Community Forum](https://community.sitecore.net/developers/f/40)

## Contributions

We are very grateful to the community for contributing bug fixes and improvements. We welcome all efforts to evolve and improve Sitecore JavaScript Services; read below to learn how to participate in those efforts.

### [Code of Conduct](CODE_OF_CONDUCT.md)

Sitecore has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](CONTRIBUTING.md)

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes to React.

### License

Sitecore JavaScript Services is using the [Apache 2.0 license](LICENSE.MD).

## [Support](SUPPORT.md)
