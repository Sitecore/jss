[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / BasicEditingDataServiceConfig

# Interface: BasicEditingDataServiceConfig

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:56](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L56)

## Properties

### editingDataCache?

> `optional` **editingDataCache**: [`EditingDataCache`](EditingDataCache.md)

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:64](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L64)

An instance of the `EditingDataCache` implementation to use.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

#### Default

```ts
editingDataDiskCache
```

#### See

 - EditingDataCache
 - EditingDataDiskCache
