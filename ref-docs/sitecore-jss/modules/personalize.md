[@sitecore-jss/sitecore-jss](../README.md) / personalize

# Module: personalize

## Table of contents

### Classes

- [CdpHelper](../classes/personalize.CdpHelper.md)
- [CdpService](../classes/personalize.CdpService.md)
- [GraphQLPersonalizeService](../classes/personalize.GraphQLPersonalizeService.md)
- [PosResolver](../classes/personalize.PosResolver.md)

### Type Aliases

- [CdpServiceConfig](personalize.md#cdpserviceconfig)
- [ExecuteExperienceResult](personalize.md#executeexperienceresult)
- [ExperienceParams](personalize.md#experienceparams)
- [GenerateBrowserIdResult](personalize.md#generatebrowseridresult)
- [GraphQLPersonalizeServiceConfig](personalize.md#graphqlpersonalizeserviceconfig)
- [PersonalizedRewriteData](personalize.md#personalizedrewritedata)

### Functions

- [getPersonalizedRewrite](personalize.md#getpersonalizedrewrite)
- [getPersonalizedRewriteData](personalize.md#getpersonalizedrewritedata)
- [normalizePersonalizedRewrite](personalize.md#normalizepersonalizedrewrite)
- [personalizeLayout](personalize.md#personalizelayout)

## Type Aliases

### CdpServiceConfig

Ƭ **CdpServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `channel?` | `string` | The Sitecore CDP channel to use for events. Uses 'WEB' by default. |
| `clientKey` | `string` | The client key to use for authentication |
| `dataFetcherResolver?` | `DataFetcherResolver` | Custom data fetcher resolver. Uses **`See`** AxiosDataFetcher by default. |
| `endpoint` | `string` | Your Sitecore CDP API endpoint |
| `timeout?` | `number` | Timeout (ms) for CDP request. Default is 250. |

#### Defined in

[src/personalize/cdp-service.ts:25](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/cdp-service.ts#L25)

___

### ExecuteExperienceResult

Ƭ **ExecuteExperienceResult**: `Object`

Object model of CDP execute experience result

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `variantId?` | `string` | The identified variant |

#### Defined in

[src/personalize/cdp-service.ts:11](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/cdp-service.ts#L11)

___

### ExperienceParams

Ƭ **ExperienceParams**: `Object`

Object model of Experience Context data

#### Type declaration

| Name | Type |
| :------ | :------ |
| `referrer` | `string` |
| `utm` | { `[key: string]`: `string` \| ``null``; `campaign`: `string` \| ``null`` ; `content`: `string` \| ``null`` ; `medium`: `string` \| ``null`` ; `source`: `string` \| ``null``  } |
| `utm.campaign` | `string` \| ``null`` |
| `utm.content` | `string` \| ``null`` |
| `utm.medium` | `string` \| ``null`` |
| `utm.source` | `string` \| ``null`` |

#### Defined in

[src/personalize/cdp-service.ts:61](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/cdp-service.ts#L61)

___

### GenerateBrowserIdResult

Ƭ **GenerateBrowserIdResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `string` | The browser id |

#### Defined in

[src/personalize/cdp-service.ts:18](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/cdp-service.ts#L18)

___

### GraphQLPersonalizeServiceConfig

Ƭ **GraphQLPersonalizeServiceConfig**: `CacheOptions` & { `apiKey`: `string` ; `endpoint`: `string` ; `fetch?`: typeof `fetch` ; `timeout?`: `number`  }

#### Defined in

[src/personalize/graphql-personalize-service.ts:7](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L7)

___

### PersonalizedRewriteData

Ƭ **PersonalizedRewriteData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `variantId` | `string` |

#### Defined in

[src/personalize/utils.ts:4](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/utils.ts#L4)

## Functions

### getPersonalizedRewrite

▸ **getPersonalizedRewrite**(`pathname`, `data`): `string`

Get a personalized rewrite path for given pathname

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | the pathname |
| `data` | [`PersonalizedRewriteData`](personalize.md#personalizedrewritedata) | the personalize data to include in the rewrite |

#### Returns

`string`

the rewrite path

#### Defined in

[src/personalize/utils.ts:14](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/utils.ts#L14)

___

### getPersonalizedRewriteData

▸ **getPersonalizedRewriteData**(`pathname`): [`PersonalizedRewriteData`](personalize.md#personalizedrewritedata)

Get personalize data from the rewrite path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | the pathname |

#### Returns

[`PersonalizedRewriteData`](personalize.md#personalizedrewritedata)

the personalize data from the rewrite

#### Defined in

[src/personalize/utils.ts:24](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/utils.ts#L24)

___

### normalizePersonalizedRewrite

▸ **normalizePersonalizedRewrite**(`pathname`): `string`

Normalize a personalized rewrite path (remove personalize data)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | the pathname |

#### Returns

`string`

the pathname with personalize data removed

#### Defined in

[src/personalize/utils.ts:41](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/utils.ts#L41)

___

### personalizeLayout

▸ **personalizeLayout**(`layout`, `variantId`): `void`

Apply personalization to layout data. This will recursively go through all placeholders/components, check experiences nodes and replace default with object from specific experience.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layout` | [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md) | Layout data |
| `variantId` | `string` | variant id |

#### Returns

`void`

#### Defined in

[src/personalize/layout-personalizer.ts:17](https://github.com/Sitecore/jss/blob/c10ba6925/packages/sitecore-jss/src/personalize/layout-personalizer.ts#L17)
