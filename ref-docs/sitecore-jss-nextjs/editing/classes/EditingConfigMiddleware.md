[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingConfigMiddleware

# Class: EditingConfigMiddleware

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:33](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L33)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:33](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L33)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Middleware / handler used in the editing config API route in xmcloud add on (e.g. '/api/editing/config')
provides configuration information to determine feature compatibility on Pages side.

## Constructors

### Constructor

> **new EditingConfigMiddleware**(`config?`): `EditingConfigMiddleware`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:37](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L37)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:37](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L37)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`EditingConfigMiddlewareConfig`](../type-aliases/EditingConfigMiddlewareConfig.md) | Editing configuration middleware config |

#### Returns

`EditingConfigMiddleware`

## Properties

### config

> `protected` **config**: [`EditingConfigMiddlewareConfig`](../type-aliases/EditingConfigMiddlewareConfig.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:37](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L37)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:37](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L37)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Editing configuration middleware config

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:43](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L43)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:43](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L43)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets the Next.js API route handler

#### Returns

middleware handler

(`req`, `res`) => `Promise`\<`void`\>
