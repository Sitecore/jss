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

- [createRedirectResponse](middleware.RedirectsMiddleware.md#createredirectresponse)
- [dispatchRedirect](middleware.RedirectsMiddleware.md#dispatchredirect)
- [excludeRoute](middleware.RedirectsMiddleware.md#excluderoute)
- [extractDebugHeaders](middleware.RedirectsMiddleware.md#extractdebugheaders)
- [getExistsRedirect](middleware.RedirectsMiddleware.md#getexistsredirect)
- [getHandler](middleware.RedirectsMiddleware.md#gethandler)
- [getHostHeader](middleware.RedirectsMiddleware.md#gethostheader)
- [getLanguage](middleware.RedirectsMiddleware.md#getlanguage)
- [getRedirects](middleware.RedirectsMiddleware.md#getredirects)
- [getSite](middleware.RedirectsMiddleware.md#getsite)
- [isPrefetch](middleware.RedirectsMiddleware.md#isprefetch)
- [isPreview](middleware.RedirectsMiddleware.md#ispreview)
- [normalizeUrl](middleware.RedirectsMiddleware.md#normalizeurl)
- [processRedirectRequest](middleware.RedirectsMiddleware.md#processredirectrequest)
- [rewrite](middleware.RedirectsMiddleware.md#rewrite)

## Constructors

### constructor

• **new RedirectsMiddleware**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`RedirectsMiddlewareConfig`](../modules/middleware.md#redirectsmiddlewareconfig) |

#### Overrides

MiddlewareBase.constructor

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:47](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L47)

## Properties

### REWRITE\_HEADER\_NAME

• `Protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Inherited from

MiddlewareBase.REWRITE\_HEADER\_NAME

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:34](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L34)

___

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

MiddlewareBase.SITE\_SYMBOL

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

___

### config

• `Protected` **config**: [`RedirectsMiddlewareConfig`](../modules/middleware.md#redirectsmiddlewareconfig)

#### Inherited from

MiddlewareBase.config

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:47](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L47)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

MiddlewareBase.defaultHostname

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:35](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L35)

___

### locales

• `Private` **locales**: `string`[]

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:45](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L45)

___

### redirectsService

• `Private` **redirectsService**: `GraphQLRedirectsService`

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:44](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L44)

## Methods

### createRedirectResponse

▸ `Private` **createRedirectResponse**(`url`, `res`, `status`, `statusText`): `NextResponse`\<`unknown`\>

Helper function to create a redirect response and remove the x-middleware-next header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` \| `NextURL` | The URL to redirect to. |
| `res` | `undefined` \| `Response` | The response object. |
| `status` | `number` | The HTTP status code of the redirect. |
| `statusText` | `string` | The status text of the redirect. |

#### Returns

`NextResponse`\<`unknown`\>

The redirect response.

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:380](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L380)

___

### dispatchRedirect

▸ `Private` **dispatchRedirect**(`target`, `type`, `req`, `res`, `isExternal?`): `NextResponse`\<`unknown`\>

Dispatch a redirect or rewrite based on type.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `target` | `string` \| `NextURL` | `undefined` | Final target to redirect/rewrite to (NextURL or string for externals). |
| `type` | `string` | `undefined` | One of `REDIRECT_TYPE_301`, `REDIRECT_TYPE_302`, or `REDIRECT_TYPE_SERVER_TRANSFER`. |
| `req` | `NextRequest` | `undefined` | Incoming request. |
| `res` | `NextResponse`\<`unknown`\> | `undefined` | Current response (used for header cleanup/carry-over). |
| `isExternal` | `boolean` | `false` | Set to `true` when target is an external absolute URL. |

#### Returns

`NextResponse`\<`unknown`\>

A NextResponse.

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:346](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L346)

___

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

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:52](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L52)

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

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:67](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L67)

___

### getExistsRedirect

▸ `Protected` **getExistsRedirect**(`req`, `siteName`): `Promise`\<`undefined` \| `RedirectResult`\>

Method returns RedirectInfo when matches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<`undefined` \| `RedirectResult`\>

Promise<RedirectInfo | undefined> The redirect info or undefined if no redirect is found

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:78](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L78)

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

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:59](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L59)

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

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:111](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L111)

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

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:103](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L103)

___

### getRedirects

▸ `Protected` **getRedirects**(`siteName`): `Promise`\<`RedirectInfo`[]\>

Fetches all redirects for a given site from the Sitecore instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `siteName` | `string` | The name of the site to fetch redirects for |

#### Returns

`Promise`\<`RedirectInfo`[]\>

A promise that resolves to an array of redirect information

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:294](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L294)

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

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:122](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L122)

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

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:78](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L78)

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

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:46](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L46)

___

### normalizeUrl

▸ `Private` **normalizeUrl**(`url`): `NextURL`

When a user clicks on a link generated by the Link component from next/link,
Next.js adds special parameters in the route called path.
This method removes these special parameters.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `NextURL` |

#### Returns

`NextURL`

normalize url

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:305](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L305)

___

### processRedirectRequest

▸ `Protected` **processRedirectRequest**(`req`, `res?`): `Promise`\<`NextResponse`\<`unknown`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |
| `res?` | `NextResponse`\<`unknown`\> | response |

#### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

The redirect response.

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:159](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L159)

___

### rewrite

▸ `Protected` **rewrite**(`rewritePath`, `req`, `res`, `skipHeader?`): `NextResponse`\<`unknown`\>

Create a rewrite response

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rewritePath` | `string` | the destionation path |
| `req` | `NextRequest` | the current request |
| `res` | `NextResponse`\<`unknown`\> | the current response |
| `skipHeader?` | `boolean` | don't write 'x-sc-rewrite' header |

#### Returns

`NextResponse`\<`unknown`\>

#### Inherited from

MiddlewareBase.rewrite

#### Defined in

[packages/sitecore-jss-nextjs/src/middleware/middleware.ts:139](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L139)
