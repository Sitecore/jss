[@sitecore-jss/sitecore-jss](../README.md) / personalize

# Module: personalize

## Table of contents

### Classes

- [CdpHelper](../classes/personalize.CdpHelper.md)
- [GraphQLPersonalizeService](../classes/personalize.GraphQLPersonalizeService.md)

### Type Aliases

- [GraphQLPersonalizeServiceConfig](personalize.md#graphqlpersonalizeserviceconfig)
- [PersonalizeInfo](personalize.md#personalizeinfo)
- [PersonalizedRewriteData](personalize.md#personalizedrewritedata)

### Functions

- [getPersonalizedRewrite](personalize.md#getpersonalizedrewrite)
- [getPersonalizedRewriteData](personalize.md#getpersonalizedrewritedata)
- [normalizePersonalizedRewrite](personalize.md#normalizepersonalizedrewrite)
- [personalizeLayout](personalize.md#personalizelayout)

## Type Aliases

### GraphQLPersonalizeServiceConfig

Ƭ **GraphQLPersonalizeServiceConfig**: `CacheOptions` & \{ `apiKey?`: `string` ; `clientFactory?`: [`GraphQLRequestClientFactory`](index.md#graphqlrequestclientfactory) ; `endpoint?`: `string` ; `fetch?`: typeof `fetch` ; `scope?`: `string` ; `timeout?`: `number`  }

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:11](https://github.com/Sitecore/jss/blob/aab003079/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L11)

___

### PersonalizeInfo

Ƭ **PersonalizeInfo**: `Object`

Object model of personlize info

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentId` | `string` | The (CDP-friendly) content id |
| `variantIds` | `string`[] | The configured variant ids |

#### Defined in

[packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:44](https://github.com/Sitecore/jss/blob/aab003079/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L44)

___

### PersonalizedRewriteData

Ƭ **PersonalizedRewriteData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `variantId` | `string` |

#### Defined in

[packages/sitecore-jss/src/personalize/utils.ts:4](https://github.com/Sitecore/jss/blob/aab003079/packages/sitecore-jss/src/personalize/utils.ts#L4)

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

[packages/sitecore-jss/src/personalize/utils.ts:14](https://github.com/Sitecore/jss/blob/aab003079/packages/sitecore-jss/src/personalize/utils.ts#L14)

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

[packages/sitecore-jss/src/personalize/utils.ts:24](https://github.com/Sitecore/jss/blob/aab003079/packages/sitecore-jss/src/personalize/utils.ts#L24)

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

[packages/sitecore-jss/src/personalize/utils.ts:41](https://github.com/Sitecore/jss/blob/aab003079/packages/sitecore-jss/src/personalize/utils.ts#L41)

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

[packages/sitecore-jss/src/personalize/layout-personalizer.ts:17](https://github.com/Sitecore/jss/blob/aab003079/packages/sitecore-jss/src/personalize/layout-personalizer.ts#L17)
