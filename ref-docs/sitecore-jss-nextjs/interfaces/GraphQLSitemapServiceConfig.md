[Sitecore JavaScript Rendering SDK (JSS) for Next.js](../README.md) / GraphQLSitemapServiceConfig

# Interface: GraphQLSitemapServiceConfig

Configuration options for @see GraphQLSitemapService instances

## Hierarchy

- `SearchServiceConfig`

  ↳ **`GraphQLSitemapServiceConfig`**

## Table of contents

### Properties

- [apiKey](GraphQLSitemapServiceConfig.md#apikey)
- [endpoint](GraphQLSitemapServiceConfig.md#endpoint)
- [jssAppTemplateId](GraphQLSitemapServiceConfig.md#jssapptemplateid)
- [pageSize](GraphQLSitemapServiceConfig.md#pagesize)
- [rootItemId](GraphQLSitemapServiceConfig.md#rootitemid)
- [siteName](GraphQLSitemapServiceConfig.md#sitename)
- [templates](GraphQLSitemapServiceConfig.md#templates)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

#### Defined in

[src/services/graphql-sitemap-service.ts:78](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L78)

___

### endpoint

• **endpoint**: `string`

Your Graphql endpoint

#### Defined in

[src/services/graphql-sitemap-service.ts:73](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L73)

___

### jssAppTemplateId

• `Optional` **jssAppTemplateId**: `string`

Optional. The template ID of a JSS App to use when searching for the appRootId.

**`default`** '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)

#### Defined in

[src/services/graphql-sitemap-service.ts:84](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L84)

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
