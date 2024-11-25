[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / GraphQLPersonalizeService

# Class: GraphQLPersonalizeService

## Constructors

### new GraphQLPersonalizeService()

> **new GraphQLPersonalizeService**(`config`): [`GraphQLPersonalizeService`](GraphQLPersonalizeService.md)

Fetch personalize data using the Sitecore GraphQL endpoint.

#### Parameters

• **config**: [`GraphQLPersonalizeServiceConfig`](../type-aliases/GraphQLPersonalizeServiceConfig.md)

#### Returns

[`GraphQLPersonalizeService`](GraphQLPersonalizeService.md)

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)

## Properties

### config

> `protected` **config**: [`GraphQLPersonalizeServiceConfig`](../type-aliases/GraphQLPersonalizeServiceConfig.md)

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:53](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L53)

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:59](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L59)

## Methods

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<`PersonalizeQueryResult`\>

CacheClient instance

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:121](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L121)

***

### getCacheKey()

> `protected` **getCacheKey**(`itemPath`, `language`, `siteName`): `string`

#### Parameters

• **itemPath**: `string`

• **language**: `string`

• **siteName**: `string`

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:128](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L128)

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

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:138](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L138)

***

### getPersonalizeInfo()

> **getPersonalizeInfo**(`itemPath`, `language`, `siteName`): `Promise`\<`undefined` \| [`PersonalizeInfo`](../type-aliases/PersonalizeInfo.md)\>

Get personalize information for a route

#### Parameters

• **itemPath**: `string`

page route

• **language**: `string`

language

• **siteName**: `string`

site name

#### Returns

`Promise`\<`undefined` \| [`PersonalizeInfo`](../type-aliases/PersonalizeInfo.md)\>

the personalize information or undefined (if itemPath / language not found)

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:82](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L82)
