---
name: layoutservicerequestoptions
routeTemplate: ./data/component-templates/article.yml
title: layoutservicerequestoptions
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [layout/rest-layout-service](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service) / LayoutServiceRequestOptions

# Interface: LayoutServiceRequestOptions<T\>

[layout/rest-layout-service](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service).LayoutServiceRequestOptions

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [fetcher](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutservicerequestoptions#fetcher)
- [layoutServiceConfig](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutservicerequestoptions#layoutserviceconfig)
- [querystringParams](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutservicerequestoptions#querystringparams)

## Properties

### fetcher

• **fetcher**: [`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<`T`\>

The fetcher that performs the HTTP request and returns a promise to JSON

___

### layoutServiceConfig

• `Optional` **layoutServiceConfig**: [`LayoutServiceConfig`](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutserviceconfig)

Configuration options for Layout Service requests.

___

### querystringParams

• `Optional` **querystringParams**: `Object`

An object of key:value pairs to be stringified and used as querystring parameters.

#### Index signature

▪ [key: `string`]: `string` \| `number` \| `boolean`
