[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / LayoutService

# Interface: LayoutService

[layout](../modules/layout.md).LayoutService

## Table of contents

### Methods

- [fetchLayoutData](layout.LayoutService.md#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](layout.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` |  |
| `language?` | `string` |  |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse` | Response instance |

#### Returns

`Promise`<[`LayoutServiceData`](layout.LayoutServiceData.md)\>

layout data

#### Defined in

[src/layout/layout-service.ts:13](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss/src/layout/layout-service.ts#L13)
