[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / personalizeLayout

# Function: personalizeLayout()

> **personalizeLayout**(`layout`, `variantId`, `componentVariantIds?`): [`PlaceholdersData`](../../layout/type-aliases/PlaceholdersData.md)\<`string`\> \| `undefined`

Defined in: [packages/sitecore-jss/src/personalize/layout-personalizer.ts:28](https://github.com/Sitecore/jss/blob/4ce2efe7e448483cf1ae360a90417b0dfe43089b/packages/sitecore-jss/src/personalize/layout-personalizer.ts#L28)

Apply personalization to layout data. This will recursively go through all placeholders/components, check experiences nodes and replace default with object from specific experience.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `layout` | [`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md) | Layout data |
| `variantId` | `string` | variant id |
| `componentVariantIds?` | `string`[] | component variant ids |

## Returns

[`PlaceholdersData`](../../layout/type-aliases/PlaceholdersData.md)\<`string`\> \| `undefined`
