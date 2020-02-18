---
name: caching
routeTemplate: ./data/component-templates/article.yml
title: Caching
---

# Caching

## Sitecore Output Caching in MVC vs JSS
Sitecore caching in JSS does not work the same way as it does in MVC.

![Sitecore output caching](/assets/img/sitecore-output-caching.png)

In MVC, output caching saves the **HTML** that is returned by the renderRendering pipeline for any rendering which has caching enabled. So on subsequent requests, we already have the HTML for the rendering and no additional processing needs to be performed.

On the other hand, in JSS, output caching saves the **JSON** that is returned by the Layout Service for any component that has caching enabled. The JavaScript layer takes that JSON as input and generates HTML. This part of the process - processing JSON to HTML in the JavaScript layer - needs to happen on every requests.

## Caching in Headless Mode
If you are dissatisfied with the performance of your headless JSS app:

1. The recommended first line of defense is ensuring that output caching is enabled. As described above, this will cache JSON fragments within Layout Service, which will make the Layout Service scale better, thereby increasing the maximum throughput of the rendering engine. But this has no effect on the CPU cycles needed for server-side rendering JavaScript.

2. The next measure is to implement cache in the JavaScript layer. Here are some examples of what you can do:
    - Add “memory caching” to the Node server to save JSON for a route and reuse it
    - Add “memory caching” to the Node server to save the HTML output of the entire route (all-or-nothing caching) in scenarios where caching the the entire page is acceptable
    - Dynamically prerender routes and save to Node memory on a regular interval
    - If implementing a PWA, utilize service workers and browser cache strategies

> When a page is server-side rendered, Node renders the entire page as one block of HTML, not as individual renderings

## Cache Pitfalls of Integrated Mode

We discourage Integrated Mode in production. However, if you choose to use Integrated Mode, this is what you need to know regarding caching. Since the entire page is server-side rendered as one block of HTML, not as individual renderings, traditional output caching mechanisms become all-or-nothing. In other words, when caching is enabled, the entire page is cached. This is rarely the desired outcome.

