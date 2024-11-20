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

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:12](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L12)