[**@sitecore-jss/sitecore-jss**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [tracking](../../../README.md) / [trackingApi](../README.md) / trackEvent

# Function: trackEvent()

> **trackEvent**(`events`, `options`): `Promise`\<`void`\>

Defined in: [packages/sitecore-jss/src/tracking/trackingApi.ts:62](https://github.com/Sitecore/jss/blob/160c9db33d573313249f7ebd0d506c84e50e0731/packages/sitecore-jss/src/tracking/trackingApi.ts#L62)

Makes a request to Sitecore Layout Service for the specified route item path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | ([`CampaignInstance`](../../../interfaces/CampaignInstance.md) \| [`GoalInstance`](../../../interfaces/GoalInstance.md) \| [`EventInstance`](../../../interfaces/EventInstance.md) \| [`OutcomeInstance`](../../../interfaces/OutcomeInstance.md) \| [`PageViewInstance`](../../../interfaces/PageViewInstance.md))[] | events to send |
| `options` | [`TrackingRequestOptions`](../../../interfaces/TrackingRequestOptions.md) | options for the tracking service |

## Returns

`Promise`\<`void`\>

void
