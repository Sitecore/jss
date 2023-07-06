[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [monitoring](../modules/monitoring.md) / HealthcheckMiddleware

# Class: HealthcheckMiddleware

[monitoring](../modules/monitoring.md).HealthcheckMiddleware

Middleware / handler for use in healthcheck Next.js API route (e.g. '/api/healthz').

## Table of contents

### Constructors

- [constructor](monitoring.HealthcheckMiddleware.md#constructor)

### Methods

- [getHandler](monitoring.HealthcheckMiddleware.md#gethandler)
- [handler](monitoring.HealthcheckMiddleware.md#handler)

## Constructors

### constructor

• **new HealthcheckMiddleware**()

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

[sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts:11](https://github.com/Sitecore/jss/blob/2c76f9cae/packages/sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts#L11)

___

### handler

▸ `Private` **handler**(`_req`, `res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_req` | `NextApiRequest` |
| `res` | `NextApiResponse`<`any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts:15](https://github.com/Sitecore/jss/blob/2c76f9cae/packages/sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts#L15)
