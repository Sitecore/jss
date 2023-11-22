[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLSitemapService

# Class: GraphQLSitemapService

[index](../modules/index.md).GraphQLSitemapService

Service that fetches the list of site pages using Sitecore's GraphQL API.
Used to handle a single site
This list is used for SSG and Export functionality.

**`Mixes`**

SearchQueryService<PageListQueryResult>

## Hierarchy

- `BaseGraphQLSitemapService`

  ↳ **`GraphQLSitemapService`**

## Table of contents

### Constructors

- [constructor](index.GraphQLSitemapService.md#constructor)

### Properties

- [options](index.GraphQLSitemapService.md#options)

### Accessors

- [graphQLClient](index.GraphQLSitemapService.md#graphqlclient)
- [query](index.GraphQLSitemapService.md#query)

### Methods

- [fetchExportSitemap](index.GraphQLSitemapService.md#fetchexportsitemap)
- [fetchLanguageSitePaths](index.GraphQLSitemapService.md#fetchlanguagesitepaths)
- [fetchSSGSitemap](index.GraphQLSitemapService.md#fetchssgsitemap)
- [fetchSitemap](index.GraphQLSitemapService.md#fetchsitemap)
- [getGraphQLClient](index.GraphQLSitemapService.md#getgraphqlclient)
- [getTranformedPaths](index.GraphQLSitemapService.md#gettranformedpaths)
- [transformLanguageSitePaths](index.GraphQLSitemapService.md#transformlanguagesitepaths)

## Constructors

### constructor

• **new GraphQLSitemapService**(`options`)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLSitemapServiceConfig`](../interfaces/index.GraphQLSitemapServiceConfig.md) | instance |

#### Overrides

BaseGraphQLSitemapService.constructor

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:49](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L49)

## Properties

### options

• **options**: [`GraphQLSitemapServiceConfig`](../interfaces/index.GraphQLSitemapServiceConfig.md)

instance

#### Inherited from

BaseGraphQLSitemapService.options

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:49](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L49)

## Accessors

### graphQLClient

• `Protected` `get` **graphQLClient**(): `GraphQLClient`

GraphQL client accessible by descendant classes when needed

#### Returns

`GraphQLClient`

#### Inherited from

BaseGraphQLSitemapService.graphQLClient

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:180](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L180)

___

### query

• `Protected` `get` **query**(): `string`

Gets the default query used for fetching the list of site pages

#### Returns

`string`

#### Inherited from

BaseGraphQLSitemapService.query

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:187](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L187)

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:206](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L206)

___

### fetchLanguageSitePaths

▸ `Protected` **fetchLanguageSitePaths**(`language`, `siteName`): `Promise`<`RouteListQueryResult`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |
| `siteName` | `string` |

#### Returns

`Promise`<`RouteListQueryResult`[]\>

#### Inherited from

BaseGraphQLSitemapService.fetchLanguageSitePaths

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:287](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L287)

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:221](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L221)

___

### fetchSitemap

▸ `Protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

Fetch a flat list of all pages that belong to the specificed site and have a
version in the specified language(s).

**`Throws`**

if the list of languages is empty.

**`Throws`**

if the any of the languages is an empty string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => [`StaticPath`](../modules/index.md#staticpath) | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`<[`StaticPath`](../modules/index.md#staticpath)[]\>

list of pages

#### Overrides

BaseGraphQLSitemapService.fetchSitemap

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:62](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L62)

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:328](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L328)

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:232](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L232)

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

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:259](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L259)
