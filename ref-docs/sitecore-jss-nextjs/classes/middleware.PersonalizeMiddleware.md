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

- [SITE\_SYMBOL](middleware.PersonalizeMiddleware.md#site_symbol)
- [cdpService](middleware.PersonalizeMiddleware.md#cdpservice)
- [config](middleware.PersonalizeMiddleware.md#config)
- [defaultHostname](middleware.PersonalizeMiddleware.md#defaulthostname)
- [personalizeService](middleware.PersonalizeMiddleware.md#personalizeservice)

### Accessors

- [browserIdCookieName](middleware.PersonalizeMiddleware.md#browseridcookiename)

### Methods

- [excludeRoute](middleware.PersonalizeMiddleware.md#excluderoute)
- [extractDebugHeaders](middleware.PersonalizeMiddleware.md#extractdebugheaders)
- [getBrowserId](middleware.PersonalizeMiddleware.md#getbrowserid)
- [getExperienceParams](middleware.PersonalizeMiddleware.md#getexperienceparams)
- [getHandler](middleware.PersonalizeMiddleware.md#gethandler)
- [getHostHeader](middleware.PersonalizeMiddleware.md#gethostheader)
- [getLanguage](middleware.PersonalizeMiddleware.md#getlanguage)
- [getSite](middleware.PersonalizeMiddleware.md#getsite)
- [handler](middleware.PersonalizeMiddleware.md#handler)
- [isPreview](middleware.PersonalizeMiddleware.md#ispreview)
- [setBrowserId](middleware.PersonalizeMiddleware.md#setbrowserid)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:43](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L43)

## Properties

### SITE\_SYMBOL

• `Protected` **SITE\_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

MiddlewareBase.SITE\_SYMBOL

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

___

### cdpService

• `Private` **cdpService**: `CdpService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:38](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L38)

___

### config

• `Protected` **config**: [`PersonalizeMiddlewareConfig`](../modules/middleware.md#personalizemiddlewareconfig)

Personalize middleware config

#### Inherited from

MiddlewareBase.config

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:43](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L43)

___

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

MiddlewareBase.defaultHostname

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

___

### personalizeService

• `Private` **personalizeService**: `GraphQLPersonalizeService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:37](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L37)

## Accessors

### browserIdCookieName

• `Protected` `get` **browserIdCookieName**(): `string`

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:88](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L88)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:118](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L118)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:64](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L64)

___

### getBrowserId

▸ `Protected` **getBrowserId**(`req`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |

#### Returns

`undefined` \| `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:93](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L93)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:103](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L103)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:76](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L76)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:83](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L83)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:75](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L75)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:94](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L94)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:123](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L123)

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

[sitecore-jss-nextjs/src/middleware/middleware.ts:43](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L43)

___

### setBrowserId

▸ `Protected` **setBrowserId**(`res`, `browserId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `NextResponse`<`unknown`\> |
| `browserId` | `string` |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:97](https://github.com/Sitecore/jss/blob/d8fa09357/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L97)
