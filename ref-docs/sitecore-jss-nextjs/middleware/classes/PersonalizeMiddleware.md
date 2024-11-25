[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / PersonalizeMiddleware

# Class: PersonalizeMiddleware

Middleware / handler to support Sitecore Personalize

## Extends

- [`MiddlewareBase`](MiddlewareBase.md)

## Constructors

### new PersonalizeMiddleware()

> **new PersonalizeMiddleware**(`config`?): [`PersonalizeMiddleware`](PersonalizeMiddleware.md)

#### Parameters

• **config?**: [`PersonalizeMiddlewareConfig`](../type-aliases/PersonalizeMiddlewareConfig.md)

Personalize middleware config

#### Returns

[`PersonalizeMiddleware`](PersonalizeMiddleware.md)

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`constructor`](MiddlewareBase.md#constructors)

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:85](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L85)

## Properties

### config

> `protected` **config**: [`PersonalizeMiddlewareConfig`](../type-aliases/PersonalizeMiddlewareConfig.md)

Personalize middleware config

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`config`](MiddlewareBase.md#config)

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:85](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L85)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`defaultHostname`](MiddlewareBase.md#defaulthostname)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

***

### REWRITE\_HEADER\_NAME

> `protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`REWRITE_HEADER_NAME`](MiddlewareBase.md#rewrite_header_name)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`SITE_SYMBOL`](MiddlewareBase.md#site_symbol)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

• **pathname**: `string`

#### Returns

`undefined` \| `boolean`

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`excludeRoute`](MiddlewareBase.md#excluderoute)

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:185](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L185)

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Safely extract all headers for debug logging
Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765

#### Parameters

• **incomingHeaders**: `Headers`

Incoming headers

#### Returns

`object`

Object with headers as key/value pairs

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`extractDebugHeaders`](MiddlewareBase.md#extractdebugheaders)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:78](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L78)

***

### getExperienceParams()

> `protected` **getExperienceParams**(`req`): `ExperienceParams`

#### Parameters

• **req**: `NextRequest`

#### Returns

`ExperienceParams`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:168](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L168)

***

### getHandler()

> **getHandler**(): (`req`, `res`?) => `Promise`\<`NextResponse`\<`unknown`\>\>

Gets the Next.js middleware handler with error handling

#### Returns

`Function`

middleware handler

##### Parameters

• **req**: `NextRequest`

• **res?**: `NextResponse`\<`unknown`\>

##### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:100](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L100)

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `undefined` \| `string`

Extract 'host' header

#### Parameters

• **req**: `NextRequest`

request

#### Returns

`undefined` \| `string`

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`getHostHeader`](MiddlewareBase.md#gethostheader)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:97](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L97)

***

### getLanguage()

> `protected` **getLanguage**(`req`): `string`

Provides used language

#### Parameters

• **req**: `NextRequest`

request

#### Returns

`string`

language

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`getLanguage`](MiddlewareBase.md#getlanguage)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:89](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L89)

***

### getPersonalizeExecutions()

> `protected` **getPersonalizeExecutions**(`personalizeInfo`, `language`): `PersonalizeExecution`[]

Aggregates personalize executions based on the provided route personalize information and language

#### Parameters

• **personalizeInfo**: `PersonalizeInfo`

the route personalize information

• **language**: `string`

the language

#### Returns

`PersonalizeExecution`[]

An array of personalize executions

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:196](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L196)

***

### getSite()

> `protected` **getSite**(`req`, `res`?): [`SiteInfo`](../../index/type-aliases/SiteInfo.md)

Get site information.
Can not be used in **Preview** mode, since site will not be resolved

#### Parameters

• **req**: `NextRequest`

request

• **res?**: `NextResponse`\<`unknown`\>

response

#### Returns

[`SiteInfo`](../../index/type-aliases/SiteInfo.md)

site information

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`getSite`](MiddlewareBase.md#getsite)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:108](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L108)

***

### initPersonalizeServer()

> `protected` **initPersonalizeServer**(`__namedParameters`): `Promise`\<`void`\>

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.hostname**: `string`

• **\_\_namedParameters.request**: `NextRequest`

• **\_\_namedParameters.response**: `NextResponse`\<`unknown`\>

• **\_\_namedParameters.siteName**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:112](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L112)

***

### isPrefetch()

> `protected` **isPrefetch**(`req`): `boolean`

Determines if the request is a Next.js (next/link) prefetch request

#### Parameters

• **req**: `NextRequest`

request

#### Returns

`boolean`

is prefetch

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`isPrefetch`](MiddlewareBase.md#isprefetch)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:55](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L55)

***

### isPreview()

> `protected` **isPreview**(`req`): `boolean`

Determines if mode is preview

#### Parameters

• **req**: `NextRequest`

request

#### Returns

`boolean`

is preview

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`isPreview`](MiddlewareBase.md#ispreview)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

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

• **request**: `NextRequest`

#### Returns

`Promise`\<`object`\>

##### variantId

> **variantId**: `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:134](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L134)

***

### rewrite()

> `protected` **rewrite**(`rewritePath`, `req`, `res`): `NextResponse`\<`unknown`\>

Create a rewrite response

#### Parameters

• **rewritePath**: `string`

the destionation path

• **req**: `NextRequest`

the current request

• **res**: `NextResponse`\<`unknown`\>

the current response

#### Returns

`NextResponse`\<`unknown`\>

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`rewrite`](MiddlewareBase.md#rewrite)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:124](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L124)
