[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / GraphQLPersonalizeService

# Class: GraphQLPersonalizeService

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:45](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L45)

## Constructors

### Constructor

> **new GraphQLPersonalizeService**(`config`): `GraphQLPersonalizeService`

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)

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

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:59](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L59)

##### Returns

`string`

## Methods

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:121](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L121)

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

CacheClient instance

***

### getCacheKey()

> `protected` **getCacheKey**(`itemPath`, `language`, `siteName`): `string`

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:128](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L128)

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

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:138](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L138)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

***

### getPersonalizeInfo()

> **getPersonalizeInfo**(`itemPath`, `language`, `siteName`): `Promise`\<`undefined` \| [`PersonalizeInfo`](../type-aliases/PersonalizeInfo.md)\>

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:82](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L82)

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
