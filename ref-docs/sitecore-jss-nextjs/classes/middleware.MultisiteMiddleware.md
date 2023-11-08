[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / MultisiteMiddleware

# Class: MultisiteMiddleware

[middleware](../modules/middleware.md).MultisiteMiddleware

Middleware / handler for multisite support

## Hierarchy

- `MiddlewareBase`

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

MiddlewareBase.constructor

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:20](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L20)

## Properties

### REWRITE\_HEADER\_NAME

• `Protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Inherited from

MiddlewareBase.REWRITE\_HEADER\_NAME

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

___

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

MiddlewareBase.SITE\_SYMBOL

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

___

### config

• `Protected` **config**: [`MultisiteMiddlewareConfig`](../modules/middleware.md#multisitemiddlewareconfig)

Multisite middleware config

#### Inherited from

MiddlewareBase.config

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:20](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L20)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

MiddlewareBase.defaultHostname

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

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

MiddlewareBase.excludeRoute

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:40](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L40)

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

MiddlewareBase.extractDebugHeaders

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:65](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L65)

___

### getHandler

▸ **getHandler**(): (`req`: `NextRequest`, `res?`: `NextResponse`<`unknown`\>) => `Promise`<`NextResponse`<`unknown`\>\>

Gets the Next.js middleware handler with error handling

#### Returns

`fn`

middleware handler

▸ (`req`, `res?`): `Promise`<`NextResponse`<`unknown`\>\>

Gets the Next.js middleware handler with error handling

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`<`unknown`\> |

##### Returns

`Promise`<`NextResponse`<`unknown`\>\>

middleware handler

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:28](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L28)

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

MiddlewareBase.getHostHeader

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:84](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L84)

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

MiddlewareBase.getLanguage

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:76](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L76)

___

### getSite

▸ `Protected` **getSite**(`req`, `res?`): [`SiteInfo`](../modules/index.md#siteinfo)

Get site information.
Can not be used in **Preview** mode, since site will not be resolved

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`<`unknown`\> | response |

#### Returns

[`SiteInfo`](../modules/index.md#siteinfo)

site information

#### Inherited from

MiddlewareBase.getSite

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:95](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L95)

___

### handler

▸ `Private` **handler**(`req`, `res?`): `Promise`<`NextResponse`<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`<`unknown`\> |

#### Returns

`Promise`<`NextResponse`<`unknown`\>\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:45](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L45)

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

MiddlewareBase.isPreview

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

___

### rewrite

▸ `Protected` **rewrite**(`rewritePath`, `req`, `res`): `NextResponse`<`unknown`\>

Create a rewrite response

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse`<`unknown`\> | the current response |

#### Returns

`NextResponse`<`unknown`\>

#### Inherited from

MiddlewareBase.rewrite

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:111](https://github.com/Sitecore/jss/blob/632595055/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L111)
