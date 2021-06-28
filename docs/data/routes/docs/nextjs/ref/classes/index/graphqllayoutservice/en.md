---
name: graphqllayoutservice
routeTemplate: ./data/component-templates/article.yml
title: graphqllayoutservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [index](/docs/nextjs/ref/modules/index) / GraphQLLayoutService

# Class: GraphQLLayoutService

[index](/docs/nextjs/ref/modules/index).GraphQLLayoutService

## Hierarchy

- `LayoutServiceBase`

  ↳ **`GraphQLLayoutService`**

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/index/graphqllayoutservice#constructor)

### Properties

- [graphQLClient](/docs/nextjs/ref/classes/index/graphqllayoutservice#graphqlclient)
- [serviceConfig](/docs/nextjs/ref/classes/index/graphqllayoutservice#serviceconfig)

### Methods

- [fetchLayoutData](/docs/nextjs/ref/classes/index/graphqllayoutservice#fetchlayoutdata)
- [getGraphQLClient](/docs/nextjs/ref/classes/index/graphqllayoutservice#getgraphqlclient)
- [getLayoutQuery](/docs/nextjs/ref/classes/index/graphqllayoutservice#getlayoutquery)

## Constructors

### constructor

• **new GraphQLLayoutService**(`serviceConfig`)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`GraphQLLayoutServiceConfig`](/docs/nextjs/ref/modules/index#graphqllayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

___

### serviceConfig

• **serviceConfig**: [`GraphQLLayoutServiceConfig`](/docs/nextjs/ref/modules/index#graphqllayoutserviceconfig)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`): `Promise`<[`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |

#### Returns

`Promise`<[`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

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
