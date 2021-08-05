[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [services/graphql-sitemap-service](../modules/services_graphql_sitemap_service.md) / GraphQLSitemapService

# Class: GraphQLSitemapService

[services/graphql-sitemap-service](../modules/services_graphql_sitemap_service.md).GraphQLSitemapService

Service that fetches the list of site pages using Sitecore's GraphQL API.
This list is used for SSG and Export functionality.

**`mixes`** SearchQueryService<PageListQueryResult>

## Table of contents

### Constructors

- [constructor](services_graphql_sitemap_service.GraphQLSitemapService.md#constructor)

### Properties

- [graphQLClient](services_graphql_sitemap_service.GraphQLSitemapService.md#graphqlclient)
- [options](services_graphql_sitemap_service.GraphQLSitemapService.md#options)
- [searchService](services_graphql_sitemap_service.GraphQLSitemapService.md#searchservice)

### Accessors

- [query](services_graphql_sitemap_service.GraphQLSitemapService.md#query)

### Methods

- [fetchExportSitemap](services_graphql_sitemap_service.GraphQLSitemapService.md#fetchexportsitemap)
- [fetchSSGSitemap](services_graphql_sitemap_service.GraphQLSitemapService.md#fetchssgsitemap)
- [fetchSitemap](services_graphql_sitemap_service.GraphQLSitemapService.md#fetchsitemap)
- [getGraphQLClient](services_graphql_sitemap_service.GraphQLSitemapService.md#getgraphqlclient)
- [getSearchService](services_graphql_sitemap_service.GraphQLSitemapService.md#getsearchservice)

## Constructors

### constructor

• **new GraphQLSitemapService**(`options`)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLSitemapServiceConfig`](../interfaces/services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md) | instance |

#### Defined in

[src/services/graphql-sitemap-service.ts:101](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L101)

## Properties

### graphQLClient

• `Private` **graphQLClient**: `GraphQLClient`

#### Defined in

[src/services/graphql-sitemap-service.ts:87](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L87)

___

### options

• **options**: [`GraphQLSitemapServiceConfig`](../interfaces/services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md)

___

### searchService

• `Private` **searchService**: `SearchQueryService`<[`PageListQueryResult`](../modules/services_graphql_sitemap_service.md#pagelistqueryresult)\>

#### Defined in

[src/services/graphql-sitemap-service.ts:88](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L88)

## Accessors

### query

• `Protected` `get` **query**(): `string`

Gets the default query used for fetching the list of site pages

#### Returns

`string`

#### Defined in

[src/services/graphql-sitemap-service.ts:93](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L93)

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(`locale`): `Promise`<[`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages during `next export`.
The `locale` parameter will be used in the item query, but since i18n is not supported,
the output paths will not include a `language` property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | which application supports |

#### Returns

`Promise`<[`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]\>

an array of @see StaticPath objects

#### Defined in

[src/services/graphql-sitemap-service.ts:113](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L113)

___

### fetchSSGSitemap

▸ **fetchSSGSitemap**(`locales`): `Promise`<[`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages using SSG mode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales` | `string`[] | locales which application supports |

#### Returns

`Promise`<[`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]\>

an array of @see StaticPath objects

#### Defined in

[src/services/graphql-sitemap-service.ts:128](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L128)

___

### fetchSitemap

▸ `Protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`<[`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]\>

Fetch a flat list of all pages that are descendants of the specified root item and have a
version in the specified language(s).

**`throws`** {RangeError} if the list of languages is empty.

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => [`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath) | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`<[`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]\>

list of pages

#### Defined in

[src/services/graphql-sitemap-service.ts:148](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L148)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

[src/services/graphql-sitemap-service.ts:193](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L193)

___

### getSearchService

▸ `Protected` **getSearchService**(): `SearchQueryService`<[`PageListQueryResult`](../modules/services_graphql_sitemap_service.md#pagelistqueryresult)\>

Gets a service that can perform GraphQL "search" queries to fetch @see PageListQueryResult

#### Returns

`SearchQueryService`<[`PageListQueryResult`](../modules/services_graphql_sitemap_service.md#pagelistqueryresult)\>

the search query service

#### Defined in

[src/services/graphql-sitemap-service.ts:204](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L204)
