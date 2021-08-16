---
name: overview
routeTemplate: ./data/component-templates/article.yml
title: Dictionary Services and APIs
---

# Dictionary Services and APIs

Often, multilingual apps need a dictionary of static phrases that require translation. Commonly this would be items such as form labels, global navigation items, footers, etc. 

## Sitecore endpoints for dictionary data

There are several options for fetching dictionaries from Sitecore: 

- Call the [REST Dictionary Service endpoint](/docs/fundamentals/services/dictionary/sitecore-dictionary-service) provided by Headless Services.
<!-- @TODO - Ask about product name for the endpoint with mirrored-edge schema -->
- Query the [Sitecore Edge Preview GraphQL endpoint](#sitecore-graphql) provided by Headless Services. 
- Query the GraphQL endpoint provided by [Sitecore Experience Edge for XM](#sitecore-experience-edge-for-xm).
- Query the original [Sitecore GraphQL Endpoint](/docs/techniques/graphql/graphql-overview#configuring-a-graphql-endpoint). This endpoint is currently used by React, Angular and Vue sample applications versions 18.0.0 and earlier.

### REST Dictionary Service
The [Sitecore REST Dictionary Service endpoint](/docs/fundamentals/services/dictionary/sitecore-dictionary-service) is a REST endpoint providing app-specific dictionary data.
### Sitecore Edge Preview GraphQL
[Sitecore Edge Preview GraphQL API](https://doc.sitecore.com/en/developers/101/developer-tools/the-architecture-of-sitecore-experience-edge-for-xm.html#the-preview-graphql-endpoint_body) is an implementation of a GraphQL server on top of Sitecore. The Sitecore GraphQL schema mirrors the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
### Sitecore Experience Edge for XM
[Sitecore Experience Edge for XM](https://doc.sitecore.com/developers/101/developer-tools/en/introducing-sitecore-experience-edge-for-xm.html) comes with a read-only GraphQL schema that is designed to accommodate common front-end use cases for headless Sitecore development. Read about the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
### Sitecore GraphQL Endpoint
The [Sitecore GraphQL Endpoint](/docs/techniques/graphql/graphql-overview#configuring-a-graphql-endpoint), the first-ever introduced by JSS Server Components, is currently used only by React, Angular and Vue sample applications provided by JSS versions 18.0.0 and earlier.

## JSS Dictionary API
When using JSS, you can get dictionary data from any of the endpoints mentioned earlier, without worrying about data fetching implementation details. The [JSS Dictionary API](/docs/fundamentals/services/dictionary/jss-dictionary-api) abstracts data fetching implementation details into services, clients and data fetchers for both REST and GraphQL endpoints. See some [usage examples](/docs/fundamentals/services/dictionary/jss-dictionary-api#examples).
