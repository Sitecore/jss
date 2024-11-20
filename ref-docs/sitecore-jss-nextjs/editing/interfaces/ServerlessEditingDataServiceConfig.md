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

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:121](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L121)

***

### dataFetcher?

> `optional` **dataFetcher**: [`AxiosDataFetcher`](../../index/classes/AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

#### Default

```ts
new AxiosDataFetcher()
```

#### See

AxiosDataFetcher

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:127](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L127)