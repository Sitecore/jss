[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingConfigMiddlewareConfig

# Type Alias: EditingConfigMiddlewareConfig

> **EditingConfigMiddlewareConfig**: `object`

## Type declaration

### components

> **components**: `string`[] \| `Map`\<`string`, `unknown`\>

Components available in the application

### metadata

> **metadata**: `Metadata`

Application metadata

### pagesEditMode?

> `optional` **pagesEditMode**: [`EditMode`](../../index/enumerations/EditMode.md)

Determines which editing mode should be used by Pages.
Can be either 'chromes' or 'metadata'.
By default its 'metadata'

## Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:12](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L12)
