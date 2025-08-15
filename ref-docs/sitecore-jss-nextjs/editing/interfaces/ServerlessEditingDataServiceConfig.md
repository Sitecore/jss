[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / ServerlessEditingDataServiceConfig

# Interface: ServerlessEditingDataServiceConfig

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:113](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L113)

## Properties

### apiRoute?

> `optional` **apiRoute**: `string`

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:121](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L121)

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

> `optional` **dataFetcher**: [`NativeDataFetcher`](../../index/classes/NativeDataFetcher.md)

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:127](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L127)

The `NativeDataFetcher` instance to use for API requests.

#### Default

```ts
new NativeDataFetcher()
```

#### See

NativeDataFetcher
