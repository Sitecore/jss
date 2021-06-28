---
name: layoutservice
routeTemplate: ./data/component-templates/article.yml
title: layoutservice
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [layout/layout-service](/docs/fundamentals/ref/jss/modules/layout_layout_service) / LayoutService

# Interface: LayoutService

[layout/layout-service](/docs/fundamentals/ref/jss/modules/layout_layout_service).LayoutService

## Implemented by

- [`LayoutServiceBase`](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase)

## Table of contents

### Methods

- [fetchLayoutData](/docs/fundamentals/ref/jss/interfaces/layout_layout_service/layoutservice#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

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
