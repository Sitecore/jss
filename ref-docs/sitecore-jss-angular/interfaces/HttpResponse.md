[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / HttpResponse

# Interface: HttpResponse\<T\>

Defined in: packages/sitecore-jss/types/data-fetcher.d.ts:7

Response data for an HTTP request sent to an API

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | the type of data model requested |

## Properties

### data

> **data**: `T`

Defined in: packages/sitecore-jss/types/data-fetcher.d.ts:13

Response content

***

### status

> **status**: `number`

Defined in: packages/sitecore-jss/types/data-fetcher.d.ts:9

HTTP status code of the response (i.e. 200, 404)

***

### statusText

> **statusText**: `string`

Defined in: packages/sitecore-jss/types/data-fetcher.d.ts:11

HTTP status text of the response (i.e. 'OK', 'Bad Request')
