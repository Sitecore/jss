[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / TrackingRequestOptions

# Interface: TrackingRequestOptions

Defined in: packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:3

## Properties

### action?

> `optional` **action**: `string`

Defined in: packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:15

Type of tracking request action. Default: 'event'

***

### fetcher

> **fetcher**: [`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<`void`\>

Defined in: packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:9

The fetcher that performs the HTTP request and returns a promise to JSON

***

### host

> **host**: `string`

Defined in: packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:5

Hostname of tracking service; e.g. http://my.site.core

***

### querystringParams?

> `optional` **querystringParams**: `ParsedUrlQueryInput`

Defined in: packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:13

An object of key:value pairs to be stringified and used as querystring parameters.

***

### serviceUrl?

> `optional` **serviceUrl**: `string`

Defined in: packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:7

Relative path from host to tracking service. Default: /sitecore/api/jss/track

***

### test?

> `optional` **test**: `boolean`

Defined in: packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:17

Internal usage only. Ignores SSR check for unit tests.
