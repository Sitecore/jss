[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / NativeDataFetcherResponse

# Interface: NativeDataFetcherResponse\<T\>

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:23](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/native-fetcher.ts#L23)

Response data for an HTTP request sent to an API

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | the type of data model requested |

## Properties

### data

> **data**: `T`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:29](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/native-fetcher.ts#L29)

Response content

***

### headers?

> `optional` **headers**: `HeadersInit`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:31](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/native-fetcher.ts#L31)

Response headers

***

### status

> **status**: `number`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:25](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/native-fetcher.ts#L25)

HTTP status code of the response (i.e. 200, 404)

***

### statusText

> **statusText**: `string`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:27](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/native-fetcher.ts#L27)

HTTP status text of the response (i.e. 'OK', 'Bad Request')
