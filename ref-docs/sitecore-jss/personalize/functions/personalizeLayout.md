[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / personalizeLayout

# Function: personalizeLayout()

> **personalizeLayout**(`layout`, `variantId`, `componentVariantIds`?): [`PlaceholdersData`](../../layout/type-aliases/PlaceholdersData.md)\<`string`\> \| `undefined`

Apply personalization to layout data. This will recursively go through all placeholders/components, check experiences nodes and replace default with object from specific experience.

## Parameters

• **layout**: [`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)

Layout data

• **variantId**: `string`

variant id

• **componentVariantIds?**: `string`[]

component variant ids

## Returns

[`PlaceholdersData`](../../layout/type-aliases/PlaceholdersData.md)\<`string`\> \| `undefined`

## Defined in

[packages/sitecore-jss/src/personalize/layout-personalizer.ts:28](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/personalize/layout-personalizer.ts#L28)
