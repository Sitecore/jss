[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

[layout](../modules/layout.md).GraphQLLayoutService

Service that fetch layout data using Sitecore's GraphQL API.

**`Mixes`**

GraphQLRequestClient

## Hierarchy

- `LayoutServiceBase`

  ↳ **`GraphQLLayoutService`**

## Table of contents

### Constructors

- [constructor](layout.GraphQLLayoutService.md#constructor)

### Properties

- [graphQLClient](layout.GraphQLLayoutService.md#graphqlclient)
- [serviceConfig](layout.GraphQLLayoutService.md#serviceconfig)

### Methods

- [fetchLayoutData](layout.GraphQLLayoutService.md#fetchlayoutdata)
- [getGraphQLClient](layout.GraphQLLayoutService.md#getgraphqlclient)
- [getLayoutQuery](layout.GraphQLLayoutService.md#getlayoutquery)

## Constructors

### constructor

• **new GraphQLLayoutService**(`serviceConfig`)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](../interfaces/layout.GraphQLLayoutServiceConfig.md) | configuration |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

[src/layout/graphql-layout-service.ts:57](https://github.com/Sitecore/jss/blob/1c23d7848/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L57)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/layout/graphql-layout-service.ts:51](https://github.com/Sitecore/jss/blob/1c23d7848/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L51)

___

### serviceConfig

• **serviceConfig**: [`GraphQLLayoutServiceConfig`](../interfaces/layout.GraphQLLayoutServiceConfig.md)

configuration

#### Defined in

[src/layout/graphql-layout-service.ts:57](https://github.com/Sitecore/jss/blob/1c23d7848/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L57)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`\<[`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

[src/layout/graphql-layout-service.ts:68](https://github.com/Sitecore/jss/blob/1c23d7848/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L68)

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

[src/layout/graphql-layout-service.ts:95](https://github.com/Sitecore/jss/blob/1c23d7848/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L95)

___

### getLayoutQuery

▸ `Protected` **getLayoutQuery**(`itemPath`, `language?`): `string`

Returns GraphQL Layout query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | page route |
| `language?` | `string` | language |

#### Returns

`string`

GraphQL query

#### Defined in

[src/layout/graphql-layout-service.ts:120](https://github.com/Sitecore/jss/blob/1c23d7848/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L120)
