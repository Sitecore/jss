[@sitecore-jss/sitecore-jss](../README.md) / [tracking](tracking.md) / trackingApi

# Namespace: trackingApi

[tracking](tracking.md).trackingApi

## Table of contents

### Functions

- [trackEvent](tracking.trackingApi.md#trackevent)

## Functions

### trackEvent

▸ **trackEvent**(`events`, `options`): `Promise`<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | ([`EventInstance`](../interfaces/tracking.EventInstance.md) \| [`GoalInstance`](../interfaces/tracking.GoalInstance.md) \| [`OutcomeInstance`](../interfaces/tracking.OutcomeInstance.md) \| [`CampaignInstance`](../interfaces/tracking.CampaignInstance.md) \| [`PageViewInstance`](../interfaces/tracking.PageViewInstance.md))[] |
| `options` | [`TrackingRequestOptions`](../interfaces/tracking.TrackingRequestOptions.md) |

#### Returns

`Promise`<`void`\>

void

#### Defined in

[tracking/trackingApi.ts:73](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss/src/tracking/trackingApi.ts#L73)
