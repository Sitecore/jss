---
name: overview
routeTemplate: ./data/component-templates/article.yml
title: Dictionary Services and APIs
---

# Dictionary Services and APIs

Often, multilingual apps need a dictionary of static phrases that require translation. Commonly this would be items such as form labels, global navigation items, footers, etc. 

## Sitecore endpoints for dictionary data

There are several options for fetching dictionaries from Sitecore: 

- Call the [Dictionary Service REST endpoint](/docs/fundamentals/services/dictionary/sitecore-dictionary-service) provided by Headless Services.
- Query the [GraphQL endpoint](#sitecore-graphql) provided by Headless Services.
- Query the GraphQL endpoint provided by [Sitecore Experience Edge for XM](#sitecore-experience-edge-for-xm).

### Dictionary Service
The [Sitecore Dictionary Service](/docs/fundamentals/services/dictionary/sitecore-dictionary-service) is a REST endpoint providing app-specific dictionary data.
### Sitecore GraphQL
[Sitecore GraphQL API](/docs/fundamentals/services/graphql) is an implementation of a GraphQL server on top of Sitecore. The Sitecore GraphQL schema mirrors the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
### Sitecore Experience Edge for XM
[Sitecore Experience Edge for XM](https://doc.sitecore.com/developers/101/developer-tools/en/introducing-sitecore-experience-edge-for-xm.html) comes with a read-only GraphQL schema that is designed to accommodate common front-end use cases for headless Sitecore development. Read about the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
## JSS Dictionary API
When using JSS, front-end developers can get dictionary data from any of the endpoints mentioned earlier, without worrying about data fetching implementation details. The [JSS Dictionary API](/docs/fundamentals/services/dictionary/jss-dictionary-api) abstracts data fetching implementation details into services, clients and data fetchers for both REST and GraphQL endpoints. See some [usage examples](/docs/fundamentals/services/dictionary/jss-dictionary-api#examples).
