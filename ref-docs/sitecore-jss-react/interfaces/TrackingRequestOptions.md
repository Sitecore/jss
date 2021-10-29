[@sitecore-jss/sitecore-jss-react](../README.md) / TrackingRequestOptions

# Interface: TrackingRequestOptions

## Table of contents

### Properties

- [action](TrackingRequestOptions.md#action)
- [fetcher](TrackingRequestOptions.md#fetcher)
- [host](TrackingRequestOptions.md#host)
- [querystringParams](TrackingRequestOptions.md#querystringparams)
- [serviceUrl](TrackingRequestOptions.md#serviceurl)
- [test](TrackingRequestOptions.md#test)

## Properties

### action

• `Optional` **action**: `string`

Type of tracking request action. Default: 'event'

#### Defined in

sitecore-jss/types/tracking/trackingRequestOptions.d.ts:16

___

### fetcher

• **fetcher**: `HttpDataFetcher`<`void`\>

The fetcher that performs the HTTP request and returns a promise to JSON

#### Defined in

sitecore-jss/types/tracking/trackingRequestOptions.d.ts:10

___

### host

• **host**: `string`

Hostname of tracking service; e.g. http://my.site.core

#### Defined in

sitecore-jss/types/tracking/trackingRequestOptions.d.ts:6

___

### querystringParams

• `Optional` **querystringParams**: `ParsedUrlQueryInput`

An object of key:value pairs to be stringified and used as querystring parameters.

#### Defined in

sitecore-jss/types/tracking/trackingRequestOptions.d.ts:14

___

### serviceUrl

• `Optional` **serviceUrl**: `string`

Relative path from host to tracking service. Default: /sitecore/api/jss/track

#### Defined in

sitecore-jss/types/tracking/trackingRequestOptions.d.ts:8

___

### test

• `Optional` **test**: `boolean`

Internal usage only. Ignores SSR check for unit tests.

#### Defined in

sitecore-jss/types/tracking/trackingRequestOptions.d.ts:18
