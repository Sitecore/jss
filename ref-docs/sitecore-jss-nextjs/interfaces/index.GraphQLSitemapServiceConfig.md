[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLSitemapServiceConfig

# Interface: GraphQLSitemapServiceConfig

[index](../modules/index.md).GraphQLSitemapServiceConfig

Configuration options for

**`See`**

GraphQLSitemapService instances

## Hierarchy

- `BaseGraphQLSitemapServiceConfig`

  ↳ **`GraphQLSitemapServiceConfig`**

## Table of contents

### Properties

- [clientFactory](index.GraphQLSitemapServiceConfig.md#clientfactory)
- [excludedPaths](index.GraphQLSitemapServiceConfig.md#excludedpaths)
- [includePersonalizedRoutes](index.GraphQLSitemapServiceConfig.md#includepersonalizedroutes)
- [includedPaths](index.GraphQLSitemapServiceConfig.md#includedpaths)
- [pageSize](index.GraphQLSitemapServiceConfig.md#pagesize)
- [siteName](index.GraphQLSitemapServiceConfig.md#sitename)

## Properties

### clientFactory

• **clientFactory**: [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Inherited from

BaseGraphQLSitemapServiceConfig.clientFactory

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:143](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L143)

___

### excludedPaths

• `Optional` **excludedPaths**: `string`[]

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

BaseGraphQLSitemapServiceConfig.excludedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:88](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L88)

___

### includePersonalizedRoutes

• `Optional` **includePersonalizedRoutes**: `boolean`

A flag for whether to include personalized routes in service output.
Only works on XM Cloud for pages using Embedded Personalization (not Component A/B testing).
Turned off by default.

#### Inherited from

BaseGraphQLSitemapServiceConfig.includePersonalizedRoutes

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:138](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L138)

___

### includedPaths

• `Optional` **includedPaths**: `string`[]

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

BaseGraphQLSitemapServiceConfig.includedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:84](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L84)

___

### pageSize

• `Optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`Default`**

```ts
100
```

#### Inherited from

BaseGraphQLSitemapServiceConfig.pageSize

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:95](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L95)

___

### siteName

• **siteName**: `string`

Name of the site to retrieve site paths for

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:25](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L25)
