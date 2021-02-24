---
name: workflow-options
routeTemplate: ./data/component-templates/article.yml
title: Getting Started options overview
---
#  Development Workflow Options for JSS Next.js Projects

Sitecore offers two paths for setting up your development environment based on your role, workflow, and operating system. 

## Full-stack development

Sitecore provides a Getting Started template for Sitecore developers that want to try out  Sitecore JSS with [Docker](https://www.docker.com/), [Sitecore Containers](https://containers.doc.sitecore.com/), the [Sitecore Next.js SDK](/), and [Sitecore Content Serialization](https://doc.sitecore.com/developers/101/developer-tools/en/sitecore-content-serialization.html).

The resulting solution is optimized for a [Sitecore-first developer workflow](/docs/fundamentals/dev-workflows/sitecore-first). 

> This path requires a machine with the Windows operating system.

To create a solution from the Getting Started template, follow the [Walkthrough: Using the .NET starter template for JSS Next.js projects](/docs/nextjs/getting-started/walkthrough-dotnetnew).

## Front-end development only

Get started with JSS front-end development on any operating system supported by [Node](https://nodejs.org/), using the JSS CLI. 

> With this path, you only get a JSS application based on Next.js for a [code-first developer workflow](/docs/fundamentals/dev-workflows/code-first). You will need to perform additional steps to connect to a Sitecore instance.

Follow the [Walkthrough: Creating a JSS Next.js starter application](/docs/nextjs/getting-started/walkthrough-jsscreate) to set up the starter application for front-end development.

## A note on [Next.js telemetry](https://nextjs.org/telemetry)

Next.js collects anonymous telemetry data about general usage. Participation in the program is optional.

To opt out of the telemetry data collection, you must:

1. Identify you JSS Next.js `.env` file, based on the development environment setup you chose.
   * For full-stack, use `src/rendering/.env`.
   * For front-end, use the `.env` in the root directory of your project. 

2. In the JSS Next.js Application directory (application folder or `src/rendering` for full-stack development)  set the following variable in your `.env` file.

   ```
   NEXT_TELEMETRY_DISABLED=1
   ```
