[@sitecore-jss/sitecore-jss-nextjs](../README.md) / trackingApi

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

sitecore-jss/types/tracking/trackingApi.d.ts:9
