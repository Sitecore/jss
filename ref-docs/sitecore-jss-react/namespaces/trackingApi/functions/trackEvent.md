[**@sitecore-jss/sitecore-jss-react**](../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../../../README.md) / [trackingApi](../README.md) / trackEvent

# Function: trackEvent()

> **trackEvent**(`events`, `options`): `Promise`\<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | ([`EventInstance`](../../../interfaces/EventInstance.md) \| [`GoalInstance`](../../../interfaces/GoalInstance.md) \| [`OutcomeInstance`](../../../interfaces/OutcomeInstance.md) \| [`CampaignInstance`](../../../interfaces/CampaignInstance.md) \| [`PageViewInstance`](../../../interfaces/PageViewInstance.md))[] | events to send |
| `options` | [`TrackingRequestOptions`](../../../interfaces/TrackingRequestOptions.md) | options for the tracking service |

## Returns

`Promise`\<`void`\>

void

## Defined in

packages/sitecore-jss/types/tracking/trackingApi.d.ts:15
