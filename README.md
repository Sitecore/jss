# Sitecore JavaScript SDKs (JSS)

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
   - [Vercel](https://vercel.com/) deployment compatible.

   Consult the [documentation](http://jss.sitecore.com/docs/nextjs/getting-started-nextjs/why-nextjs) and remember to check out the heavily commented code in the sample application.

2. [React](/samples/react)

   Built using [create-react-app](https://github.com/facebook/create-react-app) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting and wrapping techniques, and other helpful JSS patterns. The application code is heavily commented, but [documentation also exists](http://jss.sitecore.com/docs/client-frameworks/react/sample-app).

3. [Vue](/samples/vue)

   Built using [@vue/cli](https://cli.vuejs.org/) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting and wrapping techniques, and other helpful JSS patterns. The application code is heavily commented, but [documentation also exists](http://jss.sitecore.com/docs/client-frameworks/vue/sample-app).

4. [Angular](/samples/angular)

   Built using [angular-cli](https://cli.angular.io/) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting and wrapping techniques, and other helpful JSS patterns. The application code is heavily commented, but [documentation also exists](http://jss.sitecore.com/docs/client-frameworks/angular/sample-app).

5. [Embedded JSS App within Sitecore MVC](/samples/sitecore-embedded-jss-app)

   This app demonstrates how to embed a client-side JSS application inside an existing Sitecore MVC site as opposed to running a standalone JSS site. This technique essentially embeds the JSS app's markup and app wrapper tag within a Sitecore rendering. [Documentation](http://jss.sitecore.com/docs/techniques/mvc-integration/client-side-embedding).

6. [React Native](/samples/react-native)

   This app demonstrates experimental JSS usage with React Native. Due to the experimental nature of React Native support in JSS, this app does not have feature parity with the other framework samples (e.g. React, Vue). [Documentation](http://jss.sitecore.com/docs/client-frameworks/react-native)

7. [~~Sitecore JavaScript rendering~~](/samples/sitecore-javascript-renderings) [Deprecated]

   This project demonstrates experimental support for creating Sitecore renderings that will server-side render individual JavaScript components or apps. The Sitecore JavaScript renderings can be used alongside traditional MVC-based renderings. [Documentation](http://jss.sitecore.com/docs/techniques/mvc-integration/javascript-rendering)

8. [Headless Server-Side Rendering with Node.js](/samples/node-headless-ssr-proxy)

   JSS supports headless server-side rendering using any service that supports hosting Node.js applications. [Documentation](http://jss.sitecore.com/docs/techniques/ssr/headless-mode-ssr).

## Getting started with JSS

- [Official JSS documentation](https://jss.sitecore.com/)
- [StackExchange](https://sitecore.stackexchange.com/)
- [Community Slack](https://sitecorechat.slack.com/messages/jss)
- [Sitecore Community Forum](https://community.sitecore.net/developers/f/40)

## Contributions

We are very grateful to the community for contributing bugfixes and improvements. We welcome any and all efforts to evolve and improve Sitecore JavaScript Services; read below to learn how you can take part in those efforts.

### [Code of Conduct](CODE_OF_CONDUCT.md)

Sitecore has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](CONTRIBUTING.md)

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

### License

Sitecore JavaScript Services is using the [Apache 2.0 license](LICENSE.MD).

## [Support](SUPPORT.md)
