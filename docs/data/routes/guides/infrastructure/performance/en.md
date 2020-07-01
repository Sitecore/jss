---
name: performance
routeTemplate: ./data/component-templates/guide.yml
title: Performance
---

# Performance

## Utilizing Cache
### Sitecore Cache
Enable Sitecore HTML cache (aka output cache or component cache) on components or groups of components that get reused often (ex. Header, Footer), and on process-intensive components.

Avoid caching personalized components, unless a custom way to fetch personalized data has been added.

Follow the  [official guidelines for enabling and configuring HTML caching](https://doc.sitecore.com/developers/93/platform-administration-and-architecture/en/configure-html-component-cache-values.html) .
 
* Use HTTP cache headers to make browsers cache static assets that don’t change often
Reference:  [“Increasing Application Performance with HTTP Cache Headers” by Heroku](https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers) 
 
* Avoid using JavaScript Renderings unless there’s absolutely no other way. This type of rendering initializes a new Node instances for each rendering, for even having more than 2-3 on a page can noticeably influence load times.

### Node Server Cache

> Warning: Node is a 3rd party software, so using Node caching modules is not something supported by Sitecore. Since the output from Node is the HTML for the entire page, Node caching is all-or-nothing. In other words, if you are using personalization on parts of the page, there is no way to tell Node to exclude parts of the page from the cache.

Node caching modules:
- https://www.npmjs.com/package/node-cache
- https://www.npmjs.com/package/node-cache-redis

Considerations - implementing a cache-invalidation strategy

## Check Framework-Specific Guides
Every framework provides guidance on configuration changes that should be turned on in production that enable additional optimizations.

- [React's 'Optimizing Performance' Guide](https://reactjs.org/docs/optimizing-performance.html)
- [Vue's 'Production Deployment' Guide](https://vuejs.org/v2/guide/deployment.html)
- [Angular's 'Production optiimizations' Guide](https://angular.io/guide/deployment#production-optimizations)
