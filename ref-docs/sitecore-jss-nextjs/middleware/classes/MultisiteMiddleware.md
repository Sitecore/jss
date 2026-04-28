[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / MultisiteMiddleware

# Class: MultisiteMiddleware

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:31](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L31)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:31](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L31)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Middleware / handler for multisite support

## Extends

- [`MiddlewareBase`](MiddlewareBase.md)

## Constructors

### Constructor

> **new MultisiteMiddleware**(`config?`): `MultisiteMiddleware`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:35](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L35)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:35](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L35)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`MultisiteMiddlewareConfig`](../type-aliases/MultisiteMiddlewareConfig.md) | Multisite middleware config |

#### Returns

`MultisiteMiddleware`

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`constructor`](MiddlewareBase.md#constructor)

## Properties

### config

> `protected` **config**: [`MultisiteMiddlewareConfig`](../type-aliases/MultisiteMiddlewareConfig.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:35](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L35)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:35](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L35)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Multisite middleware config

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`config`](MiddlewareBase.md#config)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L34)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`defaultHostname`](MiddlewareBase.md#defaulthostname)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`SITE_SYMBOL`](MiddlewareBase.md#site_symbol)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:55](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L55)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:55](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L55)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`excludeRoute`](MiddlewareBase.md#excluderoute)

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:91](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L91)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:91](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L91)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### getHandler()

> **getHandler**(): (`req`, `res?`) => `Promise`\<`NextResponse`\<`unknown`\>\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:43](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L43)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:43](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L43)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets the Next.js middleware handler with error handling

#### Returns

middleware handler

(`req`, `res?`) => `Promise`\<`NextResponse`\<`unknown`\>\>

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `undefined` \| `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:110](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L110)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:110](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L110)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Extract 'host' header

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`undefined` \| `string`

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`getHostHeader`](MiddlewareBase.md#gethostheader)

***

### getLanguage()

> `protected` **getLanguage**(`req`): `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:102](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L102)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:102](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L102)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### getSite()

> `protected` **getSite**(`req`, `res?`): [`SiteInfo`](../../index/type-aliases/SiteInfo.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:121](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L121)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:121](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L121)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### isPrefetch()

> `protected` **isPrefetch**(`req`): `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:56](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L56)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:56](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L56)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:45](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L45)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:45](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L45)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### rewrite()

> `protected` **rewrite**(`rewritePath`, `req`, `res`, `skipHeader?`): `NextResponse`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:138](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L138)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:138](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L138)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
