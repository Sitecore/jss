[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / MiddlewareBaseConfig

# Type Alias: MiddlewareBaseConfig

> **MiddlewareBaseConfig** = `object`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:6](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L6)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:6](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L6)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### defaultHostname?

> `optional` **defaultHostname?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:25](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L25)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:25](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L25)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fallback hostname in case `host` header is not present

#### Default

```ts
localhost
```

***

### disabled?

> `optional` **disabled?**: (`req?`, `res?`) => `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:12](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L12)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:12](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L12)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

function, determines if middleware should be turned off, based on cookie, header, or other considerations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req?` | `NextRequest` | request object from middleware handler |
| `res?` | `NextResponse` | response object from middleware handler |

#### Returns

`boolean`

***

### excludeRoute?

> `optional` **excludeRoute?**: (`pathname`) => `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:20](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L20)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:20](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L20)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:29](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L29)
=======
Defined in: [sitecore-jss-nextjs/src/middleware/middleware.ts:29](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/middleware/middleware.ts#L29)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Site resolution implementation by name/hostname
