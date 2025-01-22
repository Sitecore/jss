[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / CacheOptions

# Interface: CacheOptions

Minimum configuration options for classes that implement

## See

CacheClient

## Extended by

- [`GraphQLDictionaryServiceConfig`](../../i18n/interfaces/GraphQLDictionaryServiceConfig.md)

## Properties

### cacheEnabled?

> `optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

#### Default

```ts
true
```

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:40](https://github.com/Sitecore/jss/blob/a7d807eb792128c89facd42fd54f8177ce44b9b9/packages/sitecore-jss/src/cache-client.ts#L40)

***

### cacheTimeout?

> `optional` **cacheTimeout**: `number`

Cache timeout (sec)

#### Default

```ts
60
```

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:45](https://github.com/Sitecore/jss/blob/a7d807eb792128c89facd42fd54f8177ce44b9b9/packages/sitecore-jss/src/cache-client.ts#L45)
