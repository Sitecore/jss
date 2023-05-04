[@sitecore-jss/sitecore-jss-vue](../README.md) / trackingApi

# Namespace: trackingApi

## Table of contents

### Functions

- [checkStatus](trackingApi.md#checkstatus)
- [trackEvent](trackingApi.md#trackevent)

## Functions

### checkStatus

▸ **checkStatus**<`T`\>(`response`): `HttpResponse`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | `HttpResponse`<`T`\> | response from fetch |

#### Returns

`HttpResponse`<`T`\>

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
| `events` | ([`CampaignInstance`](../interfaces/CampaignInstance.md) \| [`GoalInstance`](../interfaces/GoalInstance.md) \| [`EventInstance`](../interfaces/EventInstance.md) \| [`OutcomeInstance`](../interfaces/OutcomeInstance.md) \| [`PageViewInstance`](../interfaces/PageViewInstance.md))[] | events to send |
| `options` | [`TrackingRequestOptions`](../interfaces/TrackingRequestOptions.md) | options for the tracking service |

#### Returns

`Promise`<`void`\>

void

#### Defined in

sitecore-jss/types/tracking/trackingApi.d.ts:15
