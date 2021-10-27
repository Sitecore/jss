[@sitecore-jss/sitecore-jss](../README.md) / LayoutService

# Interface: LayoutService

## Table of contents

### Methods

- [fetchLayoutData](LayoutService.md#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](LayoutServiceData.md)\>

layout data

#### Defined in

[layout-service.ts:13](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/layout-service.ts#L13)
