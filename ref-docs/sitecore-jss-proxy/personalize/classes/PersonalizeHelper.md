[**@sitecore-jss/sitecore-jss-proxy**](../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [personalize](../README.md) / PersonalizeHelper

# Class: PersonalizeHelper

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:17](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L17)

## Constructors

### Constructor

> **new PersonalizeHelper**(`config`): `PersonalizeHelper`

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:21](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`PersonalizeConfig`](../type-aliases/PersonalizeConfig.md) |

#### Returns

`PersonalizeHelper`

## Properties

### config

> `protected` **config**: [`PersonalizeConfig`](../type-aliases/PersonalizeConfig.md)

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:21](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L21)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:187](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L187)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:191](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L191)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `incomingHeaders` | `IncomingHttpHeaders` |

#### Returns

`object`

***

### getExperienceParams()

> `protected` **getExperienceParams**(`req`): `ExperienceParams`

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:233](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L233)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `IncomingMessage` |

#### Returns

`ExperienceParams`

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `string`

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:183](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L183)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `IncomingMessage` |

#### Returns

`string`

***

### getLanguage()

> `protected` **getLanguage**(`layoutData`): `string`

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:179](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L179)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `layoutData` | `LayoutServiceData` |

#### Returns

`string`

***

### getPersonalizeExecutions()

> `protected` **getPersonalizeExecutions**(`personalizeInfo`, `language`): `PersonalizeExecution`[]

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:254](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L254)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `personalizeInfo` | `PersonalizeInfo` |
| `language` | `string` |

#### Returns

`PersonalizeExecution`[]

***

### getVariantIds()

> `protected` **getVariantIds**(`req`, `language`, `pathname`): `Promise`\<`string`[]\>

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:117](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L117)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `IncomingMessage` |
| `language` | `string` |
| `pathname` | `string` |

#### Returns

`Promise`\<`string`[]\>

***

### initPersonalizeServer()

> `protected` **initPersonalizeServer**(`request`, `response`, `hostname`): `Promise`\<`void`\>

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:101](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L101)

Init CloudSDK personalization on server side

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | `IncomingMessage` | incoming nodejs request object |
| `response` | `OutgoingMessage` | outgoing nodejs response object |
| `hostname` | `string` | host for cookies. Usually a host header, or a fallback config |

#### Returns

`Promise`\<`void`\>

***

### personalize()

> `protected` **personalize**(`__namedParameters`, `request`): `Promise`\<\{ `variantId`: `string`; \}\>

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:199](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L199)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | \{ `friendlyId`: `string`; `language`: `string`; `params`: `ExperienceParams`; `timeout?`: `number`; `variantIds?`: `string`[]; \} |
| `__namedParameters.friendlyId` | `string` |
| `__namedParameters.language` | `string` |
| `__namedParameters.params` | `ExperienceParams` |
| `__namedParameters.timeout?` | `number` |
| `__namedParameters.variantIds?` | `string`[] |
| `request` | `IncomingMessage` |

#### Returns

`Promise`\<\{ `variantId`: `string`; \}\>

***

### personalizeLayoutData()

> **personalizeLayoutData**(`req`, `res`, `layoutData`): `Promise`\<`LayoutServiceData`\>

Defined in: [sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:35](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L35)

Performs personalize on layout data before a page is rendered

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `IncomingMessage` | Incoming request nodejs object |
| `res` | `OutgoingMessage` | Outgoing response nodejs object |
| `layoutData` | `LayoutServiceData` | layoutData for the page |

#### Returns

`Promise`\<`LayoutServiceData`\>

layout data with personalization applied
