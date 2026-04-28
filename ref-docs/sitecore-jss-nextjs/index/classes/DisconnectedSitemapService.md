[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / DisconnectedSitemapService

# Class: DisconnectedSitemapService

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:4](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L4)
=======
Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:4](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L4)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Constructors

### Constructor

> **new DisconnectedSitemapService**(`manifest`): `DisconnectedSitemapService`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:11](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L11)
=======
Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:11](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L11)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Provides ability to generate sitemap using manifest.
Sitemap can be used for `next export`
You can use `sitecore/manifest/sitecore-import.json` as manifest

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `manifest` | `ManifestInstance` | manifest instance |

#### Returns

`DisconnectedSitemapService`

## Methods

### fetchExportSitemap()

> **fetchExportSitemap**(): [`StaticPath`](../type-aliases/StaticPath.md)[]

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:17](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L17)
=======
Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:17](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L17)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Generates sitemap which could be used for generation of static pages during `next export` in disconnected mode.
Since i18n is not supported, the output paths will not include a `locale` property.

#### Returns

[`StaticPath`](../type-aliases/StaticPath.md)[]
