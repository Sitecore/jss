[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [tracking](../README.md) / TrackingRequestOptions

# Interface: TrackingRequestOptions

Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:4](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L4)

## Properties

### action?

> `optional` **action**: `string`

Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:20](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L20)

Type of tracking request action. Default: 'event'

***

### fetcher

> **fetcher**: [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<`void`\>

Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:12](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L12)

The fetcher that performs the HTTP request and returns a promise to JSON

***

### host

> **host**: `string`

Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:6](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L6)

Hostname of tracking service; e.g. http://my.site.core

***

### querystringParams?

> `optional` **querystringParams**: `ParsedUrlQueryInput`

Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:17](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L17)

An object of key:value pairs to be stringified and used as querystring parameters.

***

### serviceUrl?

> `optional` **serviceUrl**: `string`

Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:9](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L9)

Relative path from host to tracking service. Default: /sitecore/api/jss/track

***

### test?

> `optional` **test**: `boolean`

Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:23](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L23)

Internal usage only. Ignores SSR check for unit tests.
