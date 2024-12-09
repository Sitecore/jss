[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / HttpResponse

# Interface: HttpResponse\<T\>

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

[packages/sitecore-jss/src/data-fetcher.ts:14](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss/src/data-fetcher.ts#L14)

***

### status

> **status**: `number`

HTTP status code of the response (i.e. 200, 404)

#### Defined in

[packages/sitecore-jss/src/data-fetcher.ts:10](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss/src/data-fetcher.ts#L10)

***

### statusText

> **statusText**: `string`

HTTP status text of the response (i.e. 'OK', 'Bad Request')

#### Defined in

[packages/sitecore-jss/src/data-fetcher.ts:12](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss/src/data-fetcher.ts#L12)
