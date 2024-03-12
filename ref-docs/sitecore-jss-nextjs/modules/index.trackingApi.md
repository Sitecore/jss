[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](index.md) / trackingApi

# Namespace: trackingApi

[index](index.md).trackingApi

## Table of contents

### Functions

- [checkStatus](index.trackingApi.md#checkstatus)
- [trackEvent](index.trackingApi.md#trackevent)

## Functions

### checkStatus

▸ **checkStatus**\<`T`\>(`response`): [`HttpResponse`](../interfaces/index.HttpResponse.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | [`HttpResponse`](../interfaces/index.HttpResponse.md)\<`T`\> | response from fetch |

#### Returns

[`HttpResponse`](../interfaces/index.HttpResponse.md)\<`T`\>

response

#### Defined in

packages/sitecore-jss/types/tracking/trackingApi.d.ts:8

___

### trackEvent

▸ **trackEvent**(`events`, `options`): `Promise`\<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | ([`EventInstance`](../interfaces/index.EventInstance.md) \| [`GoalInstance`](../interfaces/index.GoalInstance.md) \| [`OutcomeInstance`](../interfaces/index.OutcomeInstance.md) \| [`CampaignInstance`](../interfaces/index.CampaignInstance.md) \| [`PageViewInstance`](../interfaces/index.PageViewInstance.md))[] | events to send |
| `options` | [`TrackingRequestOptions`](../interfaces/index.TrackingRequestOptions.md) | options for the tracking service |

#### Returns

`Promise`\<`void`\>

void

#### Defined in

packages/sitecore-jss/types/tracking/trackingApi.d.ts:15
