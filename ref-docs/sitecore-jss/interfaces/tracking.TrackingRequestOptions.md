[@sitecore-jss/sitecore-jss](../README.md) / [tracking](../modules/tracking.md) / TrackingRequestOptions

# Interface: TrackingRequestOptions

[tracking](../modules/tracking.md).TrackingRequestOptions

## Table of contents

### Properties

- [action](tracking.TrackingRequestOptions.md#action)
- [fetcher](tracking.TrackingRequestOptions.md#fetcher)
- [host](tracking.TrackingRequestOptions.md#host)
- [querystringParams](tracking.TrackingRequestOptions.md#querystringparams)
- [serviceUrl](tracking.TrackingRequestOptions.md#serviceurl)
- [test](tracking.TrackingRequestOptions.md#test)

## Properties

### action

• `Optional` **action**: `string`

Type of tracking request action. Default: 'event'

#### Defined in

[tracking/trackingRequestOptions.ts:20](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L20)

___

### fetcher

• **fetcher**: [`HttpDataFetcher`](../modules/index.md#httpdatafetcher)<`void`\>

The fetcher that performs the HTTP request and returns a promise to JSON

#### Defined in

[tracking/trackingRequestOptions.ts:12](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L12)

___

### host

• **host**: `string`

Hostname of tracking service; e.g. http://my.site.core

#### Defined in

[tracking/trackingRequestOptions.ts:6](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L6)

___

### querystringParams

• `Optional` **querystringParams**: `ParsedUrlQueryInput`

An object of key:value pairs to be stringified and used as querystring parameters.

#### Defined in

[tracking/trackingRequestOptions.ts:17](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L17)

___

### serviceUrl

• `Optional` **serviceUrl**: `string`

Relative path from host to tracking service. Default: /sitecore/api/jss/track

#### Defined in

[tracking/trackingRequestOptions.ts:9](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L9)

___

### test

• `Optional` **test**: `boolean`

Internal usage only. Ignores SSR check for unit tests.

#### Defined in

[tracking/trackingRequestOptions.ts:23](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L23)
