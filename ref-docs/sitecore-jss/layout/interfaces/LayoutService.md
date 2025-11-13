[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / LayoutService

# Interface: LayoutService

Defined in: [packages/sitecore-jss/src/layout/layout-service.ts:4](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/layout/layout-service.ts#L4)

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`\<[`LayoutServiceData`](LayoutServiceData.md)\>

Defined in: [packages/sitecore-jss/src/layout/layout-service.ts:13](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/layout/layout-service.ts#L13)

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` |  |
| `language?` | `string` |  |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](LayoutServiceData.md)\>

layout data
