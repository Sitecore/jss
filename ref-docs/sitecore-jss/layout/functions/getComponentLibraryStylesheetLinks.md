[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / getComponentLibraryStylesheetLinks

# Function: getComponentLibraryStylesheetLinks()

> **getComponentLibraryStylesheetLinks**(`layoutData`, `sitecoreEdgeContextId`, `sitecoreEdgeUrl`?): [`HTMLLink`](../../index/type-aliases/HTMLLink.md)[]

Walks through rendering tree and returns list of links of all FEAAS, BYOC or SXA Component Library Stylesheets that are used

## Parameters

• **layoutData**: [`LayoutServiceData`](../interfaces/LayoutServiceData.md)

Layout service data

• **sitecoreEdgeContextId**: `string`

Sitecore Edge Context ID

• **sitecoreEdgeUrl?**: `string` = `SITECORE_EDGE_URL_DEFAULT`

Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io

## Returns

[`HTMLLink`](../../index/type-aliases/HTMLLink.md)[]

library stylesheet links

## Defined in

[packages/sitecore-jss/src/layout/themes.ts:24](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/layout/themes.ts#L24)