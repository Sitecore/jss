[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / MiddlewareBase

# Class: `abstract` MiddlewareBase

## Extended by

- [`RedirectsMiddleware`](RedirectsMiddleware.md)
- [`PersonalizeMiddleware`](PersonalizeMiddleware.md)
- [`MultisiteMiddleware`](MultisiteMiddleware.md)

## Constructors

### new MiddlewareBase()

> **new MiddlewareBase**(`config`): [`MiddlewareBase`](MiddlewareBase.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`MiddlewareBaseConfig`](../type-aliases/MiddlewareBaseConfig.md) |

#### Returns

[`MiddlewareBase`](MiddlewareBase.md)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:35](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L35)

## Properties

### config

> `protected` **config**: [`MiddlewareBaseConfig`](../type-aliases/MiddlewareBaseConfig.md)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:35](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L35)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

***

### REWRITE\_HEADER\_NAME

> `protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

## Methods

### excludeRoute()

> `protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:63](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L63)

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Safely extract all headers for debug logging
Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `incomingHeaders` | `Headers` | Incoming headers |

#### Returns

`object`

Object with headers as key/value pairs

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:78](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L78)

***

### getHostHeader()

> `protected` **getHostHeader**(`req`): `undefined` \| `string`

Extract 'host' header

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`undefined` \| `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:97](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L97)

***

### getLanguage()

> `protected` **getLanguage**(`req`): `string`

Provides used language

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`string`

language

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:89](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L89)

***

### getSite()

> `protected` **getSite**(`req`, `res`?): [`SiteInfo`](../../index/type-aliases/SiteInfo.md)

Get site information.
Can not be used in **Preview** mode, since site will not be resolved

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |
| `res`? | `NextResponse`\<`unknown`\> | response |

#### Returns

[`SiteInfo`](../../index/type-aliases/SiteInfo.md)

site information

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:108](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L108)

***

### isPrefetch()

> `protected` **isPrefetch**(`req`): `boolean`

Determines if the request is a Next.js (next/link) prefetch request

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is prefetch

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:55](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L55)

***

### isPreview()

> `protected` **isPreview**(`req`): `boolean`

Determines if mode is preview

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is preview

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

***

### rewrite()

> `protected` **rewrite**(`rewritePath`, `req`, `res`): `NextResponse`\<`unknown`\>

Create a rewrite response

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse`\<`unknown`\> | the current response |

#### Returns

`NextResponse`\<`unknown`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:124](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L124)
