[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / getContentStylesheetLink

# Variable: getContentStylesheetLink()

> `const` **getContentStylesheetLink**: (`layoutData`, `sitecoreEdgeContextId`, `sitecoreEdgeUrl?`) => `HTMLLink` \| `null`

Defined in: packages/sitecore-jss/types/layout/content-styles.d.ts:13

Get the content styles link to be loaded from the Sitecore Edge Platform

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layoutData` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) | Layout service data |
| `sitecoreEdgeContextId` | `string` | Sitecore Edge Context ID |
| `sitecoreEdgeUrl?` | `string` | Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io |

## Returns

`HTMLLink` \| `null`

content styles link, null if no styles are used in layout
