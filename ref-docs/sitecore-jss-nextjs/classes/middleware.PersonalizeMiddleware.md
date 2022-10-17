[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / PersonalizeMiddleware

# Class: PersonalizeMiddleware

[middleware](../modules/middleware.md).PersonalizeMiddleware

Middleware / handler to support Sitecore Personalize

## Table of contents

### Constructors

- [constructor](middleware.PersonalizeMiddleware.md#constructor)

### Properties

- [cdpService](middleware.PersonalizeMiddleware.md#cdpservice)
- [config](middleware.PersonalizeMiddleware.md#config)
- [personalizeService](middleware.PersonalizeMiddleware.md#personalizeservice)

### Accessors

- [browserIdCookieName](middleware.PersonalizeMiddleware.md#browseridcookiename)

### Methods

- [excludeRoute](middleware.PersonalizeMiddleware.md#excluderoute)
- [extractDebugHeaders](middleware.PersonalizeMiddleware.md#extractdebugheaders)
- [getBrowserId](middleware.PersonalizeMiddleware.md#getbrowserid)
- [getExperienceParams](middleware.PersonalizeMiddleware.md#getexperienceparams)
- [getHandler](middleware.PersonalizeMiddleware.md#gethandler)
- [handler](middleware.PersonalizeMiddleware.md#handler)
- [isPreview](middleware.PersonalizeMiddleware.md#ispreview)
- [setBrowserId](middleware.PersonalizeMiddleware.md#setbrowserid)

## Constructors

### constructor

• **new PersonalizeMiddleware**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PersonalizeMiddlewareConfig`](../modules/middleware.md#personalizemiddlewareconfig) |

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:53](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L53)

## Properties

### cdpService

• `Private` **cdpService**: `CdpService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:48](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L48)

___

### config

• `Protected` **config**: [`PersonalizeMiddlewareConfig`](../modules/middleware.md#personalizemiddlewareconfig)

___

### personalizeService

• `Private` **personalizeService**: `GraphQLPersonalizeService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:47](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L47)

## Accessors

### browserIdCookieName

• `Protected` `get` **browserIdCookieName**(): `string`

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:89](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L89)

## Methods

### excludeRoute

▸ `Protected` **excludeRoute**(`pathname`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | `string` |

#### Returns

`boolean`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:116](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L116)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:138](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L138)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:94](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L94)

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

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:104](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L104)

___

### getHandler

▸ **getHandler**(): (`req`: `NextRequest`, `res?`: `NextResponse`) => `Promise`<`NextResponse`\>

Gets the Next.js middleware handler with error handling

#### Returns

`fn`

middleware handler

▸ (`req`, `res?`): `Promise`<`NextResponse`\>

Gets the Next.js middleware handler with error handling

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse` |

##### Returns

`Promise`<`NextResponse`\>

middleware handler

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:77](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L77)

___

### handler

▸ `Private` **handler**(`req`, `res?`): `Promise`<`NextResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |
| `res?` | `NextResponse` |

#### Returns

`Promise`<`NextResponse`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:144](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L144)

___

### isPreview

▸ `Protected` **isPreview**(`req`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |

#### Returns

`undefined` \| `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:128](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L128)

___

### setBrowserId

▸ `Protected` **setBrowserId**(`res`, `browserId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `NextResponse` |
| `browserId` | `string` |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:98](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L98)
