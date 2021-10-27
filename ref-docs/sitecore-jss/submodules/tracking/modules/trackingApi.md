[@sitecore-jss/sitecore-jss](../README.md) / trackingApi

# Namespace: trackingApi

## Table of contents

### Functions

- [trackEvent](trackingApi.md#trackevent)

## Functions

### trackEvent

▸ **trackEvent**(`events`, `options`): `Promise`<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | ([`EventInstance`](../interfaces/EventInstance.md) \| [`GoalInstance`](../interfaces/GoalInstance.md) \| [`OutcomeInstance`](../interfaces/OutcomeInstance.md) \| [`CampaignInstance`](../interfaces/CampaignInstance.md) \| [`PageViewInstance`](../interfaces/PageViewInstance.md))[] |
| `options` | [`TrackingRequestOptions`](../interfaces/TrackingRequestOptions.md) |

#### Returns

`Promise`<`void`\>

void

#### Defined in

[trackingApi.ts:73](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/tracking/trackingApi.ts#L73)
