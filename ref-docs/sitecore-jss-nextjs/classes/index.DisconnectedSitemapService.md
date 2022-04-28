[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / DisconnectedSitemapService

# Class: DisconnectedSitemapService

[index](../modules/index.md).DisconnectedSitemapService

## Table of contents

### Constructors

- [constructor](index.DisconnectedSitemapService.md#constructor)

### Methods

- [fetchExportSitemap](index.DisconnectedSitemapService.md#fetchexportsitemap)

## Constructors

### constructor

• **new DisconnectedSitemapService**(`manifest`)

Provides ability to generate sitemap using manifest.
Sitemap can be used for `next export`
You can use `sitecore/manifest/sitecore-import.json` as manifest

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manifest` | `ManifestInstance` | manifest instance |

#### Defined in

[sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:11](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L11)

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(): [`StaticPath`](../modules/index.md#staticpath)[]

Generates sitemap which could be used for generation of static pages during `next export` in disconnected mode.
Since i18n is not supported, the output paths will not include a `locale` property.

#### Returns

[`StaticPath`](../modules/index.md#staticpath)[]

#### Defined in

[sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts:17](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L17)
