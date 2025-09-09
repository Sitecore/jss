[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / BasicEditingDataServiceConfig

# Interface: BasicEditingDataServiceConfig

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:56](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L56)

## Properties

### editingDataCache?

> `optional` **editingDataCache**: [`EditingDataCache`](EditingDataCache.md)

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:64](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L64)

An instance of the `EditingDataCache` implementation to use.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

#### Default

```ts
editingDataDiskCache
```

#### See

 - EditingDataCache
 - EditingDataDiskCache
