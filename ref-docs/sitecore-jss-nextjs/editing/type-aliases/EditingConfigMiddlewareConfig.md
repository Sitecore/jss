[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingConfigMiddlewareConfig

# Type Alias: EditingConfigMiddlewareConfig

> **EditingConfigMiddlewareConfig** = `object`

Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:12](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L12)

## Properties

### components

> **components**: `string`[] \| `Map`\<`string`, `unknown`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:16](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L16)

Components available in the application

***

### metadata

> **metadata**: `Metadata`

Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:20](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L20)

Application metadata

***

### pagesEditMode?

> `optional` **pagesEditMode**: [`EditMode`](../../index/enumerations/EditMode.md)

Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:26](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L26)

Determines which editing mode should be used by Pages.
Can be either 'chromes' or 'metadata'.
By default its 'metadata'
