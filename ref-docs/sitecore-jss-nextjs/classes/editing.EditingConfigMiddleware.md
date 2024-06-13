[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingConfigMiddleware

# Class: EditingConfigMiddleware

[editing](../modules/editing.md).EditingConfigMiddleware

Middleware / handler used in the editing config API route in xmcloud add on (e.g. '/api/editing/config')
provides configuration information to determine feature compatibility on Pages side.

## Table of contents

### Constructors

- [constructor](editing.EditingConfigMiddleware.md#constructor)

### Properties

- [config](editing.EditingConfigMiddleware.md#config)

### Methods

- [getHandler](editing.EditingConfigMiddleware.md#gethandler)
- [handler](editing.EditingConfigMiddleware.md#handler)

## Constructors

### constructor

• **new EditingConfigMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`EditingConfigMiddlewareConfig`](../modules/editing.md#editingconfigmiddlewareconfig) | Editing configuration middleware config |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:34](https://github.com/Sitecore/jss/blob/db53d5411/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L34)

## Properties

### config

• `Protected` **config**: [`EditingConfigMiddlewareConfig`](../modules/editing.md#editingconfigmiddlewareconfig)

Editing configuration middleware config

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:34](https://github.com/Sitecore/jss/blob/db53d5411/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L34)

## Methods

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`\<`any`\>) => `Promise`\<`void`\>

Gets the Next.js API route handler

#### Returns

`fn`

middleware handler

▸ (`req`, `res`): `Promise`\<`void`\>

Gets the Next.js API route handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

##### Returns

`Promise`\<`void`\>

middleware handler

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:40](https://github.com/Sitecore/jss/blob/db53d5411/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L40)

___

### handler

▸ `Private` **handler**(`_req`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:44](https://github.com/Sitecore/jss/blob/db53d5411/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L44)
