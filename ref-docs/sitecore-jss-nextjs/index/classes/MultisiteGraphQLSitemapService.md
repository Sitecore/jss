[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / MultisiteGraphQLSitemapService

# Class: MultisiteGraphQLSitemapService

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:28](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L28)

Service that fetches the list of site pages using Sitecore's GraphQL API.
Used to handle multiple sites
This list is used for SSG and Export functionality.

## Mixes

SearchQueryService<PageListQueryResult>

## Extends

- `BaseGraphQLSitemapService`

## Constructors

### Constructor

> **new MultisiteGraphQLSitemapService**(`options`): `MultisiteGraphQLSitemapService`

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:33](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L33)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`MultisiteGraphQLSitemapServiceConfig`](../interfaces/MultisiteGraphQLSitemapServiceConfig.md) | instance |

#### Returns

`MultisiteGraphQLSitemapService`

#### Overrides

`BaseGraphQLSitemapService.constructor`

## Properties

### options

> **options**: [`MultisiteGraphQLSitemapServiceConfig`](../interfaces/MultisiteGraphQLSitemapServiceConfig.md)

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:33](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L33)

instance

#### Inherited from

`BaseGraphQLSitemapService.options`

## Accessors

### graphQLClient

#### Get Signature

> **get** `protected` **graphQLClient**(): `GraphQLClient`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:187](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L187)

GraphQL client accessible by descendant classes when needed

##### Returns

`GraphQLClient`

#### Inherited from

`BaseGraphQLSitemapService.graphQLClient`

***

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:194](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L194)

Gets the default query used for fetching the list of site pages

##### Returns

`string`

#### Inherited from

`BaseGraphQLSitemapService.query`

## Methods

### fetchExportSitemap()

> **fetchExportSitemap**(`locale`): `Promise`\<`StaticPath`[]\>

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:205](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L205)

Fetch sitemap which could be used for generation of static pages during `next export`.
The `locale` parameter will be used in the item query, but since i18n is not supported,
the output paths will not include a `language` property.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale` | `string` | which application supports |

#### Returns

`Promise`\<`StaticPath`[]\>

an array of

#### See

StaticPath objects

#### Inherited from

`BaseGraphQLSitemapService.fetchExportSitemap`

***

### fetchLanguageSitePaths()

> `protected` **fetchLanguageSitePaths**(`language`, `siteName`): `Promise`\<`RouteListQueryResult`[]\>

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:77](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L77)

Fetch and return site paths for multisite implementation, with prefixes included

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | path language |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<`RouteListQueryResult`[]\>

modified paths

#### Overrides

`BaseGraphQLSitemapService.fetchLanguageSitePaths`

***

### fetchSitemap()

> `protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`\<`StaticPath`[]\>

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L46)

Fetch a flat list of all pages that belong to all the requested sites and have a
version in the specified language(s).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`, `language`) => `StaticPath` | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`\<`StaticPath`[]\>

list of pages

#### Throws

if the list of languages is empty.

#### Throws

if the any of the languages is an empty string.

#### Overrides

`BaseGraphQLSitemapService.fetchSitemap`

***

### fetchSSGSitemap()

> **fetchSSGSitemap**(`locales`): `Promise`\<`StaticPath`[]\>

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:220](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L220)

Fetch sitemap which could be used for generation of static pages using SSG mode

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locales` | `string`[] | locales which application supports |

#### Returns

`Promise`\<`StaticPath`[]\>

an array of

#### See

StaticPath objects

#### Inherited from

`BaseGraphQLSitemapService.fetchSSGSitemap`

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:407](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L407)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Inherited from

`BaseGraphQLSitemapService.getGraphQLClient`

***

### getTranformedPaths()

> `protected` **getTranformedPaths**(`siteName`, `languages`, `formatStaticPath`): `Promise`\<`StaticPath`[]\>

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:231](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L231)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `siteName` | `string` |
| `languages` | `string`[] |
| `formatStaticPath` | (`path`, `language`) => `StaticPath` |

#### Returns

`Promise`\<`StaticPath`[]\>

#### Inherited from

`BaseGraphQLSitemapService.getTranformedPaths`

***

### transformLanguageSitePaths()

> `protected` **transformLanguageSitePaths**(`sitePaths`, `formatStaticPath`, `language`): `Promise`\<`StaticPath`[]\>

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:258](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L258)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sitePaths` | `RouteListQueryResult`[] |
| `formatStaticPath` | (`path`, `language`) => `StaticPath` |
| `language` | `string` |

#### Returns

`Promise`\<`StaticPath`[]\>

#### Inherited from

`BaseGraphQLSitemapService.transformLanguageSitePaths`
