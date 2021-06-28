---
name: layoutservice
routeTemplate: ./data/component-templates/article.yml
title: layoutservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [index](/docs/nextjs/ref/modules/index) / LayoutService

# Interface: LayoutService

[index](/docs/nextjs/ref/modules/index).LayoutService

## Table of contents

### Methods

- [fetchLayoutData](/docs/nextjs/ref/interfaces/index/layoutservice#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata)\>

layout data
