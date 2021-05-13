[@sitecore-jss/sitecore-jss](../README.md) / LayoutServiceRequestOptions

# Interface: LayoutServiceRequestOptions<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [fetcher](layoutservicerequestoptions.md#fetcher)
- [layoutServiceConfig](layoutservicerequestoptions.md#layoutserviceconfig)
- [querystringParams](layoutservicerequestoptions.md#querystringparams)

## Properties

### fetcher

• **fetcher**: [*HttpDataFetcher*](../README.md#httpdatafetcher)<T\>

The fetcher that performs the HTTP request and returns a promise to JSON

Defined in: [layout/rest-layout-service.ts:102](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L102)

___

### layoutServiceConfig

• `Optional` **layoutServiceConfig**: [*LayoutServiceConfig*](layoutserviceconfig.md)

Configuration options for Layout Service requests.

Defined in: [layout/rest-layout-service.ts:95](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L95)

___

### querystringParams

• `Optional` **querystringParams**: *object*

An object of key:value pairs to be stringified and used as querystring parameters.

#### Type declaration

Defined in: [layout/rest-layout-service.ts:99](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L99)
