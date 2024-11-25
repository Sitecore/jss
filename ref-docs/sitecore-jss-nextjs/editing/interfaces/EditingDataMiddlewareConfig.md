[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataMiddlewareConfig

# Interface: EditingDataMiddlewareConfig

## Properties

### dynamicRouteKey?

> `optional` **dynamicRouteKey**: `string`

The Next.js dynamic API route key name. This is used in the middleware to extract the data
key from the request query parameters. By default this is 'key' (from '/api/editing/data/[key]').

#### Default

```ts
'key'
```

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:18](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L18)

***

### editingDataCache?

> `optional` **editingDataCache**: [`EditingDataCache`](EditingDataCache.md)

An instance of the `EditingDataCache` implementation to use.
Note for Vercel deployment, which uses Serverless Functions for API routes, a disk cache is required.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

#### Default

```ts
editingDataDiskCache
```

#### See

 - EditingDataCache
 - EditingDataDiskCache

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:27](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L27)
