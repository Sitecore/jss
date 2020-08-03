---
name: extending-graphql
routeTemplate: ./data/component-templates/guide.yml
title: Extending GraphQL
---

## Schema Stitching
Schema stitching is the process of creating a single GraphQL schema from multiple underlying GraphQL APIs.
![](/assets/img/guides/schema-stitching.png)
 
Schema stitching can also be used to customize an existing GraphQL API. For example:
 
- You want to extend the schema of an existing GraphQL API by adding more fields to an existing type whose data comes from another data source
- You want to rename the root fields and types of a GraphQL API, for example if you want to change “snake_casing” to “CamelCase”
- You want to add custom resolvers or override existing resolvers of a GraphQL service such as Hasura GraphQL Engine.

Examples of how schema stitching can be found in this blog post - ["The Ultimate Guide to Schema Stitching in GraphQL" by Rishichandra Wawhal](https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/) 

### Recommended practices when schema stitching

Two noteworthy pages from Apollo docs:
- [https://www.apollographql.com/docs/graphql-tools/schema-stitching/](https://www.apollographql.com/docs/graphql-tools/schema-stitching/) 
- [https://www.apollographql.com/docs/apollo-server/features/schema-stitching/](https://www.apollographql.com/docs/apollo-server/features/schema-stitching/) 

There is a new approach created by Apollo, called `Apollo Federation` allowing to implement GraphQL in a micro-service architecture. It replaces schema stitching and solves pain points such as coordination, separation of concern etc. Check out the [Apollo Blog](https://www.apollographql.com/blog/apollo-federation-f260cf525d21) for details.

## Integrated vs Connected mode

With integrated GraphQL, the format of the route data returned for a specific component by the Sitecore Layout Service can be modified into the result of a GraphQL query. This means that you can define a GraphQL query that defines the data you require to power a frontend component, and then receive the data from that query back as a property (i.e. props.fields for a React component). This gives you tight control over getting only what data you need, and also gives you the power of GraphQL if you require advanced data sources such as child items or CRM data.

With connected GraphQL, a JSS app makes direct HTTP requests to a Sitecore GraphQL endpoint. This mode is identical to using a GraphQL API in any JavaScript application, and is not JSS-specific. Usage of a JS GraphQL client is recommended, such as Apollo Client (this is used in the sample apps).

Additional info is available in the [JSS GraphQL Docs](https://jss.sitecore.com/docs/fundamentals/services/graphql).

## References
- ["The Ultimate Guide to Schema Stitching in GraphQL" by Rishichandra Wawhal](https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/) 
- ["Sitecore JSS: Create your own GraphQL schema" by Gary Wenneker](https://gary.wenneker.org/sitecore-jss-create-you-own-graphql-schema/) 