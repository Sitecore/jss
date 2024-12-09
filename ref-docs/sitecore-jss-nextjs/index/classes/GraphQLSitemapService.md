[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLSitemapService

# Class: GraphQLSitemapService

Service that fetches the list of site pages using Sitecore's GraphQL API.
Used to handle a single site
This list is used for SSG and Export functionality.

## Mixes

SearchQueryService<PageListQueryResult>

## Extends

- `BaseGraphQLSitemapService`

## Constructors

### new GraphQLSitemapService()

> **new GraphQLSitemapService**(`options`): [`GraphQLSitemapService`](GraphQLSitemapService.md)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLSitemapServiceConfig`](../interfaces/GraphQLSitemapServiceConfig.md) | instance |

#### Returns

[`GraphQLSitemapService`](GraphQLSitemapService.md)

#### Overrides

`BaseGraphQLSitemapService.constructor`

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:49](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L49)

## Properties

### options

> **options**: [`GraphQLSitemapServiceConfig`](../interfaces/GraphQLSitemapServiceConfig.md)

instance

#### Inherited from

`BaseGraphQLSitemapService.options`

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:49](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L49)

## Accessors

### graphQLClient

#### Get Signature

> **get** `protected` **graphQLClient**(): `GraphQLClient`

GraphQL client accessible by descendant classes when needed

##### Returns

`GraphQLClient`

#### Inherited from

`BaseGraphQLSitemapService.graphQLClient`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:177](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L177)

***

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Gets the default query used for fetching the list of site pages

##### Returns

`string`

#### Inherited from

`BaseGraphQLSitemapService.query`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:184](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L184)

## Methods

### fetchExportSitemap()

> **fetchExportSitemap**(`locale`): `Promise`\<`StaticPath`[]\>

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

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:195](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L195)

***

### fetchLanguageSitePaths()

> `protected` **fetchLanguageSitePaths**(`language`, `siteName`): `Promise`\<`RouteListQueryResult`[]\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |
| `siteName` | `string` |

#### Returns

`Promise`\<`RouteListQueryResult`[]\>

#### Inherited from

`BaseGraphQLSitemapService.fetchLanguageSitePaths`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:276](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L276)

***

### fetchSitemap()

> `protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`\<[`StaticPath`](../type-aliases/StaticPath.md)[]\>

Fetch a flat list of all pages that belong to the specificed site and have a
version in the specified language(s).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`, `language`) => [`StaticPath`](../type-aliases/StaticPath.md) | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`\<[`StaticPath`](../type-aliases/StaticPath.md)[]\>

list of pages

#### Throws

if the list of languages is empty.

#### Throws

if the any of the languages is an empty string.

#### Overrides

`BaseGraphQLSitemapService.fetchSitemap`

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:62](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L62)

***

### fetchSSGSitemap()

> **fetchSSGSitemap**(`locales`): `Promise`\<`StaticPath`[]\>

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

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:210](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L210)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Inherited from

`BaseGraphQLSitemapService.getGraphQLClient`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:317](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L317)

***

### getTranformedPaths()

> `protected` **getTranformedPaths**(`siteName`, `languages`, `formatStaticPath`): `Promise`\<`StaticPath`[]\>

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

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:221](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L221)

***

### transformLanguageSitePaths()

> `protected` **transformLanguageSitePaths**(`sitePaths`, `formatStaticPath`, `language`): `Promise`\<`StaticPath`[]\>

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

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:248](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L248)
