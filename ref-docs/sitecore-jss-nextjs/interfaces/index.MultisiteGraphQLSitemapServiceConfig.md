[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / MultisiteGraphQLSitemapServiceConfig

# Interface: MultisiteGraphQLSitemapServiceConfig

[index](../modules/index.md).MultisiteGraphQLSitemapServiceConfig

Configuration options for

**`See`**

GraphQLSitemapService instances

## Hierarchy

- `BaseGraphQLSitemapServiceConfig`

  ↳ **`MultisiteGraphQLSitemapServiceConfig`**

## Table of contents

### Properties

- [clientFactory](index.MultisiteGraphQLSitemapServiceConfig.md#clientfactory)
- [excludedPaths](index.MultisiteGraphQLSitemapServiceConfig.md#excludedpaths)
- [includePersonalizedRoutes](index.MultisiteGraphQLSitemapServiceConfig.md#includepersonalizedroutes)
- [includedPaths](index.MultisiteGraphQLSitemapServiceConfig.md#includedpaths)
- [pageSize](index.MultisiteGraphQLSitemapServiceConfig.md#pagesize)
- [sites](index.MultisiteGraphQLSitemapServiceConfig.md#sites)

## Properties

### clientFactory

• **clientFactory**: [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Inherited from

BaseGraphQLSitemapServiceConfig.clientFactory

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:142](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L142)

___

### excludedPaths

• `Optional` **excludedPaths**: `string`[]

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

BaseGraphQLSitemapServiceConfig.excludedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:88](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L88)

___

### includePersonalizedRoutes

• `Optional` **includePersonalizedRoutes**: `boolean`

A flag for whether to include personalized routes in service output - only works on XM Cloud
turned off by default

#### Inherited from

BaseGraphQLSitemapServiceConfig.includePersonalizedRoutes

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:137](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L137)

___

### includedPaths

• `Optional` **includedPaths**: `string`[]

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

BaseGraphQLSitemapServiceConfig.includedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:84](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L84)

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:95](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L95)

___

### sites

• **sites**: `string`[]

Names of the configured sites

#### Defined in

[sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:19](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L19)
