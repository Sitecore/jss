[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / RedirectsMiddlewareConfig

# Type Alias: RedirectsMiddlewareConfig

> **RedirectsMiddlewareConfig** = `Omit`\<`GraphQLRedirectsServiceConfig`, `"fetch"`\> & [`MiddlewareBaseConfig`](MiddlewareBaseConfig.md) & `object`

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:32](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L32)

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

## Type Declaration

### locales

> **locales**: `string`[]

These are all the locales you support in your application.
These should match those in your next.config.js (i18n.locales).
