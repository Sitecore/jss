[@sitecore-jss/sitecore-jss](../README.md) / [tracking](tracking.md) / trackingApi

# Namespace: trackingApi

[tracking](tracking.md).trackingApi

## Table of contents

### Functions

- [checkStatus](tracking.trackingApi.md#checkstatus)
- [trackEvent](tracking.trackingApi.md#trackevent)

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

[packages/sitecore-jss/src/tracking/trackingApi.ts:28](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss/src/tracking/trackingApi.ts#L28)

___

### trackEvent

▸ **trackEvent**(`events`, `options`): `Promise`\<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | ([`CampaignInstance`](../interfaces/tracking.CampaignInstance.md) \| [`GoalInstance`](../interfaces/tracking.GoalInstance.md) \| [`EventInstance`](../interfaces/tracking.EventInstance.md) \| [`OutcomeInstance`](../interfaces/tracking.OutcomeInstance.md) \| [`PageViewInstance`](../interfaces/tracking.PageViewInstance.md))[] | events to send |
| `options` | [`TrackingRequestOptions`](../interfaces/tracking.TrackingRequestOptions.md) | options for the tracking service |

#### Returns

`Promise`\<`void`\>

void

#### Defined in

[packages/sitecore-jss/src/tracking/trackingApi.ts:76](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss/src/tracking/trackingApi.ts#L76)
