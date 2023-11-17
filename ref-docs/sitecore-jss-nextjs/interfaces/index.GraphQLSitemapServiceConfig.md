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

- [apiKey](index.GraphQLSitemapServiceConfig.md#apikey)
- [clientFactory](index.GraphQLSitemapServiceConfig.md#clientfactory)
- [endpoint](index.GraphQLSitemapServiceConfig.md#endpoint)
- [excludedPaths](index.GraphQLSitemapServiceConfig.md#excludedpaths)
- [includePersonalizedRoutes](index.GraphQLSitemapServiceConfig.md#includepersonalizedroutes)
- [includedPaths](index.GraphQLSitemapServiceConfig.md#includedpaths)
- [pageSize](index.GraphQLSitemapServiceConfig.md#pagesize)
- [siteName](index.GraphQLSitemapServiceConfig.md#sitename)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

The API key to use for authentication.

**`Deprecated`**

use

**`Param`**

property instead

#### Inherited from

BaseGraphQLSitemapServiceConfig.apiKey

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:144](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L144)

___

### clientFactory

• `Optional` **clientFactory**: [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Inherited from

BaseGraphQLSitemapServiceConfig.clientFactory

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:155](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L155)

___

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Inherited from

BaseGraphQLSitemapServiceConfig.endpoint

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:138](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L138)

___

### excludedPaths

• `Optional` **excludedPaths**: `string`[]

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

BaseGraphQLSitemapServiceConfig.excludedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:89](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L89)

___

### includePersonalizedRoutes

• `Optional` **includePersonalizedRoutes**: `boolean`

A flag for whether to include personalized routes in service output - only works on XM Cloud
turned off by default

#### Inherited from

BaseGraphQLSitemapServiceConfig.includePersonalizedRoutes

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:150](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L150)

___

### includedPaths

• `Optional` **includedPaths**: `string`[]

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

BaseGraphQLSitemapServiceConfig.includedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:85](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L85)

___

### pageSize

• `Optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`Default`**

100

#### Inherited from

BaseGraphQLSitemapServiceConfig.pageSize

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:96](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L96)

___

### siteName

• **siteName**: `string`

Name of the site to retrieve site paths for

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:25](https://github.com/Sitecore/jss/blob/2e88122cf/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L25)
