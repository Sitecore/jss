[@sitecore-jss/sitecore-jss-angular](../README.md) / GraphQLPersonalizeService

# Class: GraphQLPersonalizeService

## Table of contents

### Constructors

- [constructor](GraphQLPersonalizeService.md#constructor)

### Properties

- [cache](GraphQLPersonalizeService.md#cache)
- [config](GraphQLPersonalizeService.md#config)
- [graphQLClient](GraphQLPersonalizeService.md#graphqlclient)

### Accessors

- [query](GraphQLPersonalizeService.md#query)

### Methods

- [getCacheClient](GraphQLPersonalizeService.md#getcacheclient)
- [getCacheKey](GraphQLPersonalizeService.md#getcachekey)
- [getGraphQLClient](GraphQLPersonalizeService.md#getgraphqlclient)
- [getPersonalizeInfo](GraphQLPersonalizeService.md#getpersonalizeinfo)

## Constructors

### constructor

• **new GraphQLPersonalizeService**(`config`)

Fetch personalize data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`GraphQLPersonalizeServiceConfig`](../README.md#graphqlpersonalizeserviceconfig) |

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:56

## Properties

### cache

• `Private` **cache**: `any`

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:50

___

### config

• `Protected` **config**: [`GraphQLPersonalizeServiceConfig`](../README.md#graphqlpersonalizeserviceconfig)

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:48

___

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:49

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:51

## Methods

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

CacheClient instance

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:70

___

### getCacheKey

▸ `Protected` **getCacheKey**(`itemPath`, `language`, `siteName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language` | `string` |
| `siteName` | `string` |

#### Returns

`string`

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:71

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:78

___

### getPersonalizeInfo

▸ **getPersonalizeInfo**(`itemPath`, `language`, `siteName`): `Promise`\<`undefined` \| [`PersonalizeInfo`](../README.md#personalizeinfo)\>

Get personalize information for a route

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | page route |
| `language` | `string` | language |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<`undefined` \| [`PersonalizeInfo`](../README.md#personalizeinfo)\>

the personalize information or undefined (if itemPath / language not found)

#### Defined in

packages/sitecore-jss/types/personalize/graphql-personalize-service.d.ts:64
