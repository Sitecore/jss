[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / RedirectsMiddleware

# Class: RedirectsMiddleware

[middleware](../modules/middleware.md).RedirectsMiddleware

Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
compares with current url and redirects to target url

## Table of contents

### Constructors

- [constructor](middleware.RedirectsMiddleware.md#constructor)

### Properties

- [locales](middleware.RedirectsMiddleware.md#locales)
- [redirectsService](middleware.RedirectsMiddleware.md#redirectsservice)

### Methods

- [getExistsRedirect](middleware.RedirectsMiddleware.md#getexistsredirect)
- [getHandler](middleware.RedirectsMiddleware.md#gethandler)
- [handler](middleware.RedirectsMiddleware.md#handler)

## Constructors

### constructor

• **new RedirectsMiddleware**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`RedirectsMiddlewareConfig`](../modules/middleware.md#redirectsmiddlewareconfig) |

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:29](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L29)

## Properties

### locales

• `Private` **locales**: `string`[]

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:24](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L24)

___

### redirectsService

• `Private` **redirectsService**: `GraphQLRedirectsService`

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:23](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L23)

## Methods

### getExistsRedirect

▸ `Private` **getExistsRedirect**(`req`): `Promise`<`undefined` \| `RedirectInfo`\>

Method returns RedirectInfo when matches

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |

#### Returns

`Promise`<`undefined` \| `RedirectInfo`\>

Promise<RedirectInfo | undefined>

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:89](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L89)

___

### getHandler

▸ **getHandler**(): (`req`: `NextRequest`) => `Promise`<`NextResponse`\>

Gets the Next.js API route handler

#### Returns

`fn`

route handler

▸ (`req`): `Promise`<`NextResponse`\>

Gets the Next.js API route handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |

##### Returns

`Promise`<`NextResponse`\>

route handler

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:40](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L40)

___

### handler

▸ `Private` **handler**(`req`): `Promise`<`NextResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextRequest` |

#### Returns

`Promise`<`NextResponse`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:44](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L44)
