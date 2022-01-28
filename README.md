# Sitecore JavaScript Rendering SDK (JSS)

[![Build Status](https://dev.azure.com/sitecore-devex/headless-javascript/_apis/build/status/Sitecore.jss?branchName=dev)](https://dev.azure.com/sitecore-devex/headless-javascript/_build/latest?definitionId=8&branchName=dev) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

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

   Built using [create-react-app](https://github.com/facebook/create-react-app) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting, and wrapping techniques, and other helpful JSS patterns. The application code is heavily commented, but [documentation also exists](http://jss.sitecore.com/docs/client-frameworks/react/sample-app).

3. [Vue](/samples/vue)

   Built using [@vue/cli](https://cli.vuejs.org/) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting, and wrapping techniques, and other helpful JSS patterns. The application code is heavily commented, but [documentation also exists](http://jss.sitecore.com/docs/client-frameworks/vue/sample-app).

4. [Angular](/samples/angular)

   Built using [angular-cli](https://cli.angular.io/) as a starting point. Supports out-of-the-box Sitecore functionalities (i18n, routing, GraphQL, set &lt;title&gt; tags) and demonstrates how to work with various Sitecore data types, placeholder nesting, and wrapping techniques, and other helpful JSS patterns. The application code is heavily commented, but [documentation also exists](http://jss.sitecore.com/docs/client-frameworks/angular/sample-app).

5. [Embedded JSS App within Sitecore MVC](/samples/sitecore-embedded-jss-app)

   This app demonstrates how to embed a client-side JSS application inside an existing Sitecore MVC site instead of running a standalone JSS site. This technique essentially embeds the JSS app's markup and app wrapper tag within a Sitecore rendering. [Documentation](http://jss.sitecore.com/docs/techniques/mvc-integration/client-side-embedding).

6. [React Native](/samples/react-native)

   This app demonstrates experimental JSS usage with React Native. Due to the experimental nature of React Native support in JSS, this app does not have feature parity with the other framework samples (e.g., React, Vue). [Documentation](http://jss.sitecore.com/docs/client-frameworks/react-native)

7. [~~Sitecore JavaScript rendering~~](/samples/sitecore-javascript-renderings) [Deprecated]

   This project demonstrates experimental support for creating Sitecore renderings that will server-side render individual JavaScript components or apps. The Sitecore JavaScript renderings can be used alongside traditional MVC-based renderings. [Documentation](http://jss.sitecore.com/docs/techniques/mvc-integration/javascript-rendering)

8. [Headless Server-Side Rendering with Node.js](/samples/node-headless-ssr-proxy)

   JSS supports headless server-side rendering using any service that supports hosting Node.js applications. [Documentation](http://jss.sitecore.com/docs/techniques/ssr/headless-mode-ssr).

## Getting started with JSS
To develop a JSS application, you need:
- An operating system supported by Node (Mac, Windows, Linux).
- Node. We recommend using the latest long-term support (LTS) release.

> To run a JSS application in production or develop using Sitecore data you need to connect your application to a Sitecore instance with the Headless Services module installed (requires a **Sitecore Headless Services license**). Sitecore *requires Windows*, but the Sitecore instance does not need to be local. You can use a Sitecore instance installed in a virtual machine or on a remote server.

### Identify the JSS version for your Sitecore version
JSS versions are coupled with Sitecore versions. The current JSS release is compatible with the latest version of Sitecore. 

If you use an older version of Sitecore, before creating a JSS project, you need to determine which JSS version is compatible with your version of Sitecore XP.

To identify the correct JSS version for your Sitecore XP version:  
- For Sitecore XP 7.5—9.3, in the [Sitecore modules compatibility table for Sitecore XP 7.5—9.3](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB0541788), in the section *Headless Services*, identify the correct JavaScript Services version for your Sitecore version.
- For Sitecore XP 10.0 and later, in the [Sitecore modules compatibility table for Sitecore XP 10.0 and later versions](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB1000576), in the section *Headless Services*, identify the correct JavaScript Services version for your Sitecore version.

### Getting started with the latest version of JSS

To create a JSS project, perform the following steps:
1. Install the JSS CLI:   
	```
	npm install -g @sitecore-jss/sitecore-jss-cli
	```
2. In a terminal, run the following command to create the JSS application:
	```
	jss create <your-app-name> <app-template-name>
	```	
	
	Replace `<your-app-name>` with your desired application name, and `<app-template-name>` with the name of the template. 
	
	For example: `jss create my-first-jss-app nextjs`.
	
	>This command scaffolds a JSS application based on the ***latest version of JSS templates*** regardless of the JSS CLI version, because it pulls the template code from the `master` branch of the JSS repository.
3. Change directory to your application folder: 
	```
	cd my-first-jss-app
	```
4. Start the development server:
	```
	jss start
	```

### Working with older versions

To create a JSS project for an older version of JSS and Sitecore:   
1. [Identify the correct JSS version for your Sitecore XP version](#identify-the-jss-version-for-your-sitecore-version).
2. Run the JSS CLI installation command:
	```
	npm i @sitecore-jss/sitecore-jss-cli@<version>
	```
	Replace `<version>` with your desired version. For example, `npm i @sitecore-jss/sitecore-jss-cli@13.0.0`.
3. In a terminal, create your JSS project by running the following command:
	```
	jss create my-jss-app react --branch release/13.0.0
	```
	>The command uses the `--branch` option and you need to provide the name of a branch in the JSS repository. You can use a [release branch](https://github.com/Sitecore/jss/branches/all?query=release%2F) or any other branch from the repository.
	
4. Change directory to your application folder: 
	```
	cd my-first-jss-app
	```
5. Start the development server:
	```
	jss start
	```

## Documentation and community resources

- [Official JSS documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdks--jss-.html)
- [StackExchange](https://sitecore.stackexchange.com/)
- [Community Slack](https://sitecorechat.slack.com/messages/jss)
- [Sitecore Community Forum](https://community.sitecore.net/developers/f/40)

## Contributions

We are very grateful to the community for contributing bug fixes and improvements. We welcome all efforts to evolve and improve the Sitecore JavaScript Rendering SDK; read below to learn how to participate in those efforts.

### [Code of Conduct](CODE_OF_CONDUCT.md)

Sitecore has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](CONTRIBUTING.md)

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes to React.

### License

Sitecore JavaScript Services is using the [Apache 2.0 license](LICENSE.MD).

## [Support](SUPPORT.md)
