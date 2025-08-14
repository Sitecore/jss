[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / MiddlewareBase

# Abstract Class: MiddlewareBase

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

## Extended by

- [`RedirectsMiddleware`](RedirectsMiddleware.md)
- [`PersonalizeMiddleware`](PersonalizeMiddleware.md)
- [`MultisiteMiddleware`](MultisiteMiddleware.md)

## Constructors

### Constructor

> **new MiddlewareBase**(`config`): `MiddlewareBase`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:36](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L36)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`MiddlewareBaseConfig`](../type-aliases/MiddlewareBaseConfig.md) |

#### Returns

`MiddlewareBase`

## Properties

### config

> `protected` **config**: [`MiddlewareBaseConfig`](../type-aliases/MiddlewareBaseConfig.md)

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:36](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L36)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:34](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L34)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

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
