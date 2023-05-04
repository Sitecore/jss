[@sitecore-jss/sitecore-jss-react](../README.md) / LayoutService

# Interface: LayoutService

## Table of contents

### Methods

- [fetchLayoutData](LayoutService.md#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` |  |
| `language?` | `string` |  |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse`<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`<[`LayoutServiceData`](LayoutServiceData.md)\>

layout data

#### Defined in

sitecore-jss/types/layout/layout-service.d.ts:13
