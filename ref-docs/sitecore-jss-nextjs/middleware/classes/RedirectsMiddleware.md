[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / RedirectsMiddleware

# Class: RedirectsMiddleware

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:42](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L42)

Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
compares with current url and redirects to target url

## Extends

- [`MiddlewareBase`](MiddlewareBase.md)

## Constructors

### Constructor

> **new RedirectsMiddleware**(`config?`): `RedirectsMiddleware`

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:49](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L49)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`RedirectsMiddlewareConfig`](../type-aliases/RedirectsMiddlewareConfig.md) | redirects middleware config |

#### Returns

`RedirectsMiddleware`

#### Overrides

[`MiddlewareBase`](MiddlewareBase.md).[`constructor`](MiddlewareBase.md#constructor)

## Properties

### config

> `protected` **config**: [`RedirectsMiddlewareConfig`](../type-aliases/RedirectsMiddlewareConfig.md)

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:49](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L49)

redirects middleware config

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`config`](MiddlewareBase.md#config)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:34](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L34)

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`defaultHostname`](MiddlewareBase.md#defaulthostname)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

#### Inherited from

[`MiddlewareBase`](MiddlewareBase.md).[`SITE_SYMBOL`](MiddlewareBase.md#site_symbol)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:76](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L76)

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

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:91](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L91)

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

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:81](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L81)

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

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:62](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L62)

Gets the Next.js middleware handler with error handling

#### Returns

route handler

> (`req`, `res?`): `Promise`\<`NextResponse`\<`unknown`\>\>

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`\<`unknown`\> |

##### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `undefined` \| `string`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:110](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L110)

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

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:102](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L102)

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

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:306](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L306)

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

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:121](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L121)

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

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:56](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L56)

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

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:45](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L45)

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

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:162](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L162)

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

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:138](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L138)

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
