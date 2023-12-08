[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / PersonalizeMiddleware

# Class: PersonalizeMiddleware

[middleware](../modules/middleware.md).PersonalizeMiddleware

Middleware / handler to support Sitecore Personalize

## Hierarchy

- `MiddlewareBase`

  ↳ **`PersonalizeMiddleware`**

## Table of contents

### Constructors

- [constructor](middleware.PersonalizeMiddleware.md#constructor)

### Properties

- [REWRITE\_HEADER\_NAME](middleware.PersonalizeMiddleware.md#rewrite_header_name)
- [SITE\_SYMBOL](middleware.PersonalizeMiddleware.md#site_symbol)
- [config](middleware.PersonalizeMiddleware.md#config)
- [defaultHostname](middleware.PersonalizeMiddleware.md#defaulthostname)
- [personalizeService](middleware.PersonalizeMiddleware.md#personalizeservice)

### Methods

- [excludeRoute](middleware.PersonalizeMiddleware.md#excluderoute)
- [extractDebugHeaders](middleware.PersonalizeMiddleware.md#extractdebugheaders)
- [getExperienceParams](middleware.PersonalizeMiddleware.md#getexperienceparams)
- [getHandler](middleware.PersonalizeMiddleware.md#gethandler)
- [getHostHeader](middleware.PersonalizeMiddleware.md#gethostheader)
- [getLanguage](middleware.PersonalizeMiddleware.md#getlanguage)
- [getSite](middleware.PersonalizeMiddleware.md#getsite)
- [handler](middleware.PersonalizeMiddleware.md#handler)
- [initPersonalizeServer](middleware.PersonalizeMiddleware.md#initpersonalizeserver)
- [isPreview](middleware.PersonalizeMiddleware.md#ispreview)
- [personalize](middleware.PersonalizeMiddleware.md#personalize)
- [rewrite](middleware.PersonalizeMiddleware.md#rewrite)

## Constructors

### constructor

• **new PersonalizeMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`PersonalizeMiddlewareConfig`](../modules/middleware.md#personalizemiddlewareconfig) | Personalize middleware config |

#### Overrides

MiddlewareBase.constructor

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:70](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L70)

## Properties

### REWRITE\_HEADER\_NAME

• `Protected` **REWRITE\_HEADER\_NAME**: `string` = `'x-sc-rewrite'`

#### Inherited from

MiddlewareBase.REWRITE\_HEADER\_NAME

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

___

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

MiddlewareBase.SITE\_SYMBOL

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

___

### config

• `Protected` **config**: [`PersonalizeMiddlewareConfig`](../modules/middleware.md#personalizemiddlewareconfig)

Personalize middleware config

#### Inherited from

MiddlewareBase.config

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:70](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L70)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

MiddlewareBase.defaultHostname

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:33](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L33)

___

### personalizeService

• `Private` **personalizeService**: `GraphQLPersonalizeService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:65](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L65)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:165](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L165)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:65](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L65)

___

### getExperienceParams

▸ `Protected` **getExperienceParams**(`req`): `ExperienceParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |

#### Returns

`ExperienceParams`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:148](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L148)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:85](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L85)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:84](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L84)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:76](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L76)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:95](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L95)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:170](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L170)

___

### initPersonalizeServer

▸ `Protected` **initPersonalizeServer**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hostname` | `string` |
| › `request` | `NextRequest` |
| › `response` | `NextResponse`<`unknown`\> |
| › `siteName` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:97](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L97)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:44](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L44)

___

### personalize

▸ `Protected` **personalize**(`«destructured»`, `request`): `Promise`<{ `variantId`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `language` | `string` |
| › `params` | `ExperienceParams` |
| › `personalizeInfo` | `PersonalizeInfo` |
| › `timeout?` | `number` |
| `request` | `NextRequest` |

#### Returns

`Promise`<{ `variantId`: `string`  }\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:121](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L121)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:111](https://github.com/Sitecore/jss/blob/d653d8a7d/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L111)
