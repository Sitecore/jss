[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / MultisiteMiddlewareConfig

# Type Alias: MultisiteMiddlewareConfig

> **MultisiteMiddlewareConfig** = `Omit`\<[`MiddlewareBaseConfig`](MiddlewareBaseConfig.md), `"disabled"`\> & `object`

Defined in: [sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:21](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L21)

## Type declaration

### useCookieResolution()?

> `optional` **useCookieResolution**: (`req`) => `boolean`

Function used to determine if site should be resolved from sc_site cookie when present

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextRequest` |

#### Returns

`boolean`
