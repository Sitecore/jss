---
name: deployment-options
routeTemplate: ./data/component-templates/article.yml
title: Deployment options for your Next.js app
---
<!-- omit in toc -->
# Deployment options for your Next.js app
- [Important Notes](#important-notes)
- [Deployment options](#deployment-options)
  - [Vercel](#vercel)
  - [Node.js Server](#nodejs-server)
  - [Static HTML Export](#static-html-export)
- [Triggering Webhooks on Content Publish](#triggering-webhooks-on-content-publish)

## Important Notes
* Even if you use Static HTML / `next export`, you must run a Next.js instance which is accessible to your Content Management role in order to [use the Experience Editor](../../experience-editor/walkthrough/en.md).
* The _Headless SSR Proxy_ is neither needed for nor compatible with Next.js-based JSS applications.
* Production hosting of Next.js-based JSS applications in "integrated mode" is not supported.

## Deployment options

### Vercel
Vercel, the creators of Next.js, offer a deployment and hosting solution which is optimized for Next.js. They support all Next.js features out of the box, including incremental static site (re-)generation, hybrid rendering, and internationalization. Your application can be deployed directly from source control and will be optimized via Vercel's edge network and serverless functions.

* [Walkthrough: Deploying to Vercel](../vercel/en.md)
* [Vercel deployment](https://nextjs.org/docs/deployment#vercel-recommended) (_Next.js Documentation_)

### Node.js Server
Next.js can be deployed to any hosting provider or environment that supports Node.js.

* [Node.js Server deployment](https://nextjs.org/docs/deployment#nodejs-server) (_Next.js Documentation_)
* [Discussion on Next.js and Docker](https://github.com/vercel/next.js/discussions/16995) (_Next.js GitHub_)

### Static HTML Export
If you would like to deploy using a fully static HTML export, first ensure you are aware of the [limitations in supported Next.js features](https://nextjs.org/docs/advanced-features/static-html-export#caveats) when using `next export`.

* [Walkthrough: Using `next export` with the JSS sample app](../export/en.md)
* [Static HTML export](https://nextjs.org/docs/advanced-features/static-html-export) (_Next.js Documentation_)
* [Deploy static-rendered Next.js websites on Azure Static Web Apps Preview](https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs) (_Microsoft_)

## Triggering Webhooks on Content Publish
When using `getStaticProps` with `getStaticPaths`, or deploying static HTML with `next export`, it is necessary to trigger a `next build` and site deployment when content is published. To facilitate this, the Headless Services module includes the ability to invoke a webhook following completion of Sitecore publishing. See the [Vercel deployment walkthrough](../vercel/en.md) for configuration details.