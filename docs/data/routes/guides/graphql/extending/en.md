---
name: extending-graphql
routeTemplate: ./data/component-templates/guide.yml
title: Extending GraphQL
---

# Extending GraphQL

## Schema Stitching
Schema stitching is the process of creating a single GraphQL schema from multiple underlying GraphQL APIs.
![](/assets/img/guides/schema-stitching.png)
 
Schema stitching can also be used to customize an existing GraphQL API. For example:
 
- You want to extend the schema of an existing GraphQL API by adding more fields to an existing type whose data comes from another data source

- You want to rename the root fields and types of a GraphQL API, for example if you want to change “snake_casing” to “CamelCase”

- You want to add custom resolvers or override existing resolvers of a GraphQL service such as Hasura GraphQL Engine.

Examples of how to stich GraphQL can be found here -  [https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/](https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/) 

Best practices by Apollo
- [https://www.apollographql.com/docs/graphql-tools/schema-stitching/](https://www.apollographql.com/docs/graphql-tools/schema-stitching/) 
- [https://www.apollographql.com/docs/apollo-server/features/schema-stitching/](https://www.apollographql.com/docs/apollo-server/features/schema-stitching/) 

There is a new approach created by Apollo, called Apollo Federation allowing to implement GraphQL in a micro-service architecture. It replaces schema stitching and solves pain points such as coordination, separation of concern etc. More information here:  [https://www.apollographql.com/blog/apollo-federation-f260cf525d21](https://www.apollographql.com/blog/apollo-federation-f260cf525d21) 

## Integrated vs Connected mode

With integrated GraphQL, the format of the route data returned for a specific component by the Sitecore Layout Service can be modified into the result of a GraphQL query. This means that you can define a GraphQL query that defines the data you require to power a frontend component, and then receive the data from that query back as a property (i.e. props.fields for a React component). This gives you tight control over getting only what data you need, and also gives you the power of GraphQL if you require advanced data sources such as child items or CRM data.

With connected GraphQL, a JSS app makes direct HTTP requests to a Sitecore GraphQL endpoint. This mode is identical to using a GraphQL API in any JavaScript application, and is not JSS-specific. Usage of a JS GraphQL client is recommended, such as Apollo Client which is used in the samples.

From [https://jss.sitecore.com/docs/fundamentals/services/graphql](https://jss.sitecore.com/docs/fundamentals/services/graphql) also contains info on when to use each of them

#### References
- [https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/](https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/) 
- [https://gary.wenneker.org/sitecore-jss-create-you-own-graphql-schema/](https://gary.wenneker.org/sitecore-jss-create-you-own-graphql-schema/) 