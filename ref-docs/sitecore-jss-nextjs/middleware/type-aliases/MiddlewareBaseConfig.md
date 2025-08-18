[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / MiddlewareBaseConfig

# Type Alias: MiddlewareBaseConfig

> **MiddlewareBaseConfig** = `object`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:6](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L6)

## Properties

### defaultHostname?

> `optional` **defaultHostname**: `string`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:25](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L25)

Fallback hostname in case `host` header is not present

#### Default

```ts
localhost
```

***

### disabled()?

> `optional` **disabled**: (`req?`, `res?`) => `boolean`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:12](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L12)

function, determines if middleware should be turned off, based on cookie, header, or other considerations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req?` | `NextRequest` | request object from middleware handler |
| `res?` | `NextResponse` | response object from middleware handler |

#### Returns

`boolean`

***

### excludeRoute()?

> `optional` **excludeRoute**: (`pathname`) => `boolean`

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:20](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L20)

Function used to determine if route should be excluded.
By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
This is an important performance consideration since Next.js Edge middleware runs on every request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pathname` | `string` | The pathname |

#### Returns

`boolean`

Whether to exclude the route

***

### siteResolver

> **siteResolver**: [`SiteResolver`](../../index/classes/SiteResolver.md)

Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:29](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L29)

Site resolution implementation by name/hostname
