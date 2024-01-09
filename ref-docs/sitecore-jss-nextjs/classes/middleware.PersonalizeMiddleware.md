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

- [SITE_SYMBOL](middleware.PersonalizeMiddleware.md#site_symbol)
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

## Constructors

### constructor

• **new PersonalizeMiddleware**(`config?`)

#### Parameters

| Name      | Type                                                                                  | Description                   |
| :-------- | :------------------------------------------------------------------------------------ | :---------------------------- |
| `config?` | [`PersonalizeMiddlewareConfig`](../modules/middleware.md#personalizemiddlewareconfig) | Personalize middleware config |

#### Overrides

MiddlewareBase.constructor

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:70](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L70)

## Properties

### SITE_SYMBOL

• `Protected` **SITE_SYMBOL**: `string` = `'sc_site'`

#### Inherited from

MiddlewareBase.SITE_SYMBOL

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:31](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L31)

---

### config

• `Protected` **config**: [`PersonalizeMiddlewareConfig`](../modules/middleware.md#personalizemiddlewareconfig)

Personalize middleware config

#### Inherited from

MiddlewareBase.config

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:70](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L70)

---

### defaultHostname

• `Protected` **defaultHostname**: `string`

#### Inherited from

MiddlewareBase.defaultHostname

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:32](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L32)

---

### personalizeService

• `Private` **personalizeService**: `GraphQLPersonalizeService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:65](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L65)

## Methods

### excludeRoute

▸ `Protected` **excludeRoute**(`pathname`): `undefined` \| `boolean`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `pathname` | `string` |

#### Returns

`undefined` \| `boolean`

#### Overrides

MiddlewareBase.excludeRoute

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:165](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L165)

---

### extractDebugHeaders

▸ `Protected` **extractDebugHeaders**(`incomingHeaders`): `Object`

Safely extract all headers for debug logging
Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765

#### Parameters

| Name              | Type      | Description      |
| :---------------- | :-------- | :--------------- |
| `incomingHeaders` | `Headers` | Incoming headers |

#### Returns

`Object`

Object with headers as key/value pairs

#### Inherited from

MiddlewareBase.extractDebugHeaders

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:64](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L64)

---

### getExperienceParams

▸ `Protected` **getExperienceParams**(`req`): `ExperienceParams`

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `req` | `NextRequest` |

#### Returns

`ExperienceParams`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:148](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L148)

---

### getHandler

▸ **getHandler**(): (`req`: `NextRequest`, `res?`: `NextResponse`<`unknown`\>) => `Promise`<`NextResponse`<`unknown`\>\>

Gets the Next.js middleware handler with error handling

#### Returns

`fn`

middleware handler

▸ (`req`, `res?`): `Promise`<`NextResponse`<`unknown`\>\>

Gets the Next.js middleware handler with error handling

##### Parameters

| Name   | Type                       |
| :----- | :------------------------- |
| `req`  | `NextRequest`              |
| `res?` | `NextResponse`<`unknown`\> |

##### Returns

`Promise`<`NextResponse`<`unknown`\>\>

middleware handler

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:85](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L85)

---

### getHostHeader

▸ `Protected` **getHostHeader**(`req`): `undefined` \| `string`

Extract 'host' header

#### Parameters

| Name  | Type          | Description |
| :---- | :------------ | :---------- |
| `req` | `NextRequest` | request     |

#### Returns

`undefined` \| `string`

#### Inherited from

MiddlewareBase.getHostHeader

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:83](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L83)

---

### getLanguage

▸ `Protected` **getLanguage**(`req`): `string`

Provides used language

#### Parameters

| Name  | Type          | Description |
| :---- | :------------ | :---------- |
| `req` | `NextRequest` | request     |

#### Returns

`string`

language

#### Inherited from

MiddlewareBase.getLanguage

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:75](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L75)

---

### getSite

▸ `Protected` **getSite**(`req`, `res?`): [`SiteInfo`](../modules/index.md#siteinfo)

Get site information.
Can not be used in **Preview** mode, since site will not be resolved

#### Parameters

| Name   | Type                       | Description |
| :----- | :------------------------- | :---------- |
| `req`  | `NextRequest`              | request     |
| `res?` | `NextResponse`<`unknown`\> | response    |

#### Returns

[`SiteInfo`](../modules/index.md#siteinfo)

site information

#### Inherited from

MiddlewareBase.getSite

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:94](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L94)

---

### handler

▸ `Private` **handler**(`req`, `res?`): `Promise`<`NextResponse`<`unknown`\>\>

#### Parameters

| Name   | Type                       |
| :----- | :------------------------- |
| `req`  | `NextRequest`              |
| `res?` | `NextResponse`<`unknown`\> |

#### Returns

`Promise`<`NextResponse`<`unknown`\>\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:170](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L170)

---

### initPersonalizeServer

▸ `Protected` **initPersonalizeServer**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name             | Type                       |
| :--------------- | :------------------------- |
| `«destructured»` | `Object`                   |
| › `hostname`     | `string`                   |
| › `request`      | `NextRequest`              |
| › `response`     | `NextResponse`<`unknown`\> |
| › `siteName`     | `string`                   |

#### Returns

`Promise`<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:97](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L97)

---

### isPreview

▸ `Protected` **isPreview**(`req`): `boolean`

Determines if mode is preview

#### Parameters

| Name  | Type          | Description |
| :---- | :------------ | :---------- |
| `req` | `NextRequest` | request     |

#### Returns

`boolean`

is preview

#### Inherited from

MiddlewareBase.isPreview

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:43](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L43)

---

### personalize

▸ `Protected` **personalize**(`«destructured»`, `request`): `Promise`<{ `variantId`: `string` }\>

#### Parameters

| Name                | Type               |
| :------------------ | :----------------- |
| `«destructured»`    | `Object`           |
| › `language`        | `string`           |
| › `params`          | `ExperienceParams` |
| › `personalizeInfo` | `PersonalizeInfo`  |
| › `timeout?`        | `number`           |
| `request`           | `NextRequest`      |

#### Returns

`Promise`<{ `variantId`: `string` }\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:121](https://github.com/Sitecore/jss/blob/876dae504/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L121)
