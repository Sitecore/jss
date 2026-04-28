[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / RedirectsMiddlewareConfig

# Type Alias: RedirectsMiddlewareConfig

> **RedirectsMiddlewareConfig** = `Omit`\<`GraphQLRedirectsServiceConfig`, `"fetch"`\> & [`MiddlewareBaseConfig`](MiddlewareBaseConfig.md) & `object`

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:32](https://github.com/Sitecore/jss/blob/52e25b8422c4fe896d141e97a2023346135ddfd2/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L32)

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

## Type declaration

### locales

> **locales**: `string`[]

These are all the locales you support in your application.
These should match those in your next.config.js (i18n.locales).
