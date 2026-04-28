[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / RedirectsMiddleware

# Class: RedirectsMiddleware

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:45](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L45)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:45](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L45)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
compares with current url and redirects to target url

## Extends

- [`MiddlewareBase`](MiddlewareBase.md)

## Constructors

### Constructor

> **new RedirectsMiddleware**(`config`): `RedirectsMiddleware`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:49](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L49)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:49](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L49)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`RedirectsMiddlewareConfig`](../type-aliases/RedirectsMiddlewareConfig.md) |

#### Returns

`RedirectsMiddleware`

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`constructor`](MiddlewareBase.md#constructor)

## Properties

### config

> `protected` **config**: [`RedirectsMiddlewareConfig`](../type-aliases/RedirectsMiddlewareConfig.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:49](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L49)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:49](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L49)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:76](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L76)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:76](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L76)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Inherited from

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

### getExistsRedirect()

> `protected` **getExistsRedirect**(`req`, `siteName`): `Promise`\<`undefined` \| `RedirectResult`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:80](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L80)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:80](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L80)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Method returns RedirectInfo when matches

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<`undefined` \| `RedirectResult`\>

Promise<RedirectInfo | undefined> The redirect info or undefined if no redirect is found

***

### getHandler()

> **getHandler**(): (`req`, `res?`) => `Promise`\<`NextResponse`\<`unknown`\>\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:61](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L61)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:61](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L61)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets the Next.js middleware handler with error handling

#### Returns

route handler

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

### getRedirects()

> `protected` **getRedirects**(`siteName`): `Promise`\<`RedirectInfo`[]\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:308](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L308)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:308](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L308)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetches all redirects for a given site from the Sitecore instance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteName` | `string` | The name of the site to fetch redirects for |

#### Returns

`Promise`\<`RedirectInfo`[]\>

A promise that resolves to an array of redirect information

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

### processRedirectRequest()

> `protected` **processRedirectRequest**(`req`, `res?`): `Promise`\<`NextResponse`\<`unknown`\>\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:161](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L161)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:161](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L161)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

The redirect response.

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
