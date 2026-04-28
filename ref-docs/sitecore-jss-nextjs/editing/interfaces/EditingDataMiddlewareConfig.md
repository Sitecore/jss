[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataMiddlewareConfig

# Interface: EditingDataMiddlewareConfig

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:12](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L12)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:12](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L12)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### dynamicRouteKey?

> `optional` **dynamicRouteKey?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:18](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L18)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:18](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L18)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The Next.js dynamic API route key name. This is used in the middleware to extract the data
key from the request query parameters. By default this is 'key' (from '/api/editing/data/[key]').

#### Default

```ts
'key'
```

***

### editingDataCache?

> `optional` **editingDataCache?**: [`EditingDataCache`](EditingDataCache.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:27](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L27)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:27](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L27)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
