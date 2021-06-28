---
name: graphqllayoutservice
routeTemplate: ./data/component-templates/article.yml
title: graphqllayoutservice
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [layout/graphql-layout-service](/docs/fundamentals/ref/jss/modules/layout_graphql_layout_service) / GraphQLLayoutService

# Class: GraphQLLayoutService

[layout/graphql-layout-service](/docs/fundamentals/ref/jss/modules/layout_graphql_layout_service).GraphQLLayoutService

## Hierarchy

- [`LayoutServiceBase`](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase)

  ↳ **`GraphQLLayoutService`**

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice#constructor)

### Properties

- [graphQLClient](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice#graphqlclient)
- [serviceConfig](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice#serviceconfig)

### Methods

- [fetchLayoutData](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice#fetchlayoutdata)
- [getGraphQLClient](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice#getgraphqlclient)
- [getLayoutQuery](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice#getlayoutquery)

## Constructors

### constructor

• **new GraphQLLayoutService**(`serviceConfig`)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](/docs/fundamentals/ref/jss/modules/layout_graphql_layout_service#graphqllayoutserviceconfig) |

#### Overrides

[LayoutServiceBase](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase).[constructor](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase#constructor)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

___

### serviceConfig

• **serviceConfig**: [`GraphQLLayoutServiceConfig`](/docs/fundamentals/ref/jss/modules/layout_graphql_layout_service#graphqllayoutserviceconfig)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |

#### Returns

`Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

layout service data

#### Overrides

[LayoutServiceBase](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase).[fetchLayoutData](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase#fetchlayoutdata)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

implementation

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
