[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

[index](../modules/index.md).GraphQLLayoutService

Service that fetch layout data using Sitecore's GraphQL API.

**`Mixes`**

GraphQLRequestClient

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](../interfaces/index.GraphQLLayoutServiceConfig.md) | configuration |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:42

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:37

___

### serviceConfig

• **serviceConfig**: [`GraphQLLayoutServiceConfig`](../interfaces/index.GraphQLLayoutServiceConfig.md)

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:36

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:49

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

sitecore-jss/types/layout/graphql-layout-service.d.ts:56

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

sitecore-jss/types/layout/graphql-layout-service.d.ts:63
