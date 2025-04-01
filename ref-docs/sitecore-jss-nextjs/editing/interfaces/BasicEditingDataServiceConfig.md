[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / BasicEditingDataServiceConfig

# Interface: BasicEditingDataServiceConfig

## Properties

### editingDataCache?

> `optional` **editingDataCache**: [`EditingDataCache`](EditingDataCache.md)

An instance of the `EditingDataCache` implementation to use.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

#### Default

```ts
editingDataDiskCache
```

#### See

 - EditingDataCache
 - EditingDataDiskCache

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:64](https://github.com/Sitecore/jss/blob/9ab3ece4faaed005b0df56fed7a6f9f87cf75ebc/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L64)
