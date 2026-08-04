[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / RedisEditingDataCacheOptions

# Interface: RedisEditingDataCacheOptions

Defined in: sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:9

Options for [RedisEditingDataCache](../classes/RedisEditingDataCache.md)

## Properties

### defaultTtl?

> `optional` **defaultTtl?**: `number`

Defined in: sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:26

TTL (in seconds) applied to cache entries on `set`

#### Default

```ts
120
```

***

### redisToken

> **redisToken**: `string`

Defined in: sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:21

Redis REST API endpoint token. On Vercel, Redis Marketplace integrations (e.g. Upstash) inject this
as process.env.KV_REST_API_TOKEN - use process.env.UPSTASH_REDIS_REST_TOKEN only if connecting to an
Upstash database directly, outside of a Vercel integration.

***

### redisUrl

> **redisUrl**: `string`

Defined in: sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:15

Redis REST API endpoint URL. On Vercel, Redis Marketplace integrations (e.g. Upstash) inject this
as process.env.KV_REST_API_URL - use process.env.UPSTASH_REDIS_REST_URL only if connecting to an
Upstash database directly, outside of a Vercel integration.
