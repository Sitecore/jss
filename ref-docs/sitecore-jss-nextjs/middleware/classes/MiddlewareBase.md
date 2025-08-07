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

[sitecore-jss-nextjs/src/middleware/middleware.ts:36](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L36)

## Properties

### config

> `protected` **config**: [`MiddlewareBaseConfig`](../type-aliases/MiddlewareBaseConfig.md)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:36](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L36)

***

### defaultHostname

> `protected` **defaultHostname**: `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:34](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L34)

***

### SITE\_SYMBOL

> `protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:76](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L76)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:91](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L91)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:110](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L110)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:102](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L102)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:121](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L121)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:56](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L56)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:45](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L45)

***

### rewrite()

> `protected` **rewrite**(`rewritePath`, `req`, `res`, `skipHeader`?): `NextResponse`\<`unknown`\>

Create a rewrite response

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse`\<`unknown`\> | the current response |
| `skipHeader`? | `boolean` | don't write 'x-sc-rewrite' header |

#### Returns

`NextResponse`\<`unknown`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:138](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L138)
