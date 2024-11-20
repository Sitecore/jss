[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLSitemapXmlService

# Class: GraphQLSitemapXmlService

Service that fetch the sitemaps data using Sitecore's GraphQL API.

## Constructors

### new GraphQLSitemapXmlService()

> **new GraphQLSitemapXmlService**(`options`): [`GraphQLSitemapXmlService`](GraphQLSitemapXmlService.md)

Creates an instance of graphQL sitemaps service with the provided options

#### Parameters

• **options**: [`GraphQLSitemapXmlServiceConfig`](../type-aliases/GraphQLSitemapXmlServiceConfig.md)

instance

#### Returns

[`GraphQLSitemapXmlService`](GraphQLSitemapXmlService.md)

#### Defined in

sitecore-jss/types/site/graphql-sitemap-service.d.ts:34

## Properties

### options

> **options**: [`GraphQLSitemapXmlServiceConfig`](../type-aliases/GraphQLSitemapXmlServiceConfig.md)

#### Defined in

sitecore-jss/types/site/graphql-sitemap-service.d.ts:28

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

sitecore-jss/types/site/graphql-sitemap-service.d.ts:35

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

sitecore-jss/types/site/graphql-sitemap-service.d.ts:41

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

sitecore-jss/types/site/graphql-sitemap-service.d.ts:54

***

### getSitemap()

> **getSitemap**(`id`): `Promise`\<`undefined` \| `string`\>

Get sitemap file path for sitemap id

#### Parameters

• **id**: `string`

the sitemap id (can be empty for default 'sitemap.xml' file)

#### Returns

`Promise`\<`undefined` \| `string`\>

the sitemap file path or undefined if one doesn't exist

#### Defined in

sitecore-jss/types/site/graphql-sitemap-service.d.ts:47
