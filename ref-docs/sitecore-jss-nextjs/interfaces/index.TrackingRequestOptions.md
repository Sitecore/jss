[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / TrackingRequestOptions

# Interface: TrackingRequestOptions

[index](../modules/index.md).TrackingRequestOptions

## Table of contents

### Properties

- [action](index.TrackingRequestOptions.md#action)
- [fetcher](index.TrackingRequestOptions.md#fetcher)
- [host](index.TrackingRequestOptions.md#host)
- [querystringParams](index.TrackingRequestOptions.md#querystringparams)
- [serviceUrl](index.TrackingRequestOptions.md#serviceurl)
- [test](index.TrackingRequestOptions.md#test)

## Properties

### action

• `Optional` **action**: `string`

Type of tracking request action. Default: 'event'

#### Defined in

sitecore-jss/types/tracking/trackingRequestOptions.d.ts:16

___

### fetcher

• **fetcher**: [`HttpDataFetcher`](../modules/index.md#httpdatafetcher)<`void`\>

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
