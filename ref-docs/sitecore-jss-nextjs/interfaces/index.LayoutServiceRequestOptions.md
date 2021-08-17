[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [index](../modules/index.md) / LayoutServiceRequestOptions

# Interface: LayoutServiceRequestOptions<T\>

[index](../modules/index.md).LayoutServiceRequestOptions

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [fetcher](index.LayoutServiceRequestOptions.md#fetcher)
- [layoutServiceConfig](index.LayoutServiceRequestOptions.md#layoutserviceconfig)
- [querystringParams](index.LayoutServiceRequestOptions.md#querystringparams)

## Properties

### fetcher

• **fetcher**: [`HttpDataFetcher`](../modules/index.md#httpdatafetcher)<`T`\>

The fetcher that performs the HTTP request and returns a promise to JSON

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:60

___

### layoutServiceConfig

• `Optional` **layoutServiceConfig**: `LayoutServiceConfig`

Configuration options for Layout Service requests.

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:52

___

### querystringParams

• `Optional` **querystringParams**: `Object`

An object of key:value pairs to be stringified and used as querystring parameters.

#### Index signature

▪ [key: `string`]: `string` \| `number` \| `boolean`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:56
