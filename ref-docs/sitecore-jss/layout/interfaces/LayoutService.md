[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / LayoutService

# Interface: LayoutService

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language`?, `req`?, `res`?): `Promise`\<[`LayoutServiceData`](LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` |  |
| `language`? | `string` |  |
| `req`? | `IncomingMessage` | Request instance |
| `res`? | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](LayoutServiceData.md)\>

layout data

#### Defined in

[packages/sitecore-jss/src/layout/layout-service.ts:13](https://github.com/Sitecore/jss/blob/14151f477bc063e5e56ed6c6c7cac5f881ce3240/packages/sitecore-jss/src/layout/layout-service.ts#L13)
