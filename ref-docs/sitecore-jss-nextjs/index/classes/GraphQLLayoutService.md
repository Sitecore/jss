[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:31

Service that fetch layout data using Sitecore's GraphQL API.

## Mixes

GraphQLRequestClient

## Extends

- `LayoutServiceBase`

## Constructors

### Constructor

> **new GraphQLLayoutService**(`serviceConfig`): `GraphQLLayoutService`

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:38

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

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:32

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language?`): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:45

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

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:52

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

***

### getLayoutQuery()

> `protected` **getLayoutQuery**(`itemPath`, `language?`): `string`

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:59

Returns GraphQL Layout query

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | page route |
| `language?` | `string` | language |

#### Returns

`string`

GraphQL query
