[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [services/graphql-sitemap-service](../modules/services_graphql_sitemap_service.md) / GraphQLSitemapServiceConfig

# Interface: GraphQLSitemapServiceConfig

[services/graphql-sitemap-service](../modules/services_graphql_sitemap_service.md).GraphQLSitemapServiceConfig

Configuration options for @see GraphQLSitemapService instances

## Hierarchy

- `SearchServiceConfig`

  ↳ **`GraphQLSitemapServiceConfig`**

## Table of contents

### Properties

- [apiKey](services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md#apikey)
- [endpoint](services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md#endpoint)
- [pageSize](services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md#pagesize)
- [rootItemId](services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md#rootitemid)
- [siteName](services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md#sitename)
- [templates](services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md#templates)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

#### Defined in

[src/services/graphql-sitemap-service.ts:78](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L78)

___

### endpoint

• **endpoint**: `string`

Your Graphql endpoint

#### Defined in

[src/services/graphql-sitemap-service.ts:73](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L73)

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

SearchServiceConfig.pageSize

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:42

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

SearchServiceConfig.rootItemId

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:37

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

SearchServiceConfig.siteName

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:60

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

SearchServiceConfig.templates

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:46
