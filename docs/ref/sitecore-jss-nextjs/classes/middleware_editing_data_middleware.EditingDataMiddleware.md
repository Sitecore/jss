[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [middleware/editing-data-middleware](../modules/middleware_editing_data_middleware.md) / EditingDataMiddleware

# Class: EditingDataMiddleware

[middleware/editing-data-middleware](../modules/middleware_editing_data_middleware.md).EditingDataMiddleware

Middleware / handler for use in the editing data Next.js API dynamic route (e.g. '/api/editing/data/[key]')
which is required for Sitecore Experience Editor support.

## Table of contents

### Constructors

- [constructor](middleware_editing_data_middleware.EditingDataMiddleware.md#constructor)

### Properties

- [editingDataCache](middleware_editing_data_middleware.EditingDataMiddleware.md#editingdatacache)
- [queryParamKey](middleware_editing_data_middleware.EditingDataMiddleware.md#queryparamkey)

### Methods

- [getHandler](middleware_editing_data_middleware.EditingDataMiddleware.md#gethandler)
- [handler](middleware_editing_data_middleware.EditingDataMiddleware.md#handler)

## Constructors

### constructor

• **new EditingDataMiddleware**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingDataMiddlewareConfig`](../interfaces/middleware_editing_data_middleware.EditingDataMiddlewareConfig.md) |

#### Defined in

[src/middleware/editing-data-middleware.ts:36](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L36)

## Properties

### editingDataCache

• `Private` **editingDataCache**: [`EditingDataCache`](../interfaces/middleware_editing_data_cache.EditingDataCache.md)

#### Defined in

[src/middleware/editing-data-middleware.ts:31](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L31)

___

### queryParamKey

• `Private` **queryParamKey**: `string`

#### Defined in

[src/middleware/editing-data-middleware.ts:30](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L30)

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

[src/middleware/editing-data-middleware.ts:45](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L45)

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

[src/middleware/editing-data-middleware.ts:49](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/middleware/editing-data-middleware.ts#L49)
