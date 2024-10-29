[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / MiddlewareBase

# Class: MiddlewareBase

[middleware](../modules/middleware.md).MiddlewareBase

## Hierarchy

- **`MiddlewareBase`**

  ↳ [`RedirectsMiddleware`](middleware.RedirectsMiddleware.md)

  ↳ [`PersonalizeMiddleware`](middleware.PersonalizeMiddleware.md)

  ↳ [`MultisiteMiddleware`](middleware.MultisiteMiddleware.md)

## Table of contents

### Constructors

- [constructor](middleware.MiddlewareBase.md#constructor)

### Properties

- [REWRITE\_HEADER\_NAME](middleware.MiddlewareBase.md#rewrite_header_name)
- [SITE\_SYMBOL](middleware.MiddlewareBase.md#site_symbol)
- [config](middleware.MiddlewareBase.md#config)
- [defaultHostname](middleware.MiddlewareBase.md#defaulthostname)

### Methods

- [excludeRoute](middleware.MiddlewareBase.md#excluderoute)
- [extractDebugHeaders](middleware.MiddlewareBase.md#extractdebugheaders)
- [getHostHeader](middleware.MiddlewareBase.md#gethostheader)
- [getLanguage](middleware.MiddlewareBase.md#getlanguage)
- [getSite](middleware.MiddlewareBase.md#getsite)
- [isPrefetch](middleware.MiddlewareBase.md#isprefetch)
- [isPreview](middleware.MiddlewareBase.md#ispreview)
- [rewrite](middleware.MiddlewareBase.md#rewrite)

## Constructors

### constructor

• **new MiddlewareBase**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`MiddlewareBaseConfig`](../modules/middleware.md#middlewarebaseconfig) |

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:35](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L35)

## Properties

### REWRITE\_HEADER\_NAME

• `Protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

___

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

___

### config

• `Protected` **config**: [`MiddlewareBaseConfig`](../modules/middleware.md#middlewarebaseconfig)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:35](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L35)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

## Methods

### excludeRoute

▸ `Protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:63](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L63)

___

### extractDebugHeaders

▸ `Protected` **extractDebugHeaders**(`incomingHeaders`): `Object`

Safely extract all headers for debug logging
Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `incomingHeaders` | `Headers` | Incoming headers |

#### Returns

`Object`

Object with headers as key/value pairs

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:78](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L78)

___

### getHostHeader

▸ `Protected` **getHostHeader**(`req`): `undefined` \| `string`

Extract 'host' header

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |

#### Returns

`undefined` \| `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:97](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L97)

___

### getLanguage

▸ `Protected` **getLanguage**(`req`): `string`

Provides used language

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |

#### Returns

`string`

language

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:89](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L89)

___

### getSite

▸ `Protected` **getSite**(`req`, `res?`): [`SiteInfo`](../modules/index.md#siteinfo)

Get site information.
Can not be used in **Preview** mode, since site will not be resolved

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

[`SiteInfo`](../modules/index.md#siteinfo)

site information

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:108](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L108)

___

### isPrefetch

▸ `Protected` **isPrefetch**(`req`): `boolean`

Determines if the request is a Next.js (next/link) prefetch request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is prefetch

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:55](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L55)

___

### isPreview

▸ `Protected` **isPreview**(`req`): `boolean`

Determines if mode is preview

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |

#### Returns

`boolean`

is preview

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

___

### rewrite

▸ `Protected` **rewrite**(`rewritePath`, `req`, `res`): `NextResponse`\<`unknown`\>

Create a rewrite response

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse`\<`unknown`\> | the current response |

#### Returns

`NextResponse`\<`unknown`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:124](https://github.com/Sitecore/jss/blob/892e6d1a5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L124)
