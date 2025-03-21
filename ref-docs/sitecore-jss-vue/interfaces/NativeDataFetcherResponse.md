[**@sitecore-jss/sitecore-jss-vue**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-vue](../README.md) / NativeDataFetcherResponse

# Interface: NativeDataFetcherResponse\<T\>

Response data for an HTTP request sent to an API

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | the type of data model requested |

## Properties

### data

> **data**: `T`

Response content

#### Defined in

packages/sitecore-jss/types/native-fetcher.d.ts:26

***

### headers?

> `optional` **headers**: `HeadersInit`

Response headers

#### Defined in

packages/sitecore-jss/types/native-fetcher.d.ts:28

***

### status

> **status**: `number`

HTTP status code of the response (i.e. 200, 404)

#### Defined in

packages/sitecore-jss/types/native-fetcher.d.ts:22

***

### statusText

> **statusText**: `string`

HTTP status text of the response (i.e. 'OK', 'Bad Request')

#### Defined in

packages/sitecore-jss/types/native-fetcher.d.ts:24
