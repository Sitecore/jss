---
name: content-patterns
routeTemplate: ./data/component-templates/guide.yml
title: Content Patterns
---

> ⚠️ **Content Wanted** - What other multisite-specific content requirements do you come across?

## Globally-Managed Shared Content

### Technique Overview
Globally-managed shared content is content that's rendered on multiple pages (or even multiple sites). As the name implies, this content is managed globally, so there is a single set of data source items that all the pages refer to, and updating the content in these items automatically propagates the changes to all the places where this content is referenced.

Additionally, a common requirement is the need for the components that render these shared data sources to be automatically injected into specific placeholders (ex. Header and Footer). With this functionality, every time Content Authors create new pages, the pages are automatically pre-populated with the shared content. This automation saves authors time and eliminates the risk of user error. 

### If using JSS with SXA
SXA provides this functionality OOTB; the feature is called `Partial Designs`. This feature is available in JSS Sites built with the SXA integration.

Implementation instructions:
- [SXA Docs - Page Designs](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/page-designs.html)
- [SXA Docs - Share content between JSS sites](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/share-content-between-jss-sites.html)

> See [SXA Integration](/guides/multisite/sxa-integration) for more information on JSS with SXA.

### If using JSS without SXA

JSS provides a feature called `static layouts` (aka `static context renderings`), which enables injecting the entire output of a specific route into the layout service context of *all* routes. In other words, you can create a static route for any grouping of components that compose a reusable "page snippet". For example: header, footer, navigation. These snippets will be automatically inserted into every regular route, essentially turning them into centrally-managed shared content.

Note that this technique is not limited to headers and footers; it can be used for any logical component grouping. Headers and footers are just the most common use-case as they typically stay the same throughout the entire app.

The way this works is that the output of an entire "static" route (i.e. a route item with layout called 'navigation') is injected into the layout service context for every route on a JSS app, including 404 pages.


Implementation instructions: [JSS Docs - Using Layout Service Static Context Rendering](/docs/techniques/extending-layout-service/layoutservice-static-context-rendering)

