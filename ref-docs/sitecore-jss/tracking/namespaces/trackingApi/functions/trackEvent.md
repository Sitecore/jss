[**@sitecore-jss/sitecore-jss**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [tracking](../../../README.md) / [trackingApi](../README.md) / trackEvent

# Function: trackEvent()

> **trackEvent**(`events`, `options`): `Promise`\<`void`\>

Defined in: [packages/sitecore-jss/src/tracking/trackingApi.ts:62](https://github.com/Sitecore/jss/blob/fbe00e6660e3a6cec4ac12dfb40734cd8a9a9d7e/packages/sitecore-jss/src/tracking/trackingApi.ts#L62)

Makes a request to Sitecore Layout Service for the specified route item path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | ([`CampaignInstance`](../../../interfaces/CampaignInstance.md) \| [`GoalInstance`](../../../interfaces/GoalInstance.md) \| [`EventInstance`](../../../interfaces/EventInstance.md) \| [`OutcomeInstance`](../../../interfaces/OutcomeInstance.md) \| [`PageViewInstance`](../../../interfaces/PageViewInstance.md))[] | events to send |
| `options` | [`TrackingRequestOptions`](../../../interfaces/TrackingRequestOptions.md) | options for the tracking service |

## Returns

`Promise`\<`void`\>

void
