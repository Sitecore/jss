---
name: layoutservicerequestoptions
routeTemplate: ./data/component-templates/article.yml
title: layoutservicerequestoptions
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [index](/docs/nextjs/ref/modules/index) / LayoutServiceRequestOptions

# Interface: LayoutServiceRequestOptions<T\>

[index](/docs/nextjs/ref/modules/index).LayoutServiceRequestOptions

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [fetcher](/docs/nextjs/ref/interfaces/index/layoutservicerequestoptions#fetcher)
- [layoutServiceConfig](/docs/nextjs/ref/interfaces/index/layoutservicerequestoptions#layoutserviceconfig)
- [querystringParams](/docs/nextjs/ref/interfaces/index/layoutservicerequestoptions#querystringparams)

## Properties

### fetcher

• **fetcher**: [`HttpDataFetcher`](/docs/nextjs/ref/modules/index#httpdatafetcher)<`T`\>

The fetcher that performs the HTTP request and returns a promise to JSON

___

### layoutServiceConfig

• `Optional` **layoutServiceConfig**: `LayoutServiceConfig`

Configuration options for Layout Service requests.

___

### querystringParams

• `Optional` **querystringParams**: `Object`

An object of key:value pairs to be stringified and used as querystring parameters.

#### Index signature

▪ [key: `string`]: `string` \| `number` \| `boolean`
