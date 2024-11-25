[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / fetchData

# Function: fetchData()

> **fetchData**\<`T`\>(`url`, `fetcher`, `params`): `Promise`\<`T`\>

## Type Parameters

• **T**

## Parameters

• **url**: `string`

the URL to request; may include query string

• **fetcher**: [`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<`T`\>

the fetcher to use to perform the request

• **params**: `ParsedUrlQueryInput` = `{}`

the query string parameters to send with the request

## Returns

`Promise`\<`T`\>

## Defined in

[packages/sitecore-jss/src/data-fetcher.ts:57](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/data-fetcher.ts#L57)
