[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / MultisiteMiddleware

# Class: MultisiteMiddleware

[middleware](../modules/middleware.md).MultisiteMiddleware

Middleware / handler for multisite support

## Hierarchy

- [`MiddlewareBase`](middleware.MiddlewareBase.md)

  ↳ **`MultisiteMiddleware`**

## Table of contents

### Constructors

- [constructor](middleware.MultisiteMiddleware.md#constructor)

### Properties

- [REWRITE\_HEADER\_NAME](middleware.MultisiteMiddleware.md#rewrite_header_name)
- [SITE\_SYMBOL](middleware.MultisiteMiddleware.md#site_symbol)
- [config](middleware.MultisiteMiddleware.md#config)
- [defaultHostname](middleware.MultisiteMiddleware.md#defaulthostname)

### Methods

- [excludeRoute](middleware.MultisiteMiddleware.md#excluderoute)
- [extractDebugHeaders](middleware.MultisiteMiddleware.md#extractdebugheaders)
- [getHandler](middleware.MultisiteMiddleware.md#gethandler)
- [getHostHeader](middleware.MultisiteMiddleware.md#gethostheader)
- [getLanguage](middleware.MultisiteMiddleware.md#getlanguage)
- [getSite](middleware.MultisiteMiddleware.md#getsite)
- [handler](middleware.MultisiteMiddleware.md#handler)
- [isPrefetch](middleware.MultisiteMiddleware.md#isprefetch)
- [isPreview](middleware.MultisiteMiddleware.md#ispreview)
- [rewrite](middleware.MultisiteMiddleware.md#rewrite)

## Constructors

### constructor

• **new MultisiteMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`MultisiteMiddlewareConfig`](../modules/middleware.md#multisitemiddlewareconfig) | Multisite middleware config |

#### Overrides

[MiddlewareBase](middleware.MiddlewareBase.md).[constructor](middleware.MiddlewareBase.md#constructor)

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:35](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L35)

## Properties

### REWRITE\_HEADER\_NAME

• `Protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[REWRITE_HEADER_NAME](middleware.MiddlewareBase.md#rewrite_header_name)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

___

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[SITE_SYMBOL](middleware.MiddlewareBase.md#site_symbol)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

___

### config

• `Protected` **config**: [`MultisiteMiddlewareConfig`](../modules/middleware.md#multisitemiddlewareconfig)

Multisite middleware config

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[config](middleware.MiddlewareBase.md#config)

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:35](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L35)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[defaultHostname](middleware.MiddlewareBase.md#defaulthostname)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

## Methods

### excludeRoute

▸ `Protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Overrides

[MiddlewareBase](middleware.MiddlewareBase.md).[excludeRoute](middleware.MiddlewareBase.md#excluderoute)

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:55](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L55)

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

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[extractDebugHeaders](middleware.MiddlewareBase.md#extractdebugheaders)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:78](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L78)

___

### getHandler

▸ **getHandler**(): (`req`: `NextRequest`, `res?`: `NextResponse`\<`unknown`\>) => `Promise`\<`NextResponse`\<`unknown`\>\>

Gets the Next.js middleware handler with error handling

#### Returns

`fn`

middleware handler

▸ (`req`, `res?`): `Promise`\<`NextResponse`\<`unknown`\>\>

Gets the Next.js middleware handler with error handling

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`\<`unknown`\> |

##### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

middleware handler

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:43](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L43)

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

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[getHostHeader](middleware.MiddlewareBase.md#gethostheader)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:97](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L97)

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

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[getLanguage](middleware.MiddlewareBase.md#getlanguage)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:89](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L89)

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

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[getSite](middleware.MiddlewareBase.md#getsite)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:108](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L108)

___

### handler

▸ `Private` **handler**(`req`, `res?`): `Promise`\<`NextResponse`\<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`\<`unknown`\> |

#### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:60](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L60)

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

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[isPrefetch](middleware.MiddlewareBase.md#isprefetch)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:55](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L55)

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

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[isPreview](middleware.MiddlewareBase.md#ispreview)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

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

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[rewrite](middleware.MiddlewareBase.md#rewrite)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:124](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L124)
