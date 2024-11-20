[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / HttpResponse

# Interface: HttpResponse\<T\>

Response data for an HTTP request sent to an API

## Type Parameters

• **T**

the type of data model requested

## Properties

### data

> **data**: `T`

Response content

#### Defined in

packages/sitecore-jss/types/data-fetcher.d.ts:12

***

### status

> **status**: `number`

HTTP status code of the response (i.e. 200, 404)

#### Defined in

packages/sitecore-jss/types/data-fetcher.d.ts:8

***

### statusText

> **statusText**: `string`

HTTP status text of the response (i.e. 'OK', 'Bad Request')

#### Defined in

packages/sitecore-jss/types/data-fetcher.d.ts:10
