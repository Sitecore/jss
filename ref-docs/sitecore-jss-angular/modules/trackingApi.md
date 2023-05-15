[@sitecore-jss/sitecore-jss-angular](../README.md) / trackingApi

# Namespace: trackingApi

## Table of contents

### Functions

- [checkStatus](trackingApi.md#checkstatus)
- [trackEvent](trackingApi.md#trackevent)

## Functions

### checkStatus

▸ **checkStatus**<`T`\>(`response`): [`HttpResponse`](../interfaces/HttpResponse.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | [`HttpResponse`](../interfaces/HttpResponse.md)<`T`\> | response from fetch |

#### Returns

[`HttpResponse`](../interfaces/HttpResponse.md)<`T`\>

response

#### Defined in

sitecore-jss/types/tracking/trackingApi.d.ts:8

___

### trackEvent

▸ **trackEvent**(`events`, `options`): `Promise`<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | ([`EventInstance`](../interfaces/EventInstance.md) \| [`GoalInstance`](../interfaces/GoalInstance.md) \| [`OutcomeInstance`](../interfaces/OutcomeInstance.md) \| [`CampaignInstance`](../interfaces/CampaignInstance.md) \| [`PageViewInstance`](../interfaces/PageViewInstance.md))[] | events to send |
| `options` | [`TrackingRequestOptions`](../interfaces/TrackingRequestOptions.md) | options for the tracking service |

#### Returns

`Promise`<`void`\>

void

#### Defined in

sitecore-jss/types/tracking/trackingApi.d.ts:15
