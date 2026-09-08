[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataMiddleware

# Class: EditingDataMiddleware

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:31](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L31)

Middleware / handler for use in the editing data Next.js API dynamic route (e.g. '/api/editing/data/[key]')
which is required for Sitecore editing support.

## Constructors

### Constructor

> **new EditingDataMiddleware**(`config?`): `EditingDataMiddleware`

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:38](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L38)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`EditingDataMiddlewareConfig`](../interfaces/EditingDataMiddlewareConfig.md) | Editing data middleware config |

#### Returns

`EditingDataMiddleware`

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-middleware.ts:47](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-nextjs/src/editing/editing-data-middleware.ts#L47)

Gets the Next.js API route handler

#### Returns

route handler

(`req`, `res`) => `Promise`\<`void`\>
