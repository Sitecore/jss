[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [tracking](../README.md) / TrackingRequestOptions

# Interface: TrackingRequestOptions

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:4](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L4)
=======
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:4](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L4)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### action?

> `optional` **action?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:20](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L20)
=======
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:20](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L20)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Type of tracking request action. Default: 'event'

***

### fetcher

> **fetcher**: [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<`void`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:12](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L12)
=======
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:12](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L12)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The fetcher that performs the HTTP request and returns a promise to JSON

***

### host

> **host**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:6](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L6)
=======
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:6](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L6)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Hostname of tracking service; e.g. http://my.site.core

***

### querystringParams?

> `optional` **querystringParams?**: `ParsedUrlQueryInput`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:17](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L17)
=======
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:17](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L17)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

An object of key:value pairs to be stringified and used as querystring parameters.

***

### serviceUrl?

> `optional` **serviceUrl?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:9](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L9)
=======
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:9](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L9)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Relative path from host to tracking service. Default: /sitecore/api/jss/track

***

### test?

> `optional` **test?**: `boolean`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:23](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L23)
=======
Defined in: [packages/sitecore-jss/src/tracking/trackingRequestOptions.ts:23](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/tracking/trackingRequestOptions.ts#L23)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Internal usage only. Ignores SSR check for unit tests.
