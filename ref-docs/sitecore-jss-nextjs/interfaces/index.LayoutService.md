[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / LayoutService

# Interface: LayoutService

[index](../modules/index.md).LayoutService

## Table of contents

### Methods

- [fetchLayoutData](index.LayoutService.md#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](index.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](index.LayoutServiceData.md)\>

layout data

#### Defined in

sitecore-jss/types/layout/layout-service.d.ts:13
