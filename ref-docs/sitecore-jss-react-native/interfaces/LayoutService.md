[**@sitecore-jss/sitecore-jss-react-native**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-native](../README.md) / LayoutService

# Interface: LayoutService

Defined in: sitecore-jss/types/layout/layout-service.d.ts:3

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`\<[`LayoutServiceData`](LayoutServiceData.md)\>

Defined in: sitecore-jss/types/layout/layout-service.d.ts:12

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` |  |
| `language?` | `string` |  |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse` | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](LayoutServiceData.md)\>

layout data
