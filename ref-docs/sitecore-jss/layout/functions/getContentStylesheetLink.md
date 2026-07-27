[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / getContentStylesheetLink

# Function: getContentStylesheetLink()

> **getContentStylesheetLink**(`layoutData`, `sitecoreEdgeContextId`, `sitecoreEdgeUrl?`): [`HTMLLink`](../../index/type-aliases/HTMLLink.md) \| `null`

Defined in: [packages/sitecore-jss/src/layout/content-styles.ts:26](https://github.com/Sitecore/jss/blob/bb94a11d798b90441596d37d2022c73e9c91df04/packages/sitecore-jss/src/layout/content-styles.ts#L26)

Get the content styles link to be loaded from the Sitecore Edge Platform

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `layoutData` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) | `undefined` | Layout service data |
| `sitecoreEdgeContextId` | `string` | `undefined` | Sitecore Edge Context ID |
| `sitecoreEdgeUrl?` | `string` | `SITECORE_EDGE_URL_DEFAULT` | Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io |

## Returns

[`HTMLLink`](../../index/type-aliases/HTMLLink.md) \| `null`

content styles link, null if no styles are used in layout
