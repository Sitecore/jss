[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataMiddleware

# Class: EditingDataMiddleware

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L34)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Middleware / handler for use in the editing data Next.js API dynamic route (e.g. '/api/editing/data/[key]')
which is required for Sitecore editing support.

## Constructors

### Constructor

> **new EditingDataMiddleware**(`config?`): `EditingDataMiddleware`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L41)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`EditingDataMiddlewareConfig`](../interfaces/EditingDataMiddlewareConfig.md) | Editing data middleware config |

#### Returns

`EditingDataMiddleware`

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:50](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L50)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:50](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L50)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets the Next.js API route handler

#### Returns

route handler

(`req`, `res`) => `Promise`\<`void`\>
