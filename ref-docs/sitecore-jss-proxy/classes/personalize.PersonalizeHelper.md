[@sitecore-jss/sitecore-jss-proxy](../README.md) / [personalize](../modules/personalize.md) / PersonalizeHelper

# Class: PersonalizeHelper

[personalize](../modules/personalize.md).PersonalizeHelper

## Table of contents

### Constructors

- [constructor](personalize.PersonalizeHelper.md#constructor)

### Properties

- [config](personalize.PersonalizeHelper.md#config)
- [defaultHostname](personalize.PersonalizeHelper.md#defaulthostname)
- [personalizeService](personalize.PersonalizeHelper.md#personalizeservice)

### Methods

- [excludeRoute](personalize.PersonalizeHelper.md#excluderoute)
- [extractDebugHeaders](personalize.PersonalizeHelper.md#extractdebugheaders)
- [getExperienceParams](personalize.PersonalizeHelper.md#getexperienceparams)
- [getHostHeader](personalize.PersonalizeHelper.md#gethostheader)
- [getLanguage](personalize.PersonalizeHelper.md#getlanguage)
- [getPersonalizeExecutions](personalize.PersonalizeHelper.md#getpersonalizeexecutions)
- [getVariantIds](personalize.PersonalizeHelper.md#getvariantids)
- [initPersonalizeServer](personalize.PersonalizeHelper.md#initpersonalizeserver)
- [personalize](personalize.PersonalizeHelper.md#personalize)
- [personalizeLayoutData](personalize.PersonalizeHelper.md#personalizelayoutdata)

## Constructors

### constructor

• **new PersonalizeHelper**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PersonalizeConfig`](../modules/personalize.md#personalizeconfig) |

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:21](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L21)

## Properties

### config

• `Protected` **config**: [`PersonalizeConfig`](../modules/personalize.md#personalizeconfig)

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:21](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L21)

___

### defaultHostname

• `Private` **defaultHostname**: `string`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:19](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L19)

___

### personalizeService

• `Private` **personalizeService**: `GraphQLPersonalizeService`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:18](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L18)

## Methods

### excludeRoute

▸ `Protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:187](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L187)

___

### extractDebugHeaders

▸ `Protected` **extractDebugHeaders**(`incomingHeaders`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `incomingHeaders` | `IncomingHttpHeaders` |

#### Returns

`Object`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:191](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L191)

___

### getExperienceParams

▸ `Protected` **getExperienceParams**(`req`): `ExperienceParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |

#### Returns

`ExperienceParams`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:233](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L233)

___

### getHostHeader

▸ `Protected` **getHostHeader**(`req`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |

#### Returns

`string`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:183](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L183)

___

### getLanguage

▸ `Protected` **getLanguage**(`layoutData`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutData` | `LayoutServiceData` |

#### Returns

`string`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:179](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L179)

___

### getPersonalizeExecutions

▸ `Protected` **getPersonalizeExecutions**(`personalizeInfo`, `language`): `PersonalizeExecution`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `personalizeInfo` | `PersonalizeInfo` |
| `language` | `string` |

#### Returns

`PersonalizeExecution`[]

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:254](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L254)

___

### getVariantIds

▸ `Protected` **getVariantIds**(`req`, `language`, `pathname`): `Promise`\<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |
| `language` | `string` |
| `pathname` | `string` |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:117](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L117)

___

### initPersonalizeServer

▸ `Protected` **initPersonalizeServer**(`request`, `response`, `hostname`): `Promise`\<`void`\>

Init CloudSDK personalization on server side

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `IncomingMessage` | incoming nodejs request object |
| `response` | `OutgoingMessage`\<`IncomingMessage`\> | outgoing nodejs response object |
| `hostname` | `string` | host for cookies. Usually a host header, or a fallback config |

#### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:101](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L101)

___

### personalize

▸ `Protected` **personalize**(`«destructured»`, `request`): `Promise`\<\{ `variantId`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `friendlyId` | `string` |
| › `language` | `string` |
| › `params` | `ExperienceParams` |
| › `timeout?` | `number` |
| › `variantIds?` | `string`[] |
| `request` | `IncomingMessage` |

#### Returns

`Promise`\<\{ `variantId`: `string`  }\>

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:199](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L199)

___

### personalizeLayoutData

▸ **personalizeLayoutData**(`req`, `res`, `layoutData`): `Promise`\<`LayoutServiceData`\>

Performs personalize on layout data before a page is rendered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `IncomingMessage` | Incoming request nodejs object |
| `res` | `OutgoingMessage`\<`IncomingMessage`\> | Outgoing response nodejs object |
| `layoutData` | `LayoutServiceData` | layoutData for the page |

#### Returns

`Promise`\<`LayoutServiceData`\>

layout data with personalization applied

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:35](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L35)
