[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLRedirectsService

# Class: GraphQLRedirectsService

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:58](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L58)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:58](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L58)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint

## Constructors

### Constructor

> **new GraphQLRedirectsService**(`options`): `GraphQLRedirectsService`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:66](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L66)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:66](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L66)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Creates an instance of graphQL redirects service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLRedirectsServiceConfig`](../type-aliases/GraphQLRedirectsServiceConfig.md) | instance |

#### Returns

`GraphQLRedirectsService`

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:71](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L71)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:71](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L71)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

##### Returns

`string`

## Methods

### fetchRedirects()

> **fetchRedirects**(`siteName`): `Promise`\<[`RedirectInfo`](../type-aliases/RedirectInfo.md)[]\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:81](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L81)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:81](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L81)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetch an array of redirects from API

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<[`RedirectInfo`](../type-aliases/RedirectInfo.md)[]\>

Promise<RedirectInfo[]>

#### Throws

if the siteName is empty.

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`RedirectsQueryResult`](../type-aliases/RedirectsQueryResult.md)\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:121](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L121)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:121](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L121)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`RedirectsQueryResult`](../type-aliases/RedirectsQueryResult.md)\>

CacheClient instance

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:105](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L105)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:105](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L105)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
