[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / RedirectsMiddleware

# Class: RedirectsMiddleware

[middleware](../modules/middleware.md).RedirectsMiddleware

Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
compares with current url and redirects to target url

## Hierarchy

- `MiddlewareBase`

  ↳ **`RedirectsMiddleware`**

## Table of contents

### Constructors

- [constructor](middleware.RedirectsMiddleware.md#constructor)

### Properties

- [REWRITE\_HEADER\_NAME](middleware.RedirectsMiddleware.md#rewrite_header_name)
- [SITE\_SYMBOL](middleware.RedirectsMiddleware.md#site_symbol)
- [config](middleware.RedirectsMiddleware.md#config)
- [defaultHostname](middleware.RedirectsMiddleware.md#defaulthostname)
- [locales](middleware.RedirectsMiddleware.md#locales)
- [redirectsService](middleware.RedirectsMiddleware.md#redirectsservice)

### Methods

- [excludeRoute](middleware.RedirectsMiddleware.md#excluderoute)
- [extractDebugHeaders](middleware.RedirectsMiddleware.md#extractdebugheaders)
- [getExistsRedirect](middleware.RedirectsMiddleware.md#getexistsredirect)
- [getHandler](middleware.RedirectsMiddleware.md#gethandler)
- [getHostHeader](middleware.RedirectsMiddleware.md#gethostheader)
- [getLanguage](middleware.RedirectsMiddleware.md#getlanguage)
- [getSite](middleware.RedirectsMiddleware.md#getsite)
- [handler](middleware.RedirectsMiddleware.md#handler)
- [isPrefetch](middleware.RedirectsMiddleware.md#isprefetch)
- [isPreview](middleware.RedirectsMiddleware.md#ispreview)
- [normalizeUrl](middleware.RedirectsMiddleware.md#normalizeurl)
- [rewrite](middleware.RedirectsMiddleware.md#rewrite)

## Constructors

### constructor

• **new RedirectsMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`RedirectsMiddlewareConfig`](../modules/middleware.md#redirectsmiddlewareconfig) | redirects middleware config |

#### Overrides

MiddlewareBase.constructor

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:40](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L40)

## Properties

### REWRITE\_HEADER\_NAME

• `Protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Inherited from

MiddlewareBase.REWRITE\_HEADER\_NAME

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

___

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

MiddlewareBase.SITE\_SYMBOL

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

___

### config

• `Protected` **config**: [`RedirectsMiddlewareConfig`](../modules/middleware.md#redirectsmiddlewareconfig)

redirects middleware config

#### Inherited from

MiddlewareBase.config

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:40](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L40)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

MiddlewareBase.defaultHostname

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

___

### locales

• `Private` **locales**: `string`[]

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:35](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L35)

___

### redirectsService

• `Private` **redirectsService**: `GraphQLRedirectsService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:34](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L34)

## Methods

### excludeRoute

▸ `Protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Inherited from

MiddlewareBase.excludeRoute

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:63](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L63)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:78](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L78)

___

### getExistsRedirect

▸ `Private` **getExistsRedirect**(`req`, `siteName`): `Promise`\<`undefined` \| `RedirectInfo`\>

Method returns RedirectInfo when matches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<`undefined` \| `RedirectInfo`\>

Promise<RedirectInfo | undefined>

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:189](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L189)

___

### getHandler

▸ **getHandler**(): (`req`: `NextRequest`, `res?`: `NextResponse`\<`unknown`\>) => `Promise`\<`NextResponse`\<`unknown`\>\>

Gets the Next.js middleware handler with error handling

#### Returns

`fn`

route handler

▸ (`req`, `res?`): `Promise`\<`NextResponse`\<`unknown`\>\>

Gets the Next.js middleware handler with error handling

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse`\<`unknown`\> |

##### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

route handler

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:53](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L53)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:97](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L97)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:89](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L89)

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

MiddlewareBase.getSite

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:108](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L108)

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

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:65](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L65)

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

MiddlewareBase.isPrefetch

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:55](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L55)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

___

### normalizeUrl

▸ `Private` **normalizeUrl**(`url`): `URL`

When a user clicks on a link generated by the Link component from next/link,
Next.js adds special parameters in the route called path.
This method removes these special parameters.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `URL` |

#### Returns

`URL`

normalize url

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:232](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L232)

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

MiddlewareBase.rewrite

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:124](https://github.com/Sitecore/jss/blob/410e85a33/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L124)
