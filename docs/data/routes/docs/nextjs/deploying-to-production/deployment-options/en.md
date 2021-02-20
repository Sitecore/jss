---
name: deployment-options
routeTemplate: ./data/component-templates/article.yml
title: Deployment options for your Next.js app
---
<!-- omit in toc -->
# Deployment options for your Next.js app

<!-- omit in toc -->
## Deployment options
- [Vercel](#vercel)
- [Node.js Server](#nodejs-server)
- [Static HTML Export](#static-html-export)

## Vercel
Vercel, the creators of Next.js, offer a deployment and hosting solution which is optimized for Next.js. They support all Next.js features out of the box, including incremental static site (re-)generation, hybrid rendering, and internationalization. Your application can be deployed direct from source control and will be optimized via Vercel's edge network and serverless functions.

* [Walkthrough: Deploying to Vercel](../vercel/en.md) (including use of Sitecore publishing webhooks)
* [Vercel deployment](https://nextjs.org/docs/deployment#vercel-recommended) (_Next.js Documentation_)

## Node.js Server
Next.js can be deployed to any hosting provider that supports Node.js.

* [Node.js Server deployment](https://nextjs.org/docs/deployment#nodejs-server) (_Next.js Documentation_)
* [Node.js deployment to Azure with the Azure CLI](https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/tutorial-vscode-azure-cli-node/tutorial-vscode-azure-cli-node-01) (_Microsoft_)
* [Discussion on Next.js and Docker](https://github.com/vercel/next.js/discussions/16995) (_Next.js GitHub_)

## Static HTML Export
If you would like to deploy using a fully static HTML export, first ensure you are aware of the [limitations in supported Next.js features](https://nextjs.org/docs/advanced-features/static-html-export#caveats) when using `next export`.

* [Walkthrough: Using `next export` with the JSS sample app](../export/en.md)
* [Static HTML export](https://nextjs.org/docs/advanced-features/static-html-export) (_Next.js Documentation_)
* [Deploy static-rendered Next.js websites on Azure Static Web Apps Preview](https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs) (_Microsoft_)