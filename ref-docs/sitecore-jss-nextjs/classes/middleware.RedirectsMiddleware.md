[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / RedirectsMiddleware

# Class: RedirectsMiddleware

[middleware](../modules/middleware.md).RedirectsMiddleware

Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
compares with current url and redirects to target url

## Hierarchy

- [`MiddlewareBase`](middleware.MiddlewareBase.md)

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
- [excludeRoute](middleware.RedirectsMiddleware.md#excluderoute)
- [extractDebugHeaders](middleware.RedirectsMiddleware.md#extractdebugheaders)
- [getExistsRedirect](middleware.RedirectsMiddleware.md#getexistsredirect)
- [getHandler](middleware.RedirectsMiddleware.md#gethandler)
- [getHostHeader](middleware.RedirectsMiddleware.md#gethostheader)
- [getLanguage](middleware.RedirectsMiddleware.md#getlanguage)
- [getSite](middleware.RedirectsMiddleware.md#getsite)
- [handler](middleware.RedirectsMiddleware.md#handler)
- [isPermutedQueryMatch](middleware.RedirectsMiddleware.md#ispermutedquerymatch)
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

[MiddlewareBase](middleware.MiddlewareBase.md).[constructor](middleware.MiddlewareBase.md#constructor)

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:42](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L42)

## Properties

### REWRITE\_HEADER\_NAME

• `Protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[REWRITE_HEADER_NAME](middleware.MiddlewareBase.md#rewrite_header_name)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

___

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[SITE_SYMBOL](middleware.MiddlewareBase.md#site_symbol)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

___

### config

• `Protected` **config**: [`RedirectsMiddlewareConfig`](../modules/middleware.md#redirectsmiddlewareconfig)

redirects middleware config

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[config](middleware.MiddlewareBase.md#config)

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:42](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L42)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

[MiddlewareBase](middleware.MiddlewareBase.md).[defaultHostname](middleware.MiddlewareBase.md#defaulthostname)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

___

### locales

• `Private` **locales**: `string`[]

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:37](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L37)

___

### redirectsService

• `Private` **redirectsService**: `GraphQLRedirectsService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:36](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L36)

## Methods

### createRedirectResponse

▸ `Private` **createRedirectResponse**(`url`, `res`, `status`, `statusText`): `NextResponse`\<`unknown`\>

Helper function to create a redirect response and remove the x-middleware-next header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `NextURL` | The URL to redirect to. |
| `res` | `undefined` \| `Response` | The response object. |
| `status` | `number` | The HTTP status code of the redirect. |
| `statusText` | `string` | The status text of the redirect. |

#### Returns

`NextResponse`\<`unknown`\>

The redirect response.

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:312](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L312)

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

[MiddlewareBase](middleware.MiddlewareBase.md).[excludeRoute](middleware.MiddlewareBase.md#excluderoute)

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:63](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L63)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:78](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L78)

___

### getExistsRedirect

▸ `Private` **getExistsRedirect**(`req`, `siteName`): `Promise`\<`undefined` \| `RedirectInfo` & \{ `matchedQueryString?`: `string`  }\>

Method returns RedirectInfo when matches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextRequest` | request |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<`undefined` \| `RedirectInfo` & \{ `matchedQueryString?`: `string`  }\>

Promise<RedirectInfo | undefined>

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:188](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L188)

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

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:55](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L55)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:97](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L97)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:89](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L89)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:108](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L108)

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

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:67](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L67)

___

### isPermutedQueryMatch

▸ `Private` **isPermutedQueryMatch**(`params`): `undefined` \| `string`

Checks if the current URL query matches the provided pattern, considering all permutations of query parameters.
It constructs all possible query parameter permutations and tests them against the pattern.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters for the URL match. |
| `params.locale?` | `string` | The locale prefix to include in the URL if present. |
| `params.pathname` | `string` | The current URL pathname. |
| `params.pattern` | `string` | The regex pattern to test the constructed URLs against. |
| `params.queryString` | `string` | The current URL query string. |

#### Returns

`undefined` \| `string`

- return query string if any of the query permutations match the provided pattern, undefined otherwise.

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:340](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L340)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:55](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L55)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

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

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:265](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L265)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:124](https://github.com/Sitecore/jss/blob/2f87a1106/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L124)
