[@sitecore-jss/sitecore-jss-nextjs](../README.md) / GraphQLSitemapService

# Class: GraphQLSitemapService

Service that fetches the list of site pages using Sitecore's GraphQL API.
This list is used for SSG and Export functionality.

**`mixes`** SearchQueryService<PageListQueryResult>

## Table of contents

### Constructors

- [constructor](GraphQLSitemapService.md#constructor)

### Properties

- [graphQLClient](GraphQLSitemapService.md#graphqlclient)
- [options](GraphQLSitemapService.md#options)
- [searchService](GraphQLSitemapService.md#searchservice)

### Accessors

- [query](GraphQLSitemapService.md#query)

### Methods

- [fetchExportSitemap](GraphQLSitemapService.md#fetchexportsitemap)
- [fetchSSGSitemap](GraphQLSitemapService.md#fetchssgsitemap)
- [fetchSitemap](GraphQLSitemapService.md#fetchsitemap)
- [getGraphQLClient](GraphQLSitemapService.md#getgraphqlclient)
- [getSearchService](GraphQLSitemapService.md#getsearchservice)

## Constructors

### constructor

• **new GraphQLSitemapService**(`options`)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLSitemapServiceConfig`](../interfaces/GraphQLSitemapServiceConfig.md) | instance |

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:107](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L107)

## Properties

### graphQLClient

• `Private` **graphQLClient**: `GraphQLClient`

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:93](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L93)

___

### options

• **options**: [`GraphQLSitemapServiceConfig`](../interfaces/GraphQLSitemapServiceConfig.md)

___

### searchService

• `Private` **searchService**: `SearchQueryService`<`PageListQueryResult`\>

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:94](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L94)

## Accessors

### query

• `Protected` `get` **query**(): `string`

Gets the default query used for fetching the list of site pages

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:99](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L99)

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(`locale`): `Promise`<[`StaticPath`](../README.md#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages during `next export`.
The `locale` parameter will be used in the item query, but since i18n is not supported,
the output paths will not include a `language` property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | which application supports |

#### Returns

`Promise`<[`StaticPath`](../README.md#staticpath)[]\>

an array of @see StaticPath objects

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:119](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L119)

___

### fetchSSGSitemap

▸ **fetchSSGSitemap**(`locales`): `Promise`<[`StaticPath`](../README.md#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages using SSG mode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales` | `string`[] | locales which application supports |

#### Returns

`Promise`<[`StaticPath`](../README.md#staticpath)[]\>

an array of @see StaticPath objects

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:134](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L134)

___

### fetchSitemap

▸ `Protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`<[`StaticPath`](../README.md#staticpath)[]\>

Fetch a flat list of all pages that are descendants of the specified root item and have a
version in the specified language(s).

**`throws`** {RangeError} if the list of languages is empty.

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => [`StaticPath`](../README.md#staticpath) | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`<[`StaticPath`](../README.md#staticpath)[]\>

list of pages

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:154](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L154)

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

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:204](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L204)

___

### getSearchService

▸ `Protected` **getSearchService**(): `SearchQueryService`<`PageListQueryResult`\>

Gets a service that can perform GraphQL "search" queries to fetch @see PageListQueryResult

#### Returns

`SearchQueryService`<`PageListQueryResult`\>

the search query service

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:215](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L215)
