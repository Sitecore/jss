[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingConfigMiddleware

# Class: EditingConfigMiddleware

Middleware / handler used in the editing config API route in xmcloud add on (e.g. '/api/editing/config')
provides configuration information to determine feature compatibility on Pages side.

## Constructors

### new EditingConfigMiddleware()

> **new EditingConfigMiddleware**(`config`?): [`EditingConfigMiddleware`](EditingConfigMiddleware.md)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config`? | [`EditingConfigMiddlewareConfig`](../type-aliases/EditingConfigMiddlewareConfig.md) | Editing configuration middleware config |

#### Returns

[`EditingConfigMiddleware`](EditingConfigMiddleware.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:37](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L37)

## Properties

### config

> `protected` **config**: [`EditingConfigMiddlewareConfig`](../type-aliases/EditingConfigMiddlewareConfig.md)

Editing configuration middleware config

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:37](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L37)

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

Gets the Next.js API route handler

#### Returns

`Function`

middleware handler

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:43](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L43)
