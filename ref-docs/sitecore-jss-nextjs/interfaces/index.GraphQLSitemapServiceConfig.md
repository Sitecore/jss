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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:137](https://github.com/Sitecore/jss/blob/cf1ffc37b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L137)

---

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:132](https://github.com/Sitecore/jss/blob/cf1ffc37b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L132)

---

### excludedPaths

• `Optional` **excludedPaths**: `string`[]

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

BaseGraphQLSitemapServiceConfig.excludedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:84](https://github.com/Sitecore/jss/blob/cf1ffc37b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L84)

---

### includePersonalizedRoutes

• `Optional` **includePersonalizedRoutes**: `boolean`

A flag for whether to include personalized routes in service output - only works on XM Cloud
turned off by default

#### Inherited from

BaseGraphQLSitemapServiceConfig.includePersonalizedRoutes

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:143](https://github.com/Sitecore/jss/blob/cf1ffc37b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L143)

---

### includedPaths

• `Optional` **includedPaths**: `string`[]

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

BaseGraphQLSitemapServiceConfig.includedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:80](https://github.com/Sitecore/jss/blob/cf1ffc37b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L80)

---

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:91](https://github.com/Sitecore/jss/blob/cf1ffc37b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L91)

---

### siteName

• **siteName**: `string`

Name of the site to retrieve site paths for

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:25](https://github.com/Sitecore/jss/blob/cf1ffc37b/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L25)
