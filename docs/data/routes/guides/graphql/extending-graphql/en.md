---
name: extending-graphql
routeTemplate: ./data/component-templates/guide.yml
title: Guide to Extending GraphQL
---

## Create your own GraphQL schema

### Sitecore Developer Documentation
[Create GraphQL schemas](https://doc.sitecore.com/developers/100/sitecore-experience-manager/en/create-graphql-schemas.html)

### Community Guide
["Sitecore JSS: Create your own GraphQL schema"](https://gary.wenneker.org/sitecore-jss-create-you-own-graphql-schema/) by Gary Wenneker

---

## Schema stitching
Schema stitching is the process of creating a single GraphQL schema from multiple underlying GraphQL APIs.
![](/assets/img/guides/schema-stitching.png)

Schema stitching can also be used to customize an existing GraphQL API. For example:

- You want to extend the schema of an existing GraphQL API by adding more fields to an existing type whose data comes from another data source

- You want to rename the root fields and types of a GraphQL API, for example if you want to change "snake_casing" to "CamelCase"

- You want to add custom resolvers or override existing resolvers of a GraphQL service such as [Hasura GraphQL Engine]((https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/)).

### Community Guide
["The Ultimate Guide to Schema Stitching in GraphQL"](https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/) by Rishichandra Wawhal

### Recommended practices from Apollo
Noteworthy articles from Apollo docs:
- [https://www.apollographql.com/docs/graphql-tools/schema-stitching/](https://www.apollographql.com/docs/graphql-tools/schema-stitching/)

- [https://www.apollographql.com/docs/apollo-server/features/schema-stitching/](https://www.apollographql.com/docs/apollo-server/features/schema-stitching/)

There is a new approach created by Apollo, called `Apollo Federation` allowing to implement GraphQL in a micro-service architecture. It replaces schema stitching and solves pain points such as coordination, separation of concern etc. Check out the [Apollo Blog](https://www.apollographql.com/blog/apollo-federation-f260cf525d21) for details.

---

## Customizing Integrated GraphQL

### Community guide

[Extending Sitecore JSS GraphQL: Adding Additional Content Search Functionality](https://www.adamlamarre.com/extending-sitecore-jss-graphql-adding-additional-content-search-functionality/) by Adam Lamarre. This blog post demonstrates how to creating custom operators for Integrated GraphQL.
  - [GitHub Repo](https://github.com/erzr/SitecoreJSSGraphQLCustomQuery/blob/master/Conditions/ConditionsCondition.cs)
