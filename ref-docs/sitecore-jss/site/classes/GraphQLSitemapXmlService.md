[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLSitemapXmlService

# Class: GraphQLSitemapXmlService

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:39](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L39)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:39](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L39)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Service that fetch the sitemaps data using Sitecore's GraphQL API.

## Constructors

### Constructor

> **new GraphQLSitemapXmlService**(`options`): `GraphQLSitemapXmlService`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L46)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L46)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L46)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:46](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L46)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

instance

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:50](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L50)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:50](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L50)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

##### Returns

`string`

## Methods

### fetchSitemaps()

> **fetchSitemaps**(): `Promise`\<`string`[]\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:59](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L59)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:59](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L59)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetch list of sitemaps for the site

#### Returns

`Promise`\<`string`[]\>

list of sitemap paths

#### Throws

if the siteName is empty.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:103](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L103)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:103](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L103)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

***

### getSitemap()

> **getSitemap**(`id`): `Promise`\<`undefined` \| `string`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:81](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L81)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-sitemap-service.ts:81](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L81)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Get sitemap file path for sitemap id

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | the sitemap id (can be empty for default 'sitemap.xml' file) |

#### Returns

`Promise`\<`undefined` \| `string`\>

the sitemap file path or undefined if one doesn't exist
