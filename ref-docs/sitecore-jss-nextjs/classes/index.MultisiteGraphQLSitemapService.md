[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / MultisiteGraphQLSitemapService

# Class: MultisiteGraphQLSitemapService

[index](../modules/index.md).MultisiteGraphQLSitemapService

Service that fetches the list of site pages using Sitecore's GraphQL API.
Used to handle multiple sites
This list is used for SSG and Export functionality.

**`Mixes`**

SearchQueryService<PageListQueryResult>

## Hierarchy

- `BaseGraphQLSitemapService`

  ↳ **`MultisiteGraphQLSitemapService`**

## Table of contents

### Constructors

- [constructor](index.MultisiteGraphQLSitemapService.md#constructor)

### Properties

- [options](index.MultisiteGraphQLSitemapService.md#options)

### Accessors

- [graphQLClient](index.MultisiteGraphQLSitemapService.md#graphqlclient)
- [query](index.MultisiteGraphQLSitemapService.md#query)

### Methods

- [fetchExportSitemap](index.MultisiteGraphQLSitemapService.md#fetchexportsitemap)
- [fetchLanguageSitePaths](index.MultisiteGraphQLSitemapService.md#fetchlanguagesitepaths)
- [fetchSSGSitemap](index.MultisiteGraphQLSitemapService.md#fetchssgsitemap)
- [fetchSitemap](index.MultisiteGraphQLSitemapService.md#fetchsitemap)
- [getGraphQLClient](index.MultisiteGraphQLSitemapService.md#getgraphqlclient)
- [getTranformedPaths](index.MultisiteGraphQLSitemapService.md#gettranformedpaths)
- [transformLanguageSitePaths](index.MultisiteGraphQLSitemapService.md#transformlanguagesitepaths)

## Constructors

### constructor

• **new MultisiteGraphQLSitemapService**(`options`)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`MultisiteGraphQLSitemapServiceConfig`](../interfaces/index.MultisiteGraphQLSitemapServiceConfig.md) | instance |

#### Overrides

BaseGraphQLSitemapService.constructor

#### Defined in

[sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:33](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L33)

## Properties

### options

• **options**: [`MultisiteGraphQLSitemapServiceConfig`](../interfaces/index.MultisiteGraphQLSitemapServiceConfig.md)

instance

#### Inherited from

BaseGraphQLSitemapService.options

#### Defined in

[sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:33](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L33)

## Accessors

### graphQLClient

• `Protected` `get` **graphQLClient**(): `GraphQLClient`

GraphQL client accessible by descendant classes when needed

#### Returns

`GraphQLClient`

#### Inherited from

BaseGraphQLSitemapService.graphQLClient

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:168](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L168)

___

### query

• `Protected` `get` **query**(): `string`

Gets the default query used for fetching the list of site pages

#### Returns

`string`

#### Inherited from

BaseGraphQLSitemapService.query

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:175](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L175)

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(`locale`): `Promise`<`StaticPath`[]\>

Fetch sitemap which could be used for generation of static pages during `next export`.
The `locale` parameter will be used in the item query, but since i18n is not supported,
the output paths will not include a `language` property.

**`See`**

StaticPath objects

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | which application supports |

#### Returns

`Promise`<`StaticPath`[]\>

an array of

#### Inherited from

BaseGraphQLSitemapService.fetchExportSitemap

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:194](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L194)

___

### fetchLanguageSitePaths

▸ `Protected` **fetchLanguageSitePaths**(`language`, `siteName`): `Promise`<`RouteListQueryResult`[]\>

Fetch and return site paths for multisite implementation, with prefixes included

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | path language |
| `siteName` | `string` | site name |

#### Returns

`Promise`<`RouteListQueryResult`[]\>

modified paths

#### Overrides

BaseGraphQLSitemapService.fetchLanguageSitePaths

#### Defined in

[sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:77](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L77)

___

### fetchSSGSitemap

▸ **fetchSSGSitemap**(`locales`): `Promise`<`StaticPath`[]\>

Fetch sitemap which could be used for generation of static pages using SSG mode

**`See`**

StaticPath objects

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales` | `string`[] | locales which application supports |

#### Returns

`Promise`<`StaticPath`[]\>

an array of

#### Inherited from

BaseGraphQLSitemapService.fetchSSGSitemap

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:209](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L209)

___

### fetchSitemap

▸ `Protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`<`StaticPath`[]\>

Fetch a flat list of all pages that belong to all the requested sites and have a
version in the specified language(s).

**`Throws`**

if the list of languages is empty.

**`Throws`**

if the any of the languages is an empty string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => `StaticPath` | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`<`StaticPath`[]\>

list of pages

#### Overrides

BaseGraphQLSitemapService.fetchSitemap

#### Defined in

[sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L46)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Inherited from

BaseGraphQLSitemapService.getGraphQLClient

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:316](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L316)

___

### getTranformedPaths

▸ `Protected` **getTranformedPaths**(`siteName`, `languages`, `formatStaticPath`): `Promise`<`StaticPath`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteName` | `string` |
| `languages` | `string`[] |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => `StaticPath` |

#### Returns

`Promise`<`StaticPath`[]\>

#### Inherited from

BaseGraphQLSitemapService.getTranformedPaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:220](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L220)

___

### transformLanguageSitePaths

▸ `Protected` **transformLanguageSitePaths**(`sitePaths`, `formatStaticPath`, `language`): `Promise`<`StaticPath`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sitePaths` | `RouteListQueryResult`[] |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => `StaticPath` |
| `language` | `string` |

#### Returns

`Promise`<`StaticPath`[]\>

#### Inherited from

BaseGraphQLSitemapService.transformLanguageSitePaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:247](https://github.com/Sitecore/jss/blob/ce5bc871a/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L247)
