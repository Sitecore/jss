[**@sitecore-jss/sitecore-jss-proxy**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [personalize](../README.md) / PersonalizeHelper

# Class: PersonalizeHelper

## Constructors

### new PersonalizeHelper()

> **new PersonalizeHelper**(`config`): [`PersonalizeHelper`](PersonalizeHelper.md)

#### Parameters

• **config**: [`PersonalizeConfig`](../type-aliases/PersonalizeConfig.md)

#### Returns

[`PersonalizeHelper`](PersonalizeHelper.md)

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:21](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L21)

## Properties

### config

> `protected` **config**: [`PersonalizeConfig`](../type-aliases/PersonalizeConfig.md)

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:21](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L21)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

• **pathname**: `string`

#### Returns

`undefined` \| `boolean`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:187](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L187)

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

#### Parameters

• **incomingHeaders**: `IncomingHttpHeaders`

#### Returns

`object`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:191](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L191)

***

### getExperienceParams()

> `protected` **getExperienceParams**(`req`): `ExperienceParams`

#### Parameters

• **req**: `IncomingMessage`

#### Returns

`ExperienceParams`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:233](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L233)

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `string`

#### Parameters

• **req**: `IncomingMessage`

#### Returns

`string`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:183](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L183)

***

### getLanguage()

> `protected` **getLanguage**(`layoutData`): `string`

#### Parameters

• **layoutData**: `LayoutServiceData`

#### Returns

`string`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:179](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L179)

***

### getPersonalizeExecutions()

> `protected` **getPersonalizeExecutions**(`personalizeInfo`, `language`): `PersonalizeExecution`[]

#### Parameters

• **personalizeInfo**: `PersonalizeInfo`

• **language**: `string`

#### Returns

`PersonalizeExecution`[]

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:254](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L254)

***

### getVariantIds()

> `protected` **getVariantIds**(`req`, `language`, `pathname`): `Promise`\<`string`[]\>

#### Parameters

• **req**: `IncomingMessage`

• **language**: `string`

• **pathname**: `string`

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:117](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L117)

***

### initPersonalizeServer()

> `protected` **initPersonalizeServer**(`request`, `response`, `hostname`): `Promise`\<`void`\>

Init CloudSDK personalization on server side

#### Parameters

• **request**: `IncomingMessage`

incoming nodejs request object

• **response**: `OutgoingMessage`\<`IncomingMessage`\>

outgoing nodejs response object

• **hostname**: `string`

host for cookies. Usually a host header, or a fallback config

#### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:101](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L101)

***

### personalize()

> `protected` **personalize**(`__namedParameters`, `request`): `Promise`\<`object`\>

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.friendlyId**: `string`

• **\_\_namedParameters.language**: `string`

• **\_\_namedParameters.params**: `ExperienceParams`

• **\_\_namedParameters.timeout?**: `number`

• **\_\_namedParameters.variantIds?**: `string`[]

• **request**: `IncomingMessage`

#### Returns

`Promise`\<`object`\>

##### variantId

> **variantId**: `string`

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:199](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L199)

***

### personalizeLayoutData()

> **personalizeLayoutData**(`req`, `res`, `layoutData`): `Promise`\<`LayoutServiceData`\>

Performs personalize on layout data before a page is rendered

#### Parameters

• **req**: `IncomingMessage`

Incoming request nodejs object

• **res**: `OutgoingMessage`\<`IncomingMessage`\>

Outgoing response nodejs object

• **layoutData**: `LayoutServiceData`

layoutData for the page

#### Returns

`Promise`\<`LayoutServiceData`\>

layout data with personalization applied

#### Defined in

[sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts:35](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-proxy/src/personalize/PersonalizeHelper.ts#L35)
