---
name: editingdatamiddleware
routeTemplate: ./data/component-templates/article.yml
title: editingdatamiddleware
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [middleware/editing-data-middleware](/docs/nextjs/ref/modules/middleware_editing_data_middleware) / EditingDataMiddleware

# Class: EditingDataMiddleware

[middleware/editing-data-middleware](/docs/nextjs/ref/modules/middleware_editing_data_middleware).EditingDataMiddleware

Middleware / handler for use in the editing data Next.js API dynamic route (e.g. '/api/editing/data/[key]')
which is required for Sitecore Experience Editor support.

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/middleware_editing_data_middleware/editingdatamiddleware#constructor)

### Properties

- [editingDataCache](/docs/nextjs/ref/classes/middleware_editing_data_middleware/editingdatamiddleware#editingdatacache)
- [queryParamKey](/docs/nextjs/ref/classes/middleware_editing_data_middleware/editingdatamiddleware#queryparamkey)

### Methods

- [getHandler](/docs/nextjs/ref/classes/middleware_editing_data_middleware/editingdatamiddleware#gethandler)
- [handler](/docs/nextjs/ref/classes/middleware_editing_data_middleware/editingdatamiddleware#handler)

## Constructors

### constructor

• **new EditingDataMiddleware**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingDataMiddlewareConfig`](/docs/nextjs/ref/interfaces/middleware_editing_data_middleware/editingdatamiddlewareconfig) |

## Properties

### editingDataCache

• `Private` **editingDataCache**: [`EditingDataCache`](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache)

___

### queryParamKey

• `Private` **queryParamKey**: `string`

## Methods

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`<`any`\>) => `Promise`<`void`\>

Gets the Next.js API route handler

#### Returns

`fn`

route handler

▸ (`req`, `res`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`<`any`\> |

##### Returns

`Promise`<`void`\>

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
