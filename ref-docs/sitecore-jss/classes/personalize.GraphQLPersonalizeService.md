[@sitecore-jss/sitecore-jss](../README.md) / [personalize](../modules/personalize.md) / GraphQLPersonalizeService

# Class: GraphQLPersonalizeService

[personalize](../modules/personalize.md).GraphQLPersonalizeService

## Table of contents

### Constructors

- [constructor](personalize.GraphQLPersonalizeService.md#constructor)

### Properties

- [cache](personalize.GraphQLPersonalizeService.md#cache)
- [config](personalize.GraphQLPersonalizeService.md#config)
- [graphQLClient](personalize.GraphQLPersonalizeService.md#graphqlclient)

### Accessors

- [query](personalize.GraphQLPersonalizeService.md#query)

### Methods

- [getCacheClient](personalize.GraphQLPersonalizeService.md#getcacheclient)
- [getCacheKey](personalize.GraphQLPersonalizeService.md#getcachekey)
- [getGraphQLClient](personalize.GraphQLPersonalizeService.md#getgraphqlclient)
- [getPersonalizeInfo](personalize.GraphQLPersonalizeService.md#getpersonalizeinfo)

## Constructors

### constructor

• **new GraphQLPersonalizeService**(`config`)

Fetch personalize data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`GraphQLPersonalizeServiceConfig`](../modules/personalize.md#graphqlpersonalizeserviceconfig) |

#### Defined in

[src/personalize/graphql-personalize-service.ts:66](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L66)

## Properties

### cache

• `Private` **cache**: `CacheClient`<`PersonalizeQueryResult`\>

#### Defined in

[src/personalize/graphql-personalize-service.ts:46](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L46)

___

### config

• `Protected` **config**: [`GraphQLPersonalizeServiceConfig`](../modules/personalize.md#graphqlpersonalizeserviceconfig)

#### Defined in

[src/personalize/graphql-personalize-service.ts:66](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L66)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/personalize/graphql-personalize-service.ts:45](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L45)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/personalize/graphql-personalize-service.ts:47](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L47)

## Methods

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`<`PersonalizeQueryResult`\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`<`PersonalizeQueryResult`\>

CacheClient instance

#### Defined in

[src/personalize/graphql-personalize-service.ts:119](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L119)

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

[src/personalize/graphql-personalize-service.ts:126](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L126)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../interfaces/index.GraphQLClient.md)

implementation

#### Defined in

[src/personalize/graphql-personalize-service.ts:136](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L136)

___

### getPersonalizeInfo

▸ **getPersonalizeInfo**(`itemPath`, `language`, `siteName`): `Promise`<`undefined` \| `PersonalizeInfo`\>

Get personalize information for a route

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | page route |
| `language` | `string` | language |
| `siteName` | `string` | site name |

#### Returns

`Promise`<`undefined` \| `PersonalizeInfo`\>

the personalize information or undefined (if itemPath / language not found)

#### Defined in

[src/personalize/graphql-personalize-service.ts:79](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L79)
