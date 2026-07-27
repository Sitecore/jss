[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [monitoring](../README.md) / HealthcheckMiddleware

# Class: HealthcheckMiddleware

Defined in: [sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts:6](https://github.com/Sitecore/jss/blob/bb94a11d798b90441596d37d2022c73e9c91df04/packages/sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts#L6)

Middleware / handler for use in healthcheck Next.js API route (e.g. '/api/healthz').

## Constructors

### Constructor

> **new HealthcheckMiddleware**(): `HealthcheckMiddleware`

#### Returns

`HealthcheckMiddleware`

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts:11](https://github.com/Sitecore/jss/blob/bb94a11d798b90441596d37d2022c73e9c91df04/packages/sitecore-jss-nextjs/src/monitoring/healthcheck-middleware.ts#L11)

Gets the Next.js API route handler

#### Returns

route handler

(`req`, `res`) => `Promise`\<`void`\>
