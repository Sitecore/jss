[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

Service that fetch layout data using Sitecore's GraphQL API.

## Mixes

GraphQLRequestClient

## Extends

- `LayoutServiceBase`

## Constructors

### new GraphQLLayoutService()

> **new GraphQLLayoutService**(`serviceConfig`): [`GraphQLLayoutService`](GraphQLLayoutService.md)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](../interfaces/GraphQLLayoutServiceConfig.md) | configuration |

#### Returns

[`GraphQLLayoutService`](GraphQLLayoutService.md)

#### Overrides

`LayoutServiceBase.constructor`

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:47](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L47)

## Properties

### serviceConfig

> **serviceConfig**: [`GraphQLLayoutServiceConfig`](../interfaces/GraphQLLayoutServiceConfig.md)

configuration

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:47](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L47)

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language`?): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language`? | `string` | the language to fetch layout data for. |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Overrides

`LayoutServiceBase.fetchLayoutData`

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:58](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L58)

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

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:85](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L85)

***

### getLayoutQuery()

> `protected` **getLayoutQuery**(`itemPath`, `language`?): `string`

Returns GraphQL Layout query

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | page route |
| `language`? | `string` | language |

#### Returns

`string`

GraphQL query

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:103](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L103)
