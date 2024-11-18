[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingDataMiddleware

# Class: EditingDataMiddleware

[editing](../modules/editing.md).EditingDataMiddleware

Middleware / handler for use in the editing data Next.js API dynamic route (e.g. '/api/editing/data/[key]')
which is required for Sitecore editing support.

## Table of contents

### Constructors

- [constructor](editing.EditingDataMiddleware.md#constructor)

### Properties

- [editingDataCache](editing.EditingDataMiddleware.md#editingdatacache)
- [queryParamKey](editing.EditingDataMiddleware.md#queryparamkey)

### Methods

- [getHandler](editing.EditingDataMiddleware.md#gethandler)
- [handler](editing.EditingDataMiddleware.md#handler)

## Constructors

### constructor

• **new EditingDataMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`EditingDataMiddlewareConfig`](../interfaces/editing.EditingDataMiddlewareConfig.md) | Editing data middleware config |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:41](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L41)

## Properties

### editingDataCache

• `Private` **editingDataCache**: [`EditingDataCache`](../interfaces/editing.EditingDataCache.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:36](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L36)

___

### queryParamKey

• `Private` **queryParamKey**: `string`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:35](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L35)

## Methods

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`\<`any`\>) => `Promise`\<`void`\>

Gets the Next.js API route handler

#### Returns

`fn`

route handler

▸ (`req`, `res`): `Promise`\<`void`\>

Gets the Next.js API route handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

##### Returns

`Promise`\<`void`\>

route handler

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:50](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L50)

___

### handler

▸ `Private` **handler**(`req`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:54](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L54)
