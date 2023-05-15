[@sitecore-jss/sitecore-jss](../README.md) / [personalize](../modules/personalize.md) / GraphQLPersonalizeService

# Class: GraphQLPersonalizeService

[personalize](../modules/personalize.md).GraphQLPersonalizeService

## Table of contents

### Constructors

- [constructor](personalize.GraphQLPersonalizeService.md#constructor)

### Properties

- [config](personalize.GraphQLPersonalizeService.md#config)
- [graphQLClient](personalize.GraphQLPersonalizeService.md#graphqlclient)

### Accessors

- [query](personalize.GraphQLPersonalizeService.md#query)

### Methods

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

[personalize/graphql-personalize-service.ts:68](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L68)

## Properties

### config

• `Protected` **config**: [`GraphQLPersonalizeServiceConfig`](../modules/personalize.md#graphqlpersonalizeserviceconfig)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[personalize/graphql-personalize-service.ts:48](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L48)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[personalize/graphql-personalize-service.ts:49](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L49)

## Methods

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../interfaces/index.GraphQLClient.md)

implementation

#### Defined in

[personalize/graphql-personalize-service.ts:119](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L119)

___

### getPersonalizeInfo

▸ **getPersonalizeInfo**(`itemPath`, `language`): `Promise`<`undefined` \| `PersonalizeInfo`\>

Get personalize information for a route

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | page route |
| `language` | `string` | language |

#### Returns

`Promise`<`undefined` \| `PersonalizeInfo`\>

the personalize information or undefined (if itemPath / language not found)

#### Defined in

[personalize/graphql-personalize-service.ts:79](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L79)
