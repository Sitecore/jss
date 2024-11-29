[**@sitecore-jss/sitecore-jss-vue**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-vue](../README.md) / TrackingRequestOptions

# Interface: TrackingRequestOptions

## Properties

### action?

> `optional` **action**: `string`

Type of tracking request action. Default: 'event'

#### Defined in

packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:15

***

### fetcher

> **fetcher**: `HttpDataFetcher`\<`void`\>

The fetcher that performs the HTTP request and returns a promise to JSON

#### Defined in

packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:9

***

### host

> **host**: `string`

Hostname of tracking service; e.g. http://my.site.core

#### Defined in

packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:5

***

### querystringParams?

> `optional` **querystringParams**: `ParsedUrlQueryInput`

An object of key:value pairs to be stringified and used as querystring parameters.

#### Defined in

packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:13

***

### serviceUrl?

> `optional` **serviceUrl**: `string`

Relative path from host to tracking service. Default: /sitecore/api/jss/track

#### Defined in

packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:7

***

### test?

> `optional` **test**: `boolean`

Internal usage only. Ignores SSR check for unit tests.

#### Defined in

packages/sitecore-jss/types/tracking/trackingRequestOptions.d.ts:17
