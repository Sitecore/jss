[@sitecore-jss/sitecore-jss-nextjs](../README.md) / middleware

# Module: middleware

## Table of contents

### References

- [debug](middleware.md#debug)

### Classes

- [MiddlewareBase](../classes/middleware.MiddlewareBase.md)
- [MultisiteMiddleware](../classes/middleware.MultisiteMiddleware.md)
- [PersonalizeMiddleware](../classes/middleware.PersonalizeMiddleware.md)
- [RedirectsMiddleware](../classes/middleware.RedirectsMiddleware.md)

### Type Aliases

- [MiddlewareBaseConfig](middleware.md#middlewarebaseconfig)
- [MultisiteMiddlewareConfig](middleware.md#multisitemiddlewareconfig)
- [PersonalizeMiddlewareConfig](middleware.md#personalizemiddlewareconfig)
- [RedirectsMiddlewareConfig](middleware.md#redirectsmiddlewareconfig)

## References

### debug

Re-exports [debug](index.md#debug)

## Type Aliases

### MiddlewareBaseConfig

Ƭ **MiddlewareBaseConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultHostname?` | `string` | Fallback hostname in case `host` header is not present **`Default`** ```ts localhost ``` |
| `disabled?` | (`req?`: `NextRequest`, `res?`: `NextResponse`) => `boolean` | function, determines if middleware should be turned off, based on cookie, header, or other considerations |
| `excludeRoute?` | (`pathname`: `string`) => `boolean` | Function used to determine if route should be excluded. By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored. This is an important performance consideration since Next.js Edge middleware runs on every request. |
| `siteResolver` | [`SiteResolver`](../classes/index.SiteResolver.md) | Site resolution implementation by name/hostname |

#### Defined in

[sitecore-jss-nextjs/src/middleware/middleware.ts:4](https://github.com/Sitecore/jss/blob/3eff42e53/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L4)

___

### MultisiteMiddlewareConfig

Ƭ **MultisiteMiddlewareConfig**: `Omit`\<[`MiddlewareBaseConfig`](middleware.md#middlewarebaseconfig), ``"disabled"``\> & \{ `useCookieResolution?`: (`req`: `NextRequest`) => `boolean`  }

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:21](https://github.com/Sitecore/jss/blob/3eff42e53/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L21)

___

### PersonalizeMiddlewareConfig

Ƭ **PersonalizeMiddlewareConfig**: [`MiddlewareBaseConfig`](middleware.md#middlewarebaseconfig) & \{ `cdpConfig`: `CdpServiceConfig` ; `edgeConfig`: `Omit`\<`GraphQLPersonalizeServiceConfig`, ``"fetch"``\> ; `scope?`: `string`  }

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:39](https://github.com/Sitecore/jss/blob/3eff42e53/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L39)

___

### RedirectsMiddlewareConfig

Ƭ **RedirectsMiddlewareConfig**: `Omit`\<`GraphQLRedirectsServiceConfig`, ``"fetch"``\> & [`MiddlewareBaseConfig`](middleware.md#middlewarebaseconfig) & \{ `locales`: `string`[]  }

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:23](https://github.com/Sitecore/jss/blob/3eff42e53/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L23)
