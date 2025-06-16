[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingMetadataPreviewData

# Type Alias: EditingMetadataPreviewData

> **EditingMetadataPreviewData**: `object`

Data for Next.js Preview (Editing) Metadata Edit Mode.

## Type declaration

### editMode

> **editMode**: [`Metadata`](../../index/enumerations/EditMode.md#metadata)

### itemId

> **itemId**: `string`

### language

> **language**: `string`

### layoutKind?

> `optional` **layoutKind**: `LayoutKind`

### pageState

> **pageState**: `Exclude`\<[`LayoutServicePageState`](../../index/enumerations/LayoutServicePageState.md), `"Normal"`\>

### site

> **site**: `string`

### variantIds

> **variantIds**: `string`[]

### version?

> `optional` **version**: `string`

## Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:284](https://github.com/Sitecore/jss/blob/856dc4f92242c60f55f8d81552010771c7f8647c/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L284)
