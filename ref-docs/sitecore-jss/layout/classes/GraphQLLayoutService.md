[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:40](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L40)

Service that fetch layout data using Sitecore's GraphQL API.

## Mixes

GraphQLRequestClient

## Extends

- `LayoutServiceBase`

## Constructors

### Constructor

> **new GraphQLLayoutService**(`serviceConfig`): `GraphQLLayoutService`

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:47](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L47)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](../interfaces/GraphQLLayoutServiceConfig.md) | configuration |

#### Returns

`GraphQLLayoutService`

#### Overrides

`LayoutServiceBase.constructor`

## Properties

### serviceConfig

> **serviceConfig**: [`GraphQLLayoutServiceConfig`](../interfaces/GraphQLLayoutServiceConfig.md)

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:47](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L47)

configuration

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language?`): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:58](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L58)

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Overrides

`LayoutServiceBase.fetchLayoutData`

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:85](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L85)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

***

### getLayoutQuery()

> `protected` **getLayoutQuery**(`itemPath`, `language?`): `string`

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:103](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L103)

Returns GraphQL Layout query

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | page route |
| `language?` | `string` | language |

#### Returns

`string`

GraphQL query
