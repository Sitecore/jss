[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [edge](../modules/edge.md) / RedirectsMiddleware

# Class: RedirectsMiddleware

[edge](../modules/edge.md).RedirectsMiddleware

Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
compares with current url and redirects to target url

## Table of contents

### Constructors

- [constructor](edge.RedirectsMiddleware.md#constructor)

### Properties

- [locales](edge.RedirectsMiddleware.md#locales)
- [redirectsService](edge.RedirectsMiddleware.md#redirectsservice)

### Methods

- [getExistsRedirect](edge.RedirectsMiddleware.md#getexistsredirect)
- [getHandler](edge.RedirectsMiddleware.md#gethandler)
- [handler](edge.RedirectsMiddleware.md#handler)

## Constructors

### constructor

• **new RedirectsMiddleware**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`RedirectsMiddlewareConfig`](../modules/edge.md#redirectsmiddlewareconfig) |

#### Defined in

[sitecore-jss-nextjs/src/edge/redirects-middleware.ts:29](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss-nextjs/src/edge/redirects-middleware.ts#L29)

## Properties

### locales

• `Private` **locales**: `string`[]

#### Defined in

[sitecore-jss-nextjs/src/edge/redirects-middleware.ts:24](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss-nextjs/src/edge/redirects-middleware.ts#L24)

___

### redirectsService

• `Private` **redirectsService**: `GraphQLRedirectsService`

#### Defined in

[sitecore-jss-nextjs/src/edge/redirects-middleware.ts:23](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss-nextjs/src/edge/redirects-middleware.ts#L23)

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

[sitecore-jss-nextjs/src/edge/redirects-middleware.ts:82](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss-nextjs/src/edge/redirects-middleware.ts#L82)

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

[sitecore-jss-nextjs/src/edge/redirects-middleware.ts:40](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss-nextjs/src/edge/redirects-middleware.ts#L40)

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

[sitecore-jss-nextjs/src/edge/redirects-middleware.ts:44](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss-nextjs/src/edge/redirects-middleware.ts#L44)
