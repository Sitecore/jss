[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / EditingDataMiddlewareConfig

# Interface: EditingDataMiddlewareConfig

[middleware](../modules/middleware.md).EditingDataMiddlewareConfig

## Table of contents

### Properties

- [dynamicRouteKey](middleware.EditingDataMiddlewareConfig.md#dynamicroutekey)
- [editingDataCache](middleware.EditingDataMiddlewareConfig.md#editingdatacache)

## Properties

### dynamicRouteKey

• `Optional` **dynamicRouteKey**: `string`

The Next.js dynamic API route key name. This is used in the middleware to extract the data
key from the request query parameters. By default this is 'key' (from '/api/editing/data/[key]').

**`default`** 'key'

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts:13](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L13)

___

### editingDataCache

• `Optional` **editingDataCache**: [`EditingDataCache`](middleware.EditingDataCache.md)

An instance of the `EditingDataCache` implementation to use.
Note for Vercel deployment, which uses Serverless Functions for API routes, a disk cache is required.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

**`default`** editingDataDiskCache

**`see`** EditingDataCache

**`see`** EditingDataDiskCache

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts:22](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L22)
