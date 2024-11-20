[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / personalizeLayout

# Function: personalizeLayout()

> **personalizeLayout**(`layout`, `variantId`, `componentVariantIds`?): [`PlaceholdersData`](../type-aliases/PlaceholdersData.md)\<`string`\> \| `undefined`

Apply personalization to layout data. This will recursively go through all placeholders/components, check experiences nodes and replace default with object from specific experience.

## Parameters

• **layout**: [`LayoutServiceData`](../interfaces/LayoutServiceData.md)

Layout data

• **variantId**: `string`

variant id

• **componentVariantIds?**: `string`[]

component variant ids

## Returns

[`PlaceholdersData`](../type-aliases/PlaceholdersData.md)\<`string`\> \| `undefined`

## Defined in

sitecore-jss/types/personalize/layout-personalizer.d.ts:13
