[**@sitecore-jss/sitecore-jss**](../../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [tracking](../../../README.md) / [trackingApi](../README.md) / trackEvent

# Function: trackEvent()

> **trackEvent**(`events`, `options`): `Promise`\<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

## Parameters

• **events**: ([`CampaignInstance`](../../../interfaces/CampaignInstance.md) \| [`GoalInstance`](../../../interfaces/GoalInstance.md) \| [`EventInstance`](../../../interfaces/EventInstance.md) \| [`OutcomeInstance`](../../../interfaces/OutcomeInstance.md) \| [`PageViewInstance`](../../../interfaces/PageViewInstance.md))[]

events to send

• **options**: [`TrackingRequestOptions`](../../../interfaces/TrackingRequestOptions.md)

options for the tracking service

## Returns

`Promise`\<`void`\>

void

## Defined in

[packages/sitecore-jss/src/tracking/trackingApi.ts:76](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/tracking/trackingApi.ts#L76)
