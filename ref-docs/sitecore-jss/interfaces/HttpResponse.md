[@sitecore-jss/sitecore-jss](../README.md) / HttpResponse

# Interface: HttpResponse<T\>

Response data for an HTTP request sent to an API

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of data model requested |

## Table of contents

### Properties

- [data](HttpResponse.md#data)
- [status](HttpResponse.md#status)
- [statusText](HttpResponse.md#statustext)

## Properties

### data

• **data**: `T`

Response content

#### Defined in

[data-fetcher.ts:14](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/data-fetcher.ts#L14)

___

### status

• **status**: `number`

HTTP status code of the response (i.e. 200, 404)

#### Defined in

[data-fetcher.ts:10](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/data-fetcher.ts#L10)

___

### statusText

• **statusText**: `string`

HTTP status text of the response (i.e. 'OK', 'Bad Request')

#### Defined in

[data-fetcher.ts:12](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/data-fetcher.ts#L12)
