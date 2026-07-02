[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / RedirectsMiddlewareConfig

# Type Alias: RedirectsMiddlewareConfig

> **RedirectsMiddlewareConfig** = `Omit`\<`GraphQLRedirectsServiceConfig`, `"fetch"`\> & [`MiddlewareBaseConfig`](MiddlewareBaseConfig.md) & `object`

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:32](https://github.com/Sitecore/jss/blob/0855fc0bf7b8e965294dea4bcc778e59543a60e6/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L32)

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

## Type Declaration

### locales

> **locales**: `string`[]

These are all the locales you support in your application.
These should match those in your next.config.js (i18n.locales).
