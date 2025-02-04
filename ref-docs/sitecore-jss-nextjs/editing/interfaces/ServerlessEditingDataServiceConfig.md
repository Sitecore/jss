[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / ServerlessEditingDataServiceConfig

# Interface: ServerlessEditingDataServiceConfig

## Properties

### apiRoute?

> `optional` **apiRoute**: `string`

The Next.js API route to invoke.
This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
This endpoint should run the `EditingDataMiddleware`.

#### Default

```ts
'/api/editing/data/[key]'
```

#### See

EditingDataMiddleware

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:121](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L121)

***

### dataFetcher?

> `optional` **dataFetcher**: [`NativeDataFetcher`](../../index/classes/NativeDataFetcher.md)

The `NativeDataFetcher` instance to use for API requests.

#### Default

```ts
new NativeDataFetcher()
```

#### See

NativeDataFetcher

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:127](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L127)
