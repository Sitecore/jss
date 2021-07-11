---
name: layoutservicebase
routeTemplate: ./data/component-templates/article.yml
title: layoutservicebase
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [layout/layout-service](/docs/fundamentals/ref/jss/modules/layout_layout_service) / LayoutServiceBase

# Class: LayoutServiceBase

[layout/layout-service](/docs/fundamentals/ref/jss/modules/layout_layout_service).LayoutServiceBase

## Hierarchy

- **`LayoutServiceBase`**

  ↳ [`GraphQLLayoutService`](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice)

  ↳ [`RestLayoutService`](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice)

## Implements

- [`LayoutService`](/docs/fundamentals/ref/jss/interfaces/layout_layout_service/layoutservice)

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase#constructor)

### Methods

- [fetchLayoutData](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase#fetchlayoutdata)

## Constructors

### constructor

• **new LayoutServiceBase**()

## Methods

### fetchLayoutData

▸ `Abstract` **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

layout data

#### Implementation of

[LayoutService](/docs/fundamentals/ref/jss/interfaces/layout_layout_service/layoutservice).[fetchLayoutData](/docs/fundamentals/ref/jss/interfaces/layout_layout_service/layoutservice#fetchlayoutdata)
