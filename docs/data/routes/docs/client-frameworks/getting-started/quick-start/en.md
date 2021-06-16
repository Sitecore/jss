---
name: quick-start
routeTemplate: ./data/component-templates/article.yml
title: Quick Start
---
# Quick Start

## The TL;DR Quick Start

If you're in a hurry to play with a JSS app, you can get started in four commands (with [Node](https://nodejs.org) installed). We still recommend reading the rest of the quickstart for better understanding of what's happening.

```bash
npm install -g @sitecore-jss/sitecore-jss-cli
jss create my-first-jss-app react
cd my-first-jss-app
jss start
```

> Using the JSS CLI, you can create applications for any versions of JSS and therefore ensure that your new JSS application is compatible with your licensed Sitecore XP version. To find out which version of JSS is compatible with your version of Sitecore XP, consult the [compatibility table](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB0541788). 
> 
> To create an application using a previous version of JSS, see an example in the [JSS CLI reference](/docs/fundamentals/cli).

## Step 1: Prerequisites

To develop a JSS app, you will need:

* An OS supported by [Node](https://nodejs.org) (Mac, Windows, Linux)
* [Node](https://nodejs.org). We recommend using the latest LTS release.

> Note: A Sitecore instance is required to operate in _connected_ or _integrated_ [application modes](/docs/fundamentals/application-modes), where content in the JSS app is pulled from Sitecore, or to use JSS in production. Sitecore requires Windows, however the Sitecore instance need not be local (i.e. on a virtual machine, or a remote server).

## Step 2: Install the JSS CLI

JSS includes a command line tool to make it easy to get started and maintain your application. If you're familiar with [angular-cli](https://cli.angular.io/) or [create-react-app](https://github.com/facebook/create-react-app), this is the same idea but for managing your JS app's connectivity and deployment to Sitecore. The CLI is installed globally, but it uses commands stored in the app's `node_modules` so multiple apps with different JSS versions will just work.

```bash
npm install -g @sitecore-jss/sitecore-jss-cli
```

To verify that your CLI installation was successful, run `jss --help` at any command line.

> The `jss` commands that are available change when run within a JSS app directory. The `--help` option will always show the currently available commands.

## Step 3: Choose a JSS application template

The JSS CLI is used to create applications, which can be created from a several application templates. To get started, choose an application template based on your needs and desired frontend framework.

> Help! Should I use React, Vue, or Angular?

> Which framework you use for JSS is a matter of opinion. JSS provides equal support to React, Vue, and Angular. If you're a newcomer to modern frontend development and don't have your own opinion yet, React or Vue are the easiest to get started with.

### App Starter Templates

These are the main templates that should be used when you're getting started with JSS. They were designed as examples of JSS application starting points, and they contain StyleGuides that demonstrate how to work with JSS components using your chosen JS framework.

The Styleguides in these templates are mirror images of each other, supporting basic Sitecore features (routing, multilingual, GraphQL) and using popular supporting libraries for their frameworks.

* `react` The React Styleguide template, based on `create-react-app`.
* `vue` The Vue Styleguide template, based on `vue-cli`.
* `angular` The Angular Styleguide template.

Note that these templates are examples of project starting points, and are not ready-for-production code. Developers are expected to extend and customize these examples according to their requirements.

### Experimental Templates

Experimental templates are specialized JSS examples, showing how to do advanced tasks, but may not be stable, thoroughly documented, or supported.

* `react-native` The React Native Styleguide template
* `sitecore-embedded-jss-app` This app shows how to embed a JSS application inside an existing Sitecore site as a rendering. [Read more here](/docs/techniques/mvc-integration/client-side-embedding).

### Special Templates
* `node-headless-ssr-proxy` This app shows how to configure a Node server to act as a proxy between the browser and Sitecore. [Read more here](/docs/techniques/ssr/headless-mode-ssr).
* `node-headless-ssr-experience-edge` This app shows how to configure SSR for your JSS application using a Sitecore Experience Edge endpoint.

> NodeJS is a third-party technology that you must configure according to your specific use-case scenarios for Headless mode.

### Deprecated Templates
* `sitecore-javascript-renderings` This app shows how to render a JavaScript app as a rendering embedded within a traditional Sitecore MVC site. See [JavaScript Renderings](/docs/techniques/mvc-integration/javascript-rendering) for details. This template is flagged as deprecated as of Oct 2020 because these rendering don't scale well. They satisfy edge-case requirements, and should generally be avoided.

## Step 4: Create application using selected template

> Your version of Sitecore XP might not support the features in the current version of JSS. To find out which version of JSS is compatible with your Sitecore XP version, consult the [compatibility table](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB0541788). 
> 
> To create an application using a previous version of JSS, see an example in the [JSS CLI reference](/docs/fundamentals/cli).

Once you have selected a template, it's time to create your application.

* Open a command line where you wish to create your application
* Run `jss create <your-app-name> <app-template-name>`
* Sit back and relax while JSS does its work

For example, `jss create myapp react` would create a React sample in a `myapp` folder under the current directory.

## Step 5: Run your application

* At a command line in your app's folder, run `jss --help` to see your options and what they do. This is optional, but recommended.
* To start the app in [disconnected mode](/docs/fundamentals/application-modes) which uses locally defined content, run `jss start`

The app will be built and a local development server will be started.
Your default browser should open with `http://localhost:3000` and your JSS app is rendered:

<img src="/assets/img/jss-built.png" alt="JSS app" />

> The `jss` command knows how to execute scripts from your `package.json` (npm scripts). `jss start` and other build commands are defined by package scripts so that you may customize your build as you wish. Other commands, such as `jss manifest` and `jss deploy` are natively part of the JSS CLI - though they may call your build scripts if they need to.

## What's next?

You've successfully created an app with the JSS SDK in a local development environment! Next, let's [add a component to the app](./first-component) that will display content from Sitecore.
