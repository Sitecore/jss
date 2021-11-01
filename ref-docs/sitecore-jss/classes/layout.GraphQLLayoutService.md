[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

[layout](../modules/layout.md).GraphQLLayoutService

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

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](../modules/layout.md#graphqllayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

[layout/graphql-layout-service.ts:40](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L40)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[layout/graphql-layout-service.ts:34](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L34)

___

### serviceConfig

• **serviceConfig**: [`GraphQLLayoutServiceConfig`](../modules/layout.md#graphqllayoutserviceconfig)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`<[`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

[layout/graphql-layout-service.ts:51](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L51)

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

[layout/graphql-layout-service.ts:78](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L78)

___

### getLayoutQuery

▸ `Protected` **getLayoutQuery**(`itemPath`, `language?`): `string`

Returns GraphQL Layout query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | page route |
| `language?` | `string` | - |

#### Returns

`string`

#### Defined in

[layout/graphql-layout-service.ts:90](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L90)
