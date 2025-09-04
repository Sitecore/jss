[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLSitemapXmlService

# Class: GraphQLSitemapXmlService

Defined in: sitecore-jss/types/site/graphql-sitemap-service.d.ts:27

Service that fetch the sitemaps data using Sitecore's GraphQL API.

## Constructors

### Constructor

> **new GraphQLSitemapXmlService**(`options`): `GraphQLSitemapXmlService`

Defined in: sitecore-jss/types/site/graphql-sitemap-service.d.ts:34

Creates an instance of graphQL sitemaps service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLSitemapXmlServiceConfig`](../type-aliases/GraphQLSitemapXmlServiceConfig.md) | instance |

#### Returns

`GraphQLSitemapXmlService`

## Properties

### options

> **options**: [`GraphQLSitemapXmlServiceConfig`](../type-aliases/GraphQLSitemapXmlServiceConfig.md)

Defined in: sitecore-jss/types/site/graphql-sitemap-service.d.ts:28

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Defined in: sitecore-jss/types/site/graphql-sitemap-service.d.ts:35

##### Returns

`string`

## Methods

### fetchSitemaps()

> **fetchSitemaps**(): `Promise`\<`string`[]\>

Defined in: sitecore-jss/types/site/graphql-sitemap-service.d.ts:41

Fetch list of sitemaps for the site

#### Returns

`Promise`\<`string`[]\>

list of sitemap paths

#### Throws

if the siteName is empty.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: sitecore-jss/types/site/graphql-sitemap-service.d.ts:54

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

***

### getSitemap()

> **getSitemap**(`id`): `Promise`\<`undefined` \| `string`\>

Defined in: sitecore-jss/types/site/graphql-sitemap-service.d.ts:47

Get sitemap file path for sitemap id

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | the sitemap id (can be empty for default 'sitemap.xml' file) |

#### Returns

`Promise`\<`undefined` \| `string`\>

the sitemap file path or undefined if one doesn't exist
