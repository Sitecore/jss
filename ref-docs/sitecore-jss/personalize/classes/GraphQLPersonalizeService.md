[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / GraphQLPersonalizeService

# Class: GraphQLPersonalizeService

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:45](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L45)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:45](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L45)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Constructors

### Constructor

> **new GraphQLPersonalizeService**(`config`): `GraphQLPersonalizeService`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetch personalize data using the Sitecore GraphQL endpoint.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GraphQLPersonalizeServiceConfig`](../type-aliases/GraphQLPersonalizeServiceConfig.md) |  |

#### Returns

`GraphQLPersonalizeService`

## Properties

### config

> `protected` **config**: [`GraphQLPersonalizeServiceConfig`](../type-aliases/GraphQLPersonalizeServiceConfig.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:59](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L59)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:59](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L59)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

##### Returns

`string`

## Methods

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:121](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L121)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:121](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L121)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

CacheClient instance

***

### getCacheKey()

> `protected` **getCacheKey**(`itemPath`, `language`, `siteName`): `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:128](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L128)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:128](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L128)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemPath` | `string` |
| `language` | `string` |
| `siteName` | `string` |

#### Returns

`string`

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:138](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L138)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:138](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L138)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

***

### getPersonalizeInfo()

> **getPersonalizeInfo**(`itemPath`, `language`, `siteName`): `Promise`\<`undefined` \| [`PersonalizeInfo`](../type-aliases/PersonalizeInfo.md)\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:82](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L82)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:82](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L82)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Get personalize information for a route

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | page route |
| `language` | `string` | language |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<`undefined` \| [`PersonalizeInfo`](../type-aliases/PersonalizeInfo.md)\>

the personalize information or undefined (if itemPath / language not found)
