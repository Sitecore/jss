[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [layout/rest-layout-service](../modules/layout_rest_layout_service.md) / LayoutServiceRequestOptions

# Interface: LayoutServiceRequestOptions<T\>

[layout/rest-layout-service](../modules/layout_rest_layout_service.md).LayoutServiceRequestOptions

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [fetcher](layout_rest_layout_service.LayoutServiceRequestOptions.md#fetcher)
- [layoutServiceConfig](layout_rest_layout_service.LayoutServiceRequestOptions.md#layoutserviceconfig)
- [querystringParams](layout_rest_layout_service.LayoutServiceRequestOptions.md#querystringparams)

## Properties

### fetcher

• **fetcher**: [`HttpDataFetcher`](../modules/data_fetcher.md#httpdatafetcher)<`T`\>

The fetcher that performs the HTTP request and returns a promise to JSON

#### Defined in

[layout/rest-layout-service.ts:102](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/layout/rest-layout-service.ts#L102)

___

### layoutServiceConfig

• `Optional` **layoutServiceConfig**: [`LayoutServiceConfig`](layout_rest_layout_service.LayoutServiceConfig.md)

Configuration options for Layout Service requests.

#### Defined in

[layout/rest-layout-service.ts:95](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/layout/rest-layout-service.ts#L95)

___

### querystringParams

• `Optional` **querystringParams**: `Object`

An object of key:value pairs to be stringified and used as querystring parameters.

#### Index signature

▪ [key: `string`]: `string` \| `number` \| `boolean`

#### Defined in

[layout/rest-layout-service.ts:99](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/layout/rest-layout-service.ts#L99)
