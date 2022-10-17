[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLSitemapService

# Class: GraphQLSitemapService

[index](../modules/index.md).GraphQLSitemapService

Service that fetches the list of site pages using Sitecore's GraphQL API.
This list is used for SSG and Export functionality.

**`mixes`** SearchQueryService<PageListQueryResult>

## Table of contents

### Constructors

- [constructor](index.GraphQLSitemapService.md#constructor)

### Properties

- [graphQLClient](index.GraphQLSitemapService.md#graphqlclient)
- [options](index.GraphQLSitemapService.md#options)

### Accessors

- [query](index.GraphQLSitemapService.md#query)

### Methods

- [fetchExportSitemap](index.GraphQLSitemapService.md#fetchexportsitemap)
- [fetchLanguageSitePaths](index.GraphQLSitemapService.md#fetchlanguagesitepaths)
- [fetchSSGSitemap](index.GraphQLSitemapService.md#fetchssgsitemap)
- [fetchSitemap](index.GraphQLSitemapService.md#fetchsitemap)
- [getGraphQLClient](index.GraphQLSitemapService.md#getgraphqlclient)
- [transformLanguageSitePaths](index.GraphQLSitemapService.md#transformlanguagesitepaths)

## Constructors

### constructor

• **new GraphQLSitemapService**(`options`)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLSitemapServiceConfig`](../interfaces/index.GraphQLSitemapServiceConfig.md) | instance |

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:173](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L173)

## Properties

### graphQLClient

• `Private` **graphQLClient**: `GraphQLClient`

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:160](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L160)

___

### options

• **options**: [`GraphQLSitemapServiceConfig`](../interfaces/index.GraphQLSitemapServiceConfig.md)

## Accessors

### query

• `Protected` `get` **query**(): `string`

Gets the default query used for fetching the list of site pages

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:165](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L165)

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(`locale`): `Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages during `next export`.
The `locale` parameter will be used in the item query, but since i18n is not supported,
the output paths will not include a `language` property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | which application supports |

#### Returns

`Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

an array of @see StaticPath objects

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:184](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L184)

___

### fetchLanguageSitePaths

▸ `Protected` **fetchLanguageSitePaths**(`language`): `Promise`<`RouteListQueryResult`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<`RouteListQueryResult`[]\>

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:269](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L269)

___

### fetchSSGSitemap

▸ **fetchSSGSitemap**(`locales`): `Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages using SSG mode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales` | `string`[] | locales which application supports |

#### Returns

`Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

an array of @see StaticPath objects

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:199](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L199)

___

### fetchSitemap

▸ `Protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

Fetch a flat list of all pages that belong to the specificed site and have a
version in the specified language(s).

**`throws`** {RangeError} if the list of languages is empty.

**`throws`** {RangeError} if the any of the languages is an empty string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => [`StaticPath`](../modules/index.md#staticpath) | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

list of pages

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:219](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L219)

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

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:307](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L307)

___

### transformLanguageSitePaths

▸ `Protected` **transformLanguageSitePaths**(`sitePaths`, `formatStaticPath`, `language`): `Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sitePaths` | `RouteListQueryResult`[] |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => [`StaticPath`](../modules/index.md#staticpath) |
| `language` | `string` |

#### Returns

`Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:243](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L243)
