---
name: overview
routeTemplate: ./data/component-templates/article.yml
title: Layout Service Overview
---

# Layout Services and APIs



To fetch and use Sitecore layout information in your JSS application, you use the [JSS Layout API](#jss-layout-api). 
## Sitecore endpoints for layout data
You have several options for retrieving layout information for your Sitecore items: 
- [Sitecore Layout Service](#sitecore-layout-service), 
- [Sitecore Experience Edge for XM](#sitecore-experience-edge-for-xm) or 
- [Sitecore GraphQL](#sitecore-graphql).
### Layout Service
The [Sitecore Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) is a REST endpoint providing structured layout information for your Sitecore items.
### Sitecore Experience Edge for XM
[Sitecore Experience Edge for XM](https://doc.sitecore.com/developers/101/developer-tools/en/introducing-sitecore-experience-edge-for-xm.html) comes with a read-only GraphQL schema that is designed to accommodate common front-end use cases for headless Sitecore development. Read about the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
### Sitecore GraphQL
[Sitecore GraphQL API](/docs/fundamentals/services/graphql) is an implementation of a GraphQL server on top of Sitecore. The Sitecore GraphQL schema mirrors the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
## JSS Layout API
The [JSS Layout API](/docs/fundamentals/services/layout/jss-layout-api) is a suite of services, clients and data fetchers for either REST or GraphQL.
