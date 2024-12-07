[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / fetchData

# Function: fetchData()

> **fetchData**\<`T`\>(`url`, `fetcher`, `params`): `Promise`\<`T`\>

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | the URL to request; may include query string |
| `fetcher` | [`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<`T`\> | the fetcher to use to perform the request |
| `params` | `ParsedUrlQueryInput` | the query string parameters to send with the request |

## Returns

`Promise`\<`T`\>

## Defined in

[packages/sitecore-jss/src/data-fetcher.ts:57](https://github.com/Sitecore/jss/blob/d00fef6718046b8c406769a72405039bc95ed947/packages/sitecore-jss/src/data-fetcher.ts#L57)
