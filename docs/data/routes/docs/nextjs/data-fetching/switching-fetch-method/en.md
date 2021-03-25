---
name: switching-fetch-method
routeTemplate: ./data/component-templates/article.yml
title: Switching between REST and GraphQL
---
# Walkthrough: Switching between REST and GraphQL for Layout and Dictionary data

The Next.js sample application can use either the Sitecore Layout Service REST API or the Sitecore GraphQL "Edge" schema to fetch layout and dictionary data.

> See [Layout Service API reference](/docs/fundamentals/services/layout-service) and [Dictionary Service API reference](/docs/fundamentals/services/dictionary-service) for more information.

You can change the data-fetching method after project creation. 

## From REST to GraphQL

To switch the Next.js sample application from REST to GraphQL:

1. Move or delete `\lib\dictionary-service-factory.ts`.
2. Download [`dictionary-service-factory.graphql.ts`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/dictionary-service-factory.graphql.ts) to `\lib\`. 
3. Rename as `dictionary-service-factory.ts`.

## From GraphQL to REST

To switch the Next.js sample application from GraphQL to REST:

1. Move or delete `\lib\dictionary-service-factory.ts`.
2. Download [`dictionary-service-factory.ts`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/dictionary-service-factory.ts) to `\lib\`.