[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / getContentStylesheetLink

# Function: getContentStylesheetLink()

> **getContentStylesheetLink**(`layoutData`, `sitecoreEdgeContextId`, `sitecoreEdgeUrl`?): `null` \| [`HTMLLink`](../../index/type-aliases/HTMLLink.md)

Get the content styles link to be loaded from the Sitecore Edge Platform

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `layoutData` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) | `undefined` | Layout service data |
| `sitecoreEdgeContextId` | `string` | `undefined` | Sitecore Edge Context ID |
| `sitecoreEdgeUrl`? | `string` | `SITECORE_EDGE_URL_DEFAULT` | Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io |

## Returns

`null` \| [`HTMLLink`](../../index/type-aliases/HTMLLink.md)

content styles link, null if no styles are used in layout

## Defined in

[packages/sitecore-jss/src/layout/content-styles.ts:26](https://github.com/Sitecore/jss/blob/af24dc733f2da542fbd685fe19113cb44a99f6ba/packages/sitecore-jss/src/layout/content-styles.ts#L26)
