[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / DisconnectedSitemapService

# Class: DisconnectedSitemapService

Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:4](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L4)

## Constructors

### Constructor

> **new DisconnectedSitemapService**(`manifest`): `DisconnectedSitemapService`

Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:11](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L11)

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

Defined in: [sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:17](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L17)

Generates sitemap which could be used for generation of static pages during `next export` in disconnected mode.
Since i18n is not supported, the output paths will not include a `locale` property.

#### Returns

[`StaticPath`](../type-aliases/StaticPath.md)[]
