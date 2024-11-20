[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / GraphQLLayoutService

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

• **serviceConfig**: `GraphQLLayoutServiceConfig`

configuration

#### Returns

[`GraphQLLayoutService`](GraphQLLayoutService.md)

#### Overrides

`LayoutServiceBase.constructor`

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:38

## Properties

### serviceConfig

> **serviceConfig**: `GraphQLLayoutServiceConfig`

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:32

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language`?): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

• **itemPath**: `string`

item path to fetch layout data for.

• **language?**: `string`

the language to fetch layout data for.

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Overrides

`LayoutServiceBase.fetchLayoutData`

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:45

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:52

***

### getLayoutQuery()

> `protected` **getLayoutQuery**(`itemPath`, `language`?): `string`

Returns GraphQL Layout query

#### Parameters

• **itemPath**: `string`

page route

• **language?**: `string`

language

#### Returns

`string`

GraphQL query

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:59
