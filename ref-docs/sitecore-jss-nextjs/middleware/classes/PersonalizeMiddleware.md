[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / PersonalizeMiddleware

# Class: PersonalizeMiddleware

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:98](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L98)

Middleware / handler to support Sitecore Personalize

## Extends

- [`MiddlewareBase`](MiddlewareBase.md)

## Constructors

### Constructor

> **new PersonalizeMiddleware**(`config?`): `PersonalizeMiddleware`

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:104](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L104)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`PersonalizeMiddlewareConfig`](../type-aliases/PersonalizeMiddlewareConfig.md) | Personalize middleware config |

#### Returns

`PersonalizeMiddleware`

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`constructor`](MiddlewareBase.md#constructor)

## Properties

### config

> `protected` **config**: [`PersonalizeMiddlewareConfig`](../type-aliases/PersonalizeMiddlewareConfig.md)

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:104](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L104)

Personalize middleware config

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`config`](MiddlewareBase.md#config)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:34](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L34)

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`defaultHostname`](MiddlewareBase.md#defaulthostname)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`SITE_SYMBOL`](MiddlewareBase.md#site_symbol)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `boolean` \| `undefined`

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:211](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L211)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pathname` | `string` |

#### Returns

`boolean` \| `undefined`

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`excludeRoute`](MiddlewareBase.md#excluderoute)

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:91](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L91)

Safely extract all headers for debug logging
Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `incomingHeaders` | `Headers` | Incoming headers |

#### Returns

`object`

Object with headers as key/value pairs

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`extractDebugHeaders`](MiddlewareBase.md#extractdebugheaders)

***

### getExperienceParams()

> `protected` **getExperienceParams**(`req`): `ExperienceParams`

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:194](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L194)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextRequest` |

#### Returns

`ExperienceParams`

***

### getHandler()

> **getHandler**(): (`req`, `res?`, `options?`) => `Promise`\<`NextResponse`\<`unknown`\>\>

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:119](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L119)

Gets the Next.js middleware handler with error handling

#### Returns

middleware handler

> (`req`, `res?`, `options?`): `Promise`\<`NextResponse`\<`unknown`\>\>

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`\<`unknown`\> |
| `options?` | `PersonalizeOptions` |

##### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `string` \| `undefined`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:110](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L110)

Extract 'host' header

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`string` \| `undefined`

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`getHostHeader`](MiddlewareBase.md#gethostheader)

***

### getLanguage()

> `protected` **getLanguage**(`req`): `string`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:102](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L102)

Provides used language

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`string`

language

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`getLanguage`](MiddlewareBase.md#getlanguage)

***

### getPersonalizeExecutions()

> `protected` **getPersonalizeExecutions**(`personalizeInfo`, `language`): `PersonalizeExecution`[]

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:222](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L222)

Aggregates personalize executions based on the provided route personalize information and language

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `personalizeInfo` | `PersonalizeInfo` | the route personalize information |
| `language` | `string` | the language |

#### Returns

`PersonalizeExecution`[]

An array of personalize executions

***

### getPersonalizeInfo()

> `protected` **getPersonalizeInfo**(`pathname`, `language`, `siteName`): `Promise`\<`PersonalizeInfo` \| `undefined`\>

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:396](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L396)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pathname` | `string` |
| `language` | `string` |
| `siteName` | `string` |

#### Returns

`Promise`\<`PersonalizeInfo` \| `undefined`\>

***

### getSite()

> `protected` **getSite**(`req`, `res?`): [`SiteInfo`](../../index/type-aliases/SiteInfo.md)

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:121](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L121)

Get site information.
Can not be used in **Preview** mode, since site will not be resolved

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

[`SiteInfo`](../../index/type-aliases/SiteInfo.md)

site information

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`getSite`](MiddlewareBase.md#getsite)

***

### initPersonalizeServer()

> `protected` **initPersonalizeServer**(`__namedParameters`): `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:135](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L135)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | \{ `hostname`: `string`; `request`: `NextRequest`; `response`: `NextResponse`; `siteName`: `string`; \} |
| `__namedParameters.hostname` | `string` |
| `__namedParameters.request` | `NextRequest` |
| `__namedParameters.response` | `NextResponse` |
| `__namedParameters.siteName` | `string` |

#### Returns

`Promise`\<`void`\>

***

### isPrefetch()

> `protected` **isPrefetch**(`req`): `boolean`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:56](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L56)

Determines if the request is a Next.js (next/link) prefetch request

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is prefetch

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`isPrefetch`](MiddlewareBase.md#isprefetch)

***

### isPreview()

> `protected` **isPreview**(`req`): `boolean`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:45](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L45)

Determines if mode is preview

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is preview

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`isPreview`](MiddlewareBase.md#ispreview)

***

### personalize()

> `protected` **personalize**(`__namedParameters`, `request`): `Promise`\<\{ `variantId`: `string`; \}\>

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:157](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L157)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | \{ `friendlyId`: `string`; `language`: `string`; `options?`: `PersonalizeOptions`; `params`: `ExperienceParams`; `timeout?`: `number`; `variantIds?`: `string`[]; \} |
| `__namedParameters.friendlyId` | `string` |
| `__namedParameters.language` | `string` |
| `__namedParameters.options?` | `PersonalizeOptions` |
| `__namedParameters.params` | `ExperienceParams` |
| `__namedParameters.timeout?` | `number` |
| `__namedParameters.variantIds?` | `string`[] |
| `request` | `NextRequest` |

#### Returns

`Promise`\<\{ `variantId`: `string`; \}\>

***

### processPersonalizationRequest()

> `protected` **processPersonalizationRequest**(`req`, `res?`, `options?`): `Promise`\<`NextResponse`\<`unknown`\>\>

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:272](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L272)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`\<`unknown`\> |
| `options?` | `PersonalizeOptions` |

#### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

***

### rewrite()

> `protected` **rewrite**(`rewritePath`, `req`, `res`, `skipHeader?`): `NextResponse`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:138](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L138)

Create a rewrite response

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse` | the current response |
| `skipHeader?` | `boolean` | don't write 'x-sc-rewrite' header |

#### Returns

`NextResponse`

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`rewrite`](MiddlewareBase.md#rewrite)
