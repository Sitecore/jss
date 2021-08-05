[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [middleware/editing-data-middleware](../modules/middleware_editing_data_middleware.md) / EditingDataMiddlewareConfig

# Interface: EditingDataMiddlewareConfig

[middleware/editing-data-middleware](../modules/middleware_editing_data_middleware.md).EditingDataMiddlewareConfig

## Table of contents

### Properties

- [dynamicRouteKey](middleware_editing_data_middleware.EditingDataMiddlewareConfig.md#dynamicroutekey)
- [editingDataCache](middleware_editing_data_middleware.EditingDataMiddlewareConfig.md#editingdatacache)

## Properties

### dynamicRouteKey

• `Optional` **dynamicRouteKey**: `string`

The Next.js dynamic API route key name. This is used in the middleware to extract the data
key from the request query parameters. By default this is 'key' (from '/api/editing/data/[key]').

**`default`** 'key'

#### Defined in

[src/middleware/editing-data-middleware.ts:13](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L13)

___

### editingDataCache

• `Optional` **editingDataCache**: [`EditingDataCache`](middleware_editing_data_cache.EditingDataCache.md)

An instance of the `EditingDataCache` implementation to use.
Note for Vercel deployment, which uses Serverless Functions for API routes, a disk cache is required.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

**`default`** editingDataDiskCache

**`see`** EditingDataCache

**`see`** EditingDataDiskCache

#### Defined in

[src/middleware/editing-data-middleware.ts:22](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L22)
