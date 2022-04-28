[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / EditingDataMiddleware

# Class: EditingDataMiddleware

[middleware](../modules/middleware.md).EditingDataMiddleware

Middleware / handler for use in the editing data Next.js API dynamic route (e.g. '/api/editing/data/[key]')
which is required for Sitecore Experience Editor support.

## Table of contents

### Constructors

- [constructor](middleware.EditingDataMiddleware.md#constructor)

### Properties

- [editingDataCache](middleware.EditingDataMiddleware.md#editingdatacache)
- [queryParamKey](middleware.EditingDataMiddleware.md#queryparamkey)

### Methods

- [getHandler](middleware.EditingDataMiddleware.md#gethandler)
- [handler](middleware.EditingDataMiddleware.md#handler)

## Constructors

### constructor

• **new EditingDataMiddleware**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingDataMiddlewareConfig`](../interfaces/middleware.EditingDataMiddlewareConfig.md) |

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts:36](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L36)

## Properties

### editingDataCache

• `Private` **editingDataCache**: [`EditingDataCache`](../interfaces/middleware.EditingDataCache.md)

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts:31](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L31)

___

### queryParamKey

• `Private` **queryParamKey**: `string`

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts:30](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L30)

## Methods

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`<`any`\>) => `Promise`<`void`\>

Gets the Next.js API route handler

#### Returns

`fn`

route handler

▸ (`req`, `res`): `Promise`<`void`\>

Gets the Next.js API route handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`<`any`\> |

##### Returns

`Promise`<`void`\>

route handler

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts:45](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L45)

___

### handler

▸ `Private` **handler**(`req`, `res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`<`any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts:49](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L49)
