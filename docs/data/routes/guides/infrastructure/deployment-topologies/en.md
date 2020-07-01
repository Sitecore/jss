---
name: deployment-topologies
routeTemplate: ./data/component-templates/guide.yml
title: Deployment Topologies
---

# Deployment Topologies

## Integrated Mode
[JSS Docs reference](/docs/techniques/devops#integrated-topology)

Used mainly for CM, as the Node service is hosted on the same server as the Sitecore instance, thus making them share the same resources like Memory and CPU. This makes the topology not suitable for high user loads.

It is required for CM in order for the `Experience Editor` to be able to render the application and be editable.
 
## Headless Mode with SSR
[JSS Docs reference](https://jss.sitecore.com/docs/fundamentals/application-modes#headless-server-side-rendering-mode) 

In a headless topology, a traditional Sitecore XP (or XM) deployment is turned into an API server that serves content and layout data - with personalization pre-applied.
So when running in headless mode, the Sitecore CD servers do not directly serve the public website. Instead, a cluster of inexpensive Node.js servers host the public-facing website.

Pros
* Sample config provided OOTB
* Pre-rendered HTML = good SEO
* Sitecore behind proxy = good security
* Scale Node and CDs separately

In Headless Proxy with Server Side Rendering (SSR) topology, the JavaScript front-end is physically decoupled from the Sitecore back-end. Node servers act as a proxy between Sitecore Content Delivery servers and the end-user’s browser. They make requests to the JSS APIs running on the CD servers and then render the JSS application to HTML before returning it to the client.
Note on the diagram that when we talk about Headless Proxy topology, the proxy aspect only applies to CD servers. CMs still use integrated mode.
A common misconception is that as the end-user browses the app, every route loads from server-side rendered html. But the way it works is that only the user’s first request to the app comes from the server, and subsequent route navigation is processed client-side.
Server-side rendering is good for SEO, and having Sitecore behind a proxy is good for security.
This is generally a fine option for most clients on JSS, until we get to enterprise-level apps, where traffic is exceptionally high.
 
Scaling
In Headless Proxy with Server Side Rendering, The Sitecore CDs and Node servers can scale separately. Proper load testing is required to find the best ratio of CD to Nodes for your specific codebase. But if you have no idea where to start, 2 Node servers for every CD is a reasonable starting point.
 
Rendering JavaScript server-side takes CPU resources, and scaling it takes more of them. So you can’t scale Sitecore CD’s without adding more Node rendering instances. You’d want at least as many node processes as number of cores – this is achieved via node clusters.
 
 
## API Only
 [https://jss.sitecore.com/docs/fundamentals/application-modes#api-only-mode](https://jss.sitecore.com/docs/fundamentals/application-modes#api-only-mode) 
 
Allows for Sitecore to be utilized though its headless APIs providing JSON to any platform or service, as long as it is an authenticated request. NodeJS is not required for rendering the application. Keep in mind that separate requests have to be made for each route and service.

The only OOTB caching technique would be Output Caching, enabled from the Content Editor.
This can have impact on performance.
 
## CSR
Client Side Rendering allows to offload the application rendering to the Client, instead of being performed by NodeJS.

When the user visits the site, the server sends the index.html together with the JavaScript files, the work of rendering the JS app is handled by the browser.
This would allow to save costs from infrastructure as the load on the servers would be greatly reduced.

On the other hand, using this approach there might be negative performance boost, as if the application requires heavy rendering, it might slow down the site for the user.
 
The main concern for CSR applications is the SEO results. Google is fine at crawling single page apps, but not all search engines are. So the client’s locale affects whether this is a feasible option.

[https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) 
 
## Prerender to CDN
### CDN with CSR
In CDN with client-side rendering topology, a CDN is used to serve static assets to the end-user, and the work of rendering the JavaScript app is offloaded to the browser.

The CM operates in Integrated mode as in Headless SSR and it is responsible to push the static JSS app assets that get generated on the CM at build time to a CDN. These assets consist of JavaScript files and a HTML file with the DOM root of the JSS app. Set up the CDN as a caching reverse proxy over the root domain and ensure it caches pre-rendered HTML pages, but not calls to Layout Service.

When the end-user initially loads the page, the static assets that are needed to process the app in browser are fetched from the CDN.

If there is personalized content, subsequent calls need to be made back to Layout Service after initial page load to fetch this data. Note that this portion of work can be delayed until a later phase if your project isn’t utilizing personalization yet.
 
In this topology, there is little server-side processing happening upon the end-user’s initial route request. All the DOM virtualizing and JavaScript execution work is distributed to the user’s browser. So the performance improvements are dramatic.

An extra benefit is decreased infrastructure cost. As you can see in the diagram, the CD environment doesn’t use any Node servers since the app is being client-side rendered.

The downside of this topology is the cost and risk associated with developing and maintaining this customization. Additionally, Google is fine at crawling single page apps, but not all search engines are. So the client’s locale affects whether this is a feasible option.

**Pros**
- Speed improvement
  - Virtual DOM rendering load on browsers
  - Lighter load on CD(s)

- Cost improvement (Don’t need Node server in CD topology; SSR still required on CM for Experience Editor)

**Cons**
- Cost addition (Extra complexity/development)

**Concerns**
- SEO

 
### CDN with SSR
Use CDN to serve pre-rendered app to end-user; call back to Layout Service for personalization data

CDN with server side pre-render topology is very similar to the CDN with CSR, except that the CDN is used to serve a pre-rendered app to the end-user instead of static assets.

When content authors make changes on the CM, the integrated Node service server-side renders the routes in the JSS app, and the resulting HTML gets pushed to a CDN. This could be hooked into a publish event. On initial page load, end-users load the server-side rendered app from the CDN. If there is personalized content, subsequent calls need to be made back to Layout Service after initial page load to fetch this data. And this portion of work can be delayed until a later phase if your project isn’t utilizing personalization yet.

Since the end-user is getting pre-loaded HTML on page-load, this approach poses no SEO concerns.

**Pros**
- Speed improvement
  - Fetch pre-rendered page via hyper fast CDN
  - Lighter load on CD(s)

- Cost reduction (Don’t need Node servers in CD topology_

**Cons**
- Cost addition (Extra development or hire agency)
