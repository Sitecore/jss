---
name: httpresponse
routeTemplate: ./data/component-templates/article.yml
title: httpresponse
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [data-fetcher](/docs/fundamentals/ref/jss/modules/data_fetcher) / HttpResponse

# Interface: HttpResponse<T\>

[data-fetcher](/docs/fundamentals/ref/jss/modules/data_fetcher).HttpResponse

Response data for an HTTP request sent to an API

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of data model requested |

## Table of contents

### Properties

- [data](/docs/fundamentals/ref/jss/interfaces/data_fetcher/httpresponse#data)
- [status](/docs/fundamentals/ref/jss/interfaces/data_fetcher/httpresponse#status)
- [statusText](/docs/fundamentals/ref/jss/interfaces/data_fetcher/httpresponse#statustext)

## Properties

### data

• **data**: `T`

Response content

___

### status

• **status**: `number`

HTTP status code of the response (i.e. 200, 404)

___

### statusText

• **statusText**: `string`

HTTP status text of the response (i.e. 'OK', 'Bad Request')
