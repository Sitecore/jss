[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / DataFetcherResolver

# Type Alias: DataFetcherResolver()

> **DataFetcherResolver**: \<`T`\>(`req`?, `res`?) => [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<`T`\> \| `NativeDataFetcherFunction`\<`T`\>

Data fetcher resolver in order to provide custom data fetcher

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req`? | `IncomingMessage` | Request instance |
| `res`? | `ServerResponse` | Response instance |

## Returns

[`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<`T`\> \| `NativeDataFetcherFunction`\<`T`\>

## Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:57](https://github.com/Sitecore/jss/blob/a9ed7a79aa84b880bf091f297457fa587c645671/packages/sitecore-jss/src/layout/rest-layout-service.ts#L57)
