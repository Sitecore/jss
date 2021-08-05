[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [layout/layout-service](../modules/layout_layout_service.md) / LayoutService

# Interface: LayoutService

[layout/layout-service](../modules/layout_layout_service.md).LayoutService

## Implemented by

- [`LayoutServiceBase`](../classes/layout_layout_service.LayoutServiceBase.md)

## Table of contents

### Methods

- [fetchLayoutData](layout_layout_service.LayoutService.md#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](layout_models.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](layout_models.LayoutServiceData.md)\>

layout data

#### Defined in

[layout/layout-service.ts:13](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/layout-service.ts#L13)
