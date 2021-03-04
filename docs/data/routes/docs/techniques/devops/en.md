---
name: devops
routeTemplate: ./data/component-templates/article.yml
title: DevOps
---

# A DevOps guide to JSS

JSS is a flexible technology that is designed to fit into most DevOps deployment processes. This guide is intended to be a high-level, strategic guide to DevOps processes and how they interact with JSS.

## Choosing a Deployment Topology

JSS sites can deploy in several different topologies. As a headless technology, if you're unsure of which to pick lean towards a headless deployment to realize the maximum advantage of JSS.

### Headless Topology

In a _headless_ topology, a traditional Sitecore XP (or XM) deployment is turned into an API server that serves content and layout data - with personalization pre-applied.

> Note: this guide will not cover how to configure a Sitecore deployment outside of its interaction with JSS. Consult the [Sitecore documentation](https://doc.sitecore.net) to familiarize yourself with Sitecore deployment topologies outside of JSS.

![headless topology](/assets/img/headless-topology.svg)

When running in headless mode, the Sitecore CD servers do not directly serve the public website. Instead, a cluster of inexpensive Node.js servers host the public-facing website. These Node servers will run [node-headless-ssr-proxy](https://github.com/Sitecore/jss/tree/master/samples/node-headless-ssr-proxy). This server-side rendering (SSR) proxy will make requests to the JSS APIs running on the Sitecore CD servers and then render the JSS application to HTML before returning it to the client. These SSR proxies can be hosted anywhere Node can run, from Heroku to Azure App Service. 

In headless topology, it is possible to use _private_ Sitecore CD servers; the SSR proxies can also reverse-proxy specific paths, such as API calls and media library requests, to the Sitecore CDs. In this setup, the JSS app would be configured to use the _proxy URL_ as its API server (i.e. `https://www.mysite.com`), and the SSR proxy would be configured to proxy to `https://sitecore-cds.mysite.com`.

> It is possible to skip using the SSR proxy and serve static HTML files that the app will fill in with API data. This removes the need for any Node hosting, however when using client-only rendering some search engines may have trouble indexing your content: the HTML will be largely blank without JavaScript execution. Some search engines do execute JavaScript with varying levels of success, but SSR is still a current best practice due to inconsistencies in search engine JS indexing.

### Integrated Topology

In an _integrated_ topology, the Sitecore CD servers perform the server-side rendering of the JSS app using their own integrated (same server, out of process pool) Node services. This mode is less flexible in terms of scalability than a headless deployment, especially in terms of CDN integrations and the capability to scale API servers separately from SSR instances. In this mode, API hosting and rendering is performed on the same server.

There is also less flexibility to do advanced client-side routing scenarios when using integrated topology, as the requests are still pre-parsed by Sitecore and subject to Sitecore routing. In headless mode, it's possible to run custom Express middleware to customize the server extensively. In integrated mode, the same customizations would be Sitecore (C#) customizations instead.

![integrated topology](/assets/img/integrated-topology.svg)

> Note: We do not recommend integrated mode for heavy load production scenarios, because the entire page is server-side rendered using Node.js as a block, not as individual renderings, so traditional output caching mechanisms become all-or-nothing. In other words, if caching is enabled, it forces caching of the entire page, which is almost always not what is desired.

## Deployment Best Practices

The deployment procedure for JSS will vary depending on the [development workflow](/docs/fundamentals/dev-workflows/overview) being used. In production, most apps will be using Sitecore-first workflow. For a Sitecore-first workflow, normal Sitecore DevOps best practices apply:

* Have a repeatable, fully-automated deployment process
* Use an item serialization tool like Unicorn or TDS to source control and deploy developer-owned Sitecore items (templates, renderings, etc), including for the JSS site(s)

Specifically for JSS, we also recommend:

* Consider storing Sitecore backend code and JSS site code in the same source control repository to avoid issues synchronizing changes between front and backend, and enable developers to easily commit, test, and revert cross-cutting changes. This also makes it easy to build and deploy JSS site artifacts to Sitecore during CI builds.
* Automate the deployment of Sitecore updates and JSS site updates in headless mode into a single build process, thus avoiding defects caused by deploying different versions of frontend and backend.
* Use the switches to `jss setup` to enable storing JSS connection and deployment information in deployment variables.

Tip: when running `jss` CLI commands in an environment where you cannot install global npm packages, you can use `npm run jss [command]` instead, which shims the CLI command through npm. Note that `--` is needed prior to any arguments with npm, e.g. `npm run jss deploy app -- --skipBuild`

## Security

### JSS Deployment Service

The JSS deployment service is used to deploy code-first Sitecore item artifacts to Sitecore, as well as for Sitecore-first developer scaffolding. This service is automatically installed when the [Headless Server Components](/docs/client-frameworks/getting-started/jss-server-install) are set up.

* The deployment service uses shared secrets for authentication. These should be unique per environment, _randomly generated_ (no passphrases), and at least 32 characters. The shared secret uses HMAC with the package being deployed as a factor, so there is signature validation that the package is not tampered with and the shared secret is never sent over the wire.
* We strongly recommend running all Sitecore HTTP services, including import service, over TLS-secured channels even with signature validation.
* Import service is automatically disabled when the Sitecore server role (see `Web.config`) is not `Standalone` (local dev) or `ContentManagement`. This means that importing is not allowed to public-facing servers automatically.
* Should you wish to deploy IP whitelisting to the import service, that can be done at a network level.

### File deployment

The JSS deployment service intentionally does not accept files to be deployed, to keep its attack surface as minimal as possible. File deployment of JSS build artifacts should be done using techniques suitable for any other Sitecore deployment, such as update packages, direct file copy, or Microsoft Web Deploy. There are no JSS-specific considerations around file deployment.