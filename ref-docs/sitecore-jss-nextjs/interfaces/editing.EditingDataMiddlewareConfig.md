[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingDataMiddlewareConfig

# Interface: EditingDataMiddlewareConfig

[editing](../modules/editing.md).EditingDataMiddlewareConfig

## Table of contents

### Properties

- [dynamicRouteKey](editing.EditingDataMiddlewareConfig.md#dynamicroutekey)
- [editingDataCache](editing.EditingDataMiddlewareConfig.md#editingdatacache)

## Properties

### dynamicRouteKey

• `Optional` **dynamicRouteKey**: `string`

The Next.js dynamic API route key name. This is used in the middleware to extract the data
key from the request query parameters. By default this is 'key' (from '/api/editing/data/[key]').

**`Default`**

'key'

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:13](https://github.com/Sitecore/jss/blob/e853e9616/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L13)

___

### editingDataCache

• `Optional` **editingDataCache**: [`EditingDataCache`](editing.EditingDataCache.md)

An instance of the `EditingDataCache` implementation to use.
Note for Vercel deployment, which uses Serverless Functions for API routes, a disk cache is required.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

**`Default`**

editingDataDiskCache

**`See`**

 - EditingDataCache
 - EditingDataDiskCache

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:22](https://github.com/Sitecore/jss/blob/e853e9616/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L22)
