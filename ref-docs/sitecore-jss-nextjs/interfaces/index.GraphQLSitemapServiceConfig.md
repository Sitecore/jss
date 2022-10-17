[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLSitemapServiceConfig

# Interface: GraphQLSitemapServiceConfig

[index](../modules/index.md).GraphQLSitemapServiceConfig

Configuration options for @see GraphQLSitemapService instances

## Hierarchy

- `Omit`<`SiteRouteQueryVariables`, ``"language"``\>

  ↳ **`GraphQLSitemapServiceConfig`**

## Table of contents

### Properties

- [apiKey](index.GraphQLSitemapServiceConfig.md#apikey)
- [endpoint](index.GraphQLSitemapServiceConfig.md#endpoint)
- [excludedPaths](index.GraphQLSitemapServiceConfig.md#excludedpaths)
- [includePersonalizedRoutes](index.GraphQLSitemapServiceConfig.md#includepersonalizedroutes)
- [includedPaths](index.GraphQLSitemapServiceConfig.md#includedpaths)
- [pageSize](index.GraphQLSitemapServiceConfig.md#pagesize)
- [siteName](index.GraphQLSitemapServiceConfig.md#sitename)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:135](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L135)

___

### endpoint

• **endpoint**: `string`

Your Graphql endpoint

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:130](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L130)

___

### excludedPaths

• `Optional` **excludedPaths**: `string`[]

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

Omit.excludedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:83](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L83)

___

### includePersonalizedRoutes

• `Optional` **includePersonalizedRoutes**: `boolean`

A flag for whether to include personalized routes in service output - only works on XM Cloud
turned off by default

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:141](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L141)

___

### includedPaths

• `Optional` **includedPaths**: `string`[]

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

Omit.includedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:79](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L79)

___

### pageSize

• `Optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

Omit.pageSize

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:90](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L90)

___

### siteName

• **siteName**: `string`

Required. The name of the site being queried.

#### Inherited from

Omit.siteName

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:71](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L71)
