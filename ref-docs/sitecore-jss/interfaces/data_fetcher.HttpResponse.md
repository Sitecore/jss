[Sitecore JavaScript Rendering SDK](../README.md) / [data-fetcher](../modules/data_fetcher.md) / HttpResponse

# Interface: HttpResponse<T\>

[data-fetcher](../modules/data_fetcher.md).HttpResponse

Response data for an HTTP request sent to an API

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of data model requested |

## Table of contents

### Properties

- [data](data_fetcher.HttpResponse.md#data)
- [status](data_fetcher.HttpResponse.md#status)
- [statusText](data_fetcher.HttpResponse.md#statustext)

## Properties

### data

• **data**: `T`

Response content

#### Defined in

[data-fetcher.ts:14](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/data-fetcher.ts#L14)

___

### status

• **status**: `number`

HTTP status code of the response (i.e. 200, 404)

#### Defined in

[data-fetcher.ts:10](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/data-fetcher.ts#L10)

___

### statusText

• **statusText**: `string`

HTTP status text of the response (i.e. 'OK', 'Bad Request')

#### Defined in

[data-fetcher.ts:12](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/data-fetcher.ts#L12)
