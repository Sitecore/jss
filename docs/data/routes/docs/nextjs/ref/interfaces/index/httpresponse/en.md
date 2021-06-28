---
name: httpresponse
routeTemplate: ./data/component-templates/article.yml
title: httpresponse
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [index](/docs/nextjs/ref/modules/index) / HttpResponse

# Interface: HttpResponse<T\>

[index](/docs/nextjs/ref/modules/index).HttpResponse

Response data for an HTTP request sent to an API

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the type of data model requested |

## Table of contents

### Properties

- [data](/docs/nextjs/ref/interfaces/index/httpresponse#data)
- [status](/docs/nextjs/ref/interfaces/index/httpresponse#status)
- [statusText](/docs/nextjs/ref/interfaces/index/httpresponse#statustext)

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
