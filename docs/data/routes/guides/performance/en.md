---
name: performance
routeTemplate: ./data/component-templates/guide.yml
title: Performance Guide
---
Performance Optimization is a complex topic because different optimizations can be enacted at each layer of the web stack. It's not a "front-end problem" or "back-end problem" or a "devops problem". Everyone involved in building and deploying the app should analyze their slice of the stack and work together to adhere to a [performance budget](https://web.dev/performance-budgets-101/).

## Cache as much of the things as you can!

> ⚠️ TODO: The [caching page in Docs](/docs/techniques/performance/caching) has addition content and examples on this topic. Need to merge together (probably under guides).

### Sitecore cache

Enable Sitecore HTML cache (aka output cache or component cache) on components or groups of components that get reused often (ex. Header, Footer), and on process-intensive components.

Avoid caching personalized components, unless a custom way to fetch personalized data has been added.

Follow the  [official guidelines for enabling and configuring HTML caching](https://doc.sitecore.com/developers/93/platform-administration-and-architecture/en/configure-html-component-cache-values.html) .
 
* Use HTTP cache headers to make browsers cache static assets that don’t change often
Reference:  [“Increasing Application Performance with HTTP Cache Headers” by Heroku](https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers) 
 
* Avoid using JavaScript Renderings unless there’s absolutely no other way. This type of rendering initializes a new Node instances for each rendering, for even having more than 2-3 on a page can noticeably influence load times.

### Node Server Cache

> Warning: Node is a 3rd party software, so using Node caching modules is not something supported by Sitecore. Since the output from Node is the HTML for the entire page, Node caching is all-or-nothing. In other words, if you are using personalization on parts of the page, there is no way to tell Node to exclude parts of the page from the cache.

Node caching modules:
- [Node Cache](https://www.npmjs.com/package/node-cache)
- [Node Redis Cache](https://www.npmjs.com/package/node-cache-redis)

Considerations: implement a cache-invalidation strategy

### Service worker and HTTP cache

Refer to [this guide](https://web.dev/service-worker-caching-and-http-caching/) from Google Developers

---

### Minimize Requests to the Server

A common pitfall we've noticed teams stumble on is setting up routing in such a way that every route-change by the end-user loads an SSR-ed page. This makes node a bottle-neck for your app, and wastes all those great built-in optimizations that front-end frameworks contain for working with the DOM in a browser. The expected behavior for a SPA is that, only the first page that the end-user loads is SSR-ed. Afterwards, client-side rendering should take over, and as the end-user navigates through the site, routes load via CSR.

> If you're not sure whether your app is set up correctly, inspect the Network tab as you change routes. If the response from the server is Layout Service JSON only, then all is good. But if you're getting back a full HTML page each time, then you are experiencing the above issue. For instructions on how to resolve this, see the [routing guide](/guides/code-patterns-routing).

---

## Infrastructure

### Node clusters

By default, Node executes code on a **single thread** (for memory efficiency). The `Cluster` module allows you to handle a greater processing load by taking advantage of multi-core systems and create child processes that each run on their own single thread.

Generally speaking, it's a good idea to have at least as many node processes as physical/virtual/hyper-threaded cores. Performance testing will give the best guidance for fine-tuning this in a specific codebase/environment.

[Node docs: how to run a cluster](https://nodejs.org/api/cluster.html)

### Azure WebApps
It's technically possible to have the CD server and Node.js running on a single WebApp, but this is not recommended. Sharing the service plan means sharing the Azure CPU resources between Node and CD, which can have unpredictable results for scalability. The best solution for scaling is to have dedicated app service plans for the headless Node rendering farm and the CDs.

---

## Integrated Mode in Prod
To clarify some confusion about [application modes](https://jss.sitecore.com/docs/fundamentals/application-modes), we want to reiterate that in Production,
- Content Management servers must use Integrated mode (this is required to support Experience Editor)
- Content Delivery servers are recommended to avoid using Integrated Mode because it does not scale well and cannot support high traffic.

---

## Enable Keep-alive
`keep-alive` is an HTTP mechanism that allows the same TCP connection to be kept open and reused across many HTTP requests. It reduces the amount of hand-shaking, and thus latency, for every request that’s kept alive by reusing one TCP connection.

- **For responses handled by Node**: `keep-alive` is not enabled by default in Node servers, unless the [agentkeepalive package](https://www.npmjs.com/package/agentkeepalive) is installed.
- **For all other responses** (for example, API calls that bypass the Node proxy): add `Connection: keep-alive` to the response headers.

Reference and additional information: [Microsoft Docs - Troubleshooting intermittent outbound connection errors in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-intermittent-outbound-connection-errors#node)

Note: `keep alive` will be included in future versions of the `node-proxy` sample. [Git reference](https://github.com/Sitecore/jss/blob/keep-alive-feature/samples/node-headless-ssr-proxy/config.js#L31).


> Special thank you to [Una Verhoeven](https://twitter.com/unaverhoeven) for insights on this topic.

---

## Reference Framework-Specific Guides
Every framework provides guidance on configuration changes that should be turned on in production that enable additional optimizations.

- [React's 'Optimizing Performance' Guide](https://reactjs.org/docs/optimizing-performance.html)
- [Vue's 'Production Deployment' Guide](https://vuejs.org/v2/guide/deployment.html)
- [Angular's 'Production optimizations' Guide](https://angular.io/guide/deployment#production-optimizations)

---

## Don't forget the browser layer
All the little rules we've heard over the years - avoid JS bloat, avoid render-blocking scripts above the fold, defer image loading, etc - individually, they may seem insignificant compared to the huge boosts seen by something like enabling `keep-alive`, - but together they do add up and they do impact your front-end load speeds. Modern browsers come with amazing developer tools that not only identify these issues, but tell us how to fix them.

Reference [Google Developers' guide "Fast load times"](https://web.dev/fast/) for a large collection of guides on this topic.
