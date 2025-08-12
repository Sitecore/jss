[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / GraphQLPersonalizeService

# Class: GraphQLPersonalizeService

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:47

## Constructors

### Constructor

> **new GraphQLPersonalizeService**(`config`): `GraphQLPersonalizeService`

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:55

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

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:48

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:56

##### Returns

`string`

## Methods

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:70

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

CacheClient instance

***

### getCacheKey()

> `protected` **getCacheKey**(`itemPath`, `language`, `siteName`): `string`

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:71

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

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:78

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

***

### getPersonalizeInfo()

> **getPersonalizeInfo**(`itemPath`, `language`, `siteName`): `Promise`\<`undefined` \| [`PersonalizeInfo`](../type-aliases/PersonalizeInfo.md)\>

Defined in: packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:64

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
