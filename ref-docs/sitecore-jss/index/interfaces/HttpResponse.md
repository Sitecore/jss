[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / HttpResponse

# Interface: HttpResponse\<T\>

Defined in: [packages/sitecore-jss/src/data-fetcher.ts:9](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/data-fetcher.ts#L9)

Response data for an HTTP request sent to an API

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | the type of data model requested |

## Properties

### data

> **data**: `T`

Defined in: [packages/sitecore-jss/src/data-fetcher.ts:15](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/data-fetcher.ts#L15)

Response content

***

### status

> **status**: `number`

Defined in: [packages/sitecore-jss/src/data-fetcher.ts:11](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/data-fetcher.ts#L11)

HTTP status code of the response (i.e. 200, 404)

***

### statusText

> **statusText**: `string`

Defined in: [packages/sitecore-jss/src/data-fetcher.ts:13](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/data-fetcher.ts#L13)

HTTP status text of the response (i.e. 'OK', 'Bad Request')
