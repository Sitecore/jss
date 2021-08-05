[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [layout/graphql-layout-service](../modules/layout_graphql_layout_service.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

[layout/graphql-layout-service](../modules/layout_graphql_layout_service.md).GraphQLLayoutService

## Hierarchy

- [`LayoutServiceBase`](layout_layout_service.LayoutServiceBase.md)

  ↳ **`GraphQLLayoutService`**

## Table of contents

### Constructors

- [constructor](layout_graphql_layout_service.GraphQLLayoutService.md#constructor)

### Properties

- [graphQLClient](layout_graphql_layout_service.GraphQLLayoutService.md#graphqlclient)
- [serviceConfig](layout_graphql_layout_service.GraphQLLayoutService.md#serviceconfig)

### Methods

- [fetchLayoutData](layout_graphql_layout_service.GraphQLLayoutService.md#fetchlayoutdata)
- [getGraphQLClient](layout_graphql_layout_service.GraphQLLayoutService.md#getgraphqlclient)
- [getLayoutQuery](layout_graphql_layout_service.GraphQLLayoutService.md#getlayoutquery)

## Constructors

### constructor

• **new GraphQLLayoutService**(`serviceConfig`)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](../modules/layout_graphql_layout_service.md#graphqllayoutserviceconfig) |

#### Overrides

[LayoutServiceBase](layout_layout_service.LayoutServiceBase.md).[constructor](layout_layout_service.LayoutServiceBase.md#constructor)

#### Defined in

[layout/graphql-layout-service.ts:40](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L40)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md)

#### Defined in

[layout/graphql-layout-service.ts:34](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L34)

___

### serviceConfig

• **serviceConfig**: [`GraphQLLayoutServiceConfig`](../modules/layout_graphql_layout_service.md#graphqllayoutserviceconfig)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

layout service data

#### Overrides

[LayoutServiceBase](layout_layout_service.LayoutServiceBase.md).[fetchLayoutData](layout_layout_service.LayoutServiceBase.md#fetchlayoutdata)

#### Defined in

[layout/graphql-layout-service.ts:51](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L51)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md)

implementation

#### Defined in

[layout/graphql-layout-service.ts:78](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L78)

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

[layout/graphql-layout-service.ts:90](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L90)
