---
name: shared-content
routeTemplate: ./data/component-templates/guide.yml
title: Shared Content
---

# Centrally-Managed Shared Content

## Value
As Content Authors create new pages, they don't need to worry about adding in the shared content. This saved them a lot of time and eliminates the risk of user error.

Additionally, if the content within the static layouts ever needs to be updated, a Content Author only needs to make the update in one place, and the change automatically propagates to all pages.


## If using JSS with SXA

### Implementation instructions
[SXA Docs - Page Designs](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/page-designs.html)

[SXA Docs - Share content between JSS sites](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/share-content-between-jss-sites.html)


## If using JSS without SXA

JSS provides a feature called `static layouts`, which enables injecting the output of an entire route into the layout service context of every route on a JSS app. In other words, you can create static routes for page snippets like "header, "footer", or "navigation", and these snippets will be automatically inserted into every regular route, essentially urning them into centrally-managed shared content.

Note that this technique is not limited to headers and footers; it can be used for any logical component grouping. Headers and footers are just the most common use-case as they typically stay the same throughout the entire app.

The way this works is that the output of an entire "static" route (i.e. a route item with layout called 'navigation') is injected into the layout service context for every route on a JSS app, including 404 pages.


### Implementation instructions
[JSS Docs - Using Layout Service Static Context Rendering](https://jss.sitecore.com/docs/techniques/extending-layout-service/layoutservice-static-context-rendering)

