[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](index.md) / trackingApi

# Namespace: trackingApi

[index](index.md).trackingApi

## Table of contents

### Functions

- [trackEvent](index.trackingApi.md#trackevent)

## Functions

### trackEvent

▸ **trackEvent**(`events`, `options`): `Promise`<`void`\>

Makes a request to Sitecore Layout Service for the specified route item path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | ([`EventInstance`](../interfaces/index.EventInstance.md) \| [`GoalInstance`](../interfaces/index.GoalInstance.md) \| [`OutcomeInstance`](../interfaces/index.OutcomeInstance.md) \| [`CampaignInstance`](../interfaces/index.CampaignInstance.md) \| [`PageViewInstance`](../interfaces/index.PageViewInstance.md))[] |
| `options` | [`TrackingRequestOptions`](../interfaces/index.TrackingRequestOptions.md) |

#### Returns

`Promise`<`void`\>

void

#### Defined in

sitecore-jss/types/tracking/trackingApi.d.ts:9
