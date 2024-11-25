[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / DisconnectedSitemapService

# Class: DisconnectedSitemapService

## Constructors

### new DisconnectedSitemapService()

> **new DisconnectedSitemapService**(`manifest`): [`DisconnectedSitemapService`](DisconnectedSitemapService.md)

Provides ability to generate sitemap using manifest.
Sitemap can be used for `next export`
You can use `sitecore/manifest/sitecore-import.json` as manifest

#### Parameters

• **manifest**: `ManifestInstance`

manifest instance

#### Returns

[`DisconnectedSitemapService`](DisconnectedSitemapService.md)

#### Defined in

[sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:11](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L11)

## Methods

### fetchExportSitemap()

> **fetchExportSitemap**(): [`StaticPath`](../type-aliases/StaticPath.md)[]

Generates sitemap which could be used for generation of static pages during `next export` in disconnected mode.
Since i18n is not supported, the output paths will not include a `locale` property.

#### Returns

[`StaticPath`](../type-aliases/StaticPath.md)[]

#### Defined in

[sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:17](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L17)
