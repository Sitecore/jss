[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / getComponentLibraryStylesheetLinks

# Function: getComponentLibraryStylesheetLinks()

> **getComponentLibraryStylesheetLinks**(`layoutData`, `sitecoreEdgeContextId`, `sitecoreEdgeUrl`?): [`HTMLLink`](../type-aliases/HTMLLink.md)[]

Walks through rendering tree and returns list of links of all FEAAS, BYOC or SXA Component Library Stylesheets that are used

## Parameters

• **layoutData**: [`LayoutServiceData`](../interfaces/LayoutServiceData.md)

Layout service data

• **sitecoreEdgeContextId**: `string`

Sitecore Edge Context ID

• **sitecoreEdgeUrl?**: `string`

Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io

## Returns

[`HTMLLink`](../type-aliases/HTMLLink.md)[]

library stylesheet links

## Defined in

sitecore-jss/types/layout/themes.d.ts:10
