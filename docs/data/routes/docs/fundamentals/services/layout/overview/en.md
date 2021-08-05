---
name: overview
routeTemplate: ./data/component-templates/article.yml
title: Layout Services and APIs
---
# Layout Services and APIs

To fetch and use Sitecore layout information in your JSS application, you use the [JSS Layout API](#jss-layout-api). 

## Sitecore endpoints for layout data

There are several options for fetching dictionaries from Sitecore: 

- Call the [REST Layout Service endpoint](/docs/fundamentals/services/layout/sitecore-layout-service) provided by Headless Services.
<!-- @TODO - Ask about product name for the endpoint with mirrored-edge schema -->
- Query the [Sitecore Edge Preview GraphQL endpoint](#sitecore-graphql) provided by Headless Services. 
- Query the GraphQL endpoint provided by [Sitecore Experience Edge for XM](#sitecore-experience-edge-for-xm).
- Query the original [Sitecore GraphQL Endpoint](/docs/techniques/graphql/graphql-overview#configuring-a-graphql-endpoint). This endpoint is currently used by React, Angular and Vue sample applications versions 18.0.0 and earlier.

### REST Layout Service
The [Sitecore REST layout Service endpoint](/docs/fundamentals/services/layout/sitecore-layout-service) is a REST endpoint providing app-specific layout data.
### Sitecore Edge Preview GraphQL
[Sitecore Edge Preview GraphQL API](/docs/fundamentals/services/graphql) is an implementation of a GraphQL server on top of Sitecore. The Sitecore GraphQL schema mirrors the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
### Sitecore Experience Edge for XM
[Sitecore Experience Edge for XM](https://doc.sitecore.com/developers/101/developer-tools/en/introducing-sitecore-experience-edge-for-xm.html) comes with a read-only GraphQL schema that is designed to accommodate common front-end use cases for headless Sitecore development. Read about the [Experience Edge schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).
### Sitecore GraphQL Endpoint
The [Sitecore GraphQL Endpoint](/docs/techniques/graphql/graphql-overview#configuring-a-graphql-endpoint), the first-ever introduced by JSS Server Components, is currently used only by React, Angular and Vue sample applications provided by JSS versions 18.0.0 and earlier.

## JSS Layout API
When using JSS, you can get layout data from any of the endpoints mentioned earlier, without worrying about data fetching implementation details. The [JSS Layout API](/docs/fundamentals/services/layout/jss-layout-api) abstracts data fetching implementation details into services, clients and data fetchers for both REST and GraphQL endpoints. See some [usage examples](/docs/fundamentals/services/layout/jss-layout-api#examples).