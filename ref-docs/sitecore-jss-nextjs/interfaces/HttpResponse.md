[@sitecore-jss/sitecore-jss-nextjs](../README.md) / HttpResponse

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

sitecore-jss/types/data-fetcher.d.ts:13

___

### status

• **status**: `number`

HTTP status code of the response (i.e. 200, 404)

#### Defined in

sitecore-jss/types/data-fetcher.d.ts:9

___

### statusText

• **statusText**: `string`

HTTP status text of the response (i.e. 'OK', 'Bad Request')

#### Defined in

sitecore-jss/types/data-fetcher.d.ts:11
