[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / ServerlessEditingDataServiceConfig

# Interface: ServerlessEditingDataServiceConfig

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:113](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L113)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:113](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L113)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### apiRoute?

> `optional` **apiRoute?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:121](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L121)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:121](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L121)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The Next.js API route to invoke.
This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
This endpoint should run the `EditingDataMiddleware`.

#### Default

```ts
'/api/editing/data/[key]'
```

#### See

EditingDataMiddleware

***

### dataFetcher?

> `optional` **dataFetcher?**: [`NativeDataFetcher`](../../index/classes/NativeDataFetcher.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:127](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L127)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:127](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L127)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The `NativeDataFetcher` instance to use for API requests.

#### Default

```ts
new NativeDataFetcher()
```

#### See

NativeDataFetcher
