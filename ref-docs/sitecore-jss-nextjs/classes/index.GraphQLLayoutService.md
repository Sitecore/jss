[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

[index](../modules/index.md).GraphQLLayoutService

## Hierarchy

- `LayoutServiceBase`

  ↳ **`GraphQLLayoutService`**

## Table of contents

### Constructors

- [constructor](index.GraphQLLayoutService.md#constructor)

### Properties

- [graphQLClient](index.GraphQLLayoutService.md#graphqlclient)
- [serviceConfig](index.GraphQLLayoutService.md#serviceconfig)

### Methods

- [fetchLayoutData](index.GraphQLLayoutService.md#fetchlayoutdata)
- [getGraphQLClient](index.GraphQLLayoutService.md#getgraphqlclient)
- [getLayoutQuery](index.GraphQLLayoutService.md#getlayoutquery)

## Constructors

### constructor

• **new GraphQLLayoutService**(`serviceConfig`)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](../modules/index.md#graphqllayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/graphql-layout-service.d.ts:37

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/graphql-layout-service.d.ts:32

___

### serviceConfig

• **serviceConfig**: [`GraphQLLayoutServiceConfig`](../modules/index.md#graphqllayoutserviceconfig)

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/graphql-layout-service.d.ts:31

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/graphql-layout-service.d.ts:44

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

node_modules/@sitecore-jss/sitecore-jss/types/layout/graphql-layout-service.d.ts:51

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

node_modules/@sitecore-jss/sitecore-jss/types/layout/graphql-layout-service.d.ts:57
