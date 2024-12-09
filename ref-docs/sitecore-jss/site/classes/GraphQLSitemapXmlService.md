[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLSitemapXmlService

# Class: GraphQLSitemapXmlService

Service that fetch the sitemaps data using Sitecore's GraphQL API.

## Constructors

### new GraphQLSitemapXmlService()

> **new GraphQLSitemapXmlService**(`options`): [`GraphQLSitemapXmlService`](GraphQLSitemapXmlService.md)

Creates an instance of graphQL sitemaps service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLSitemapXmlServiceConfig`](../type-aliases/GraphQLSitemapXmlServiceConfig.md) | instance |

#### Returns

[`GraphQLSitemapXmlService`](GraphQLSitemapXmlService.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L46)

## Properties

### options

> **options**: [`GraphQLSitemapXmlServiceConfig`](../type-aliases/GraphQLSitemapXmlServiceConfig.md)

instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L46)

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:50](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L50)

## Methods

### fetchSitemaps()

> **fetchSitemaps**(): `Promise`\<`string`[]\>

Fetch list of sitemaps for the site

#### Returns

`Promise`\<`string`[]\>

list of sitemap paths

#### Throws

if the siteName is empty.

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:59](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L59)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:94](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L94)

***

### getSitemap()

> **getSitemap**(`id`): `Promise`\<`undefined` \| `string`\>

Get sitemap file path for sitemap id

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | the sitemap id (can be empty for default 'sitemap.xml' file) |

#### Returns

`Promise`\<`undefined` \| `string`\>

the sitemap file path or undefined if one doesn't exist

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:81](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L81)
