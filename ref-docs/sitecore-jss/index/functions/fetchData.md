[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / fetchData

# Function: fetchData()

> **fetchData**\<`T`\>(`url`, `fetcher`, `params`): `Promise`\<`T`\>

Defined in: [packages/sitecore-jss/src/data-fetcher.ts:45](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/data-fetcher.ts#L45)

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | the URL to request; may include query string |
| `fetcher` | [`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<`T`\> \| `NativeDataFetcherFunction`\<`T`\> | the fetcher to use to perform the request |
| `params` | `ParsedUrlQueryInput` | the query string parameters to send with the request |

## Returns

`Promise`\<`T`\>
