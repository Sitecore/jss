[@sitecore-jss/sitecore-jss-angular](../README.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

Service that fetch layout data using Sitecore's GraphQL API.

**`Mixes`**

GraphQLRequestClient

## Hierarchy

- `LayoutServiceBase`

  ↳ **`GraphQLLayoutService`**

## Table of contents

### Constructors

- [constructor](GraphQLLayoutService.md#constructor)

### Properties

- [graphQLClient](GraphQLLayoutService.md#graphqlclient)
- [serviceConfig](GraphQLLayoutService.md#serviceconfig)

### Methods

- [fetchLayoutData](GraphQLLayoutService.md#fetchlayoutdata)
- [getGraphQLClient](GraphQLLayoutService.md#getgraphqlclient)
- [getLayoutQuery](GraphQLLayoutService.md#getlayoutquery)

## Constructors

### constructor

• **new GraphQLLayoutService**(`serviceConfig`)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceConfig` | `GraphQLLayoutServiceConfig` | configuration |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:49

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:44

___

### serviceConfig

• **serviceConfig**: `GraphQLLayoutServiceConfig`

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:43

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:56

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

sitecore-jss/types/layout/graphql-layout-service.d.ts:63

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

sitecore-jss/types/layout/graphql-layout-service.d.ts:70
