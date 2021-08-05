[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [services/disconnected-sitemap-service](../modules/services_disconnected_sitemap_service.md) / DisconnectedSitemapService

# Class: DisconnectedSitemapService

[services/disconnected-sitemap-service](../modules/services_disconnected_sitemap_service.md).DisconnectedSitemapService

## Table of contents

### Constructors

- [constructor](services_disconnected_sitemap_service.DisconnectedSitemapService.md#constructor)

### Methods

- [fetchExportSitemap](services_disconnected_sitemap_service.DisconnectedSitemapService.md#fetchexportsitemap)

## Constructors

### constructor

• **new DisconnectedSitemapService**(`manifest`)

Provides ability to generate sitemap using manifest.
Sitemap can be used for `next export`
You can use `sitecore/manifest/sitecore-import.json` as manifest

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manifest` | [`ManifestInstance`](../interfaces/index.ManifestInstance.md) | manifest instance |

#### Defined in

[src/services/disconnected-sitemap-service.ts:11](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L11)

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(): [`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]

Generates sitemap which could be used for generation of static pages during `next export` in disconnected mode.
Since i18n is not supported, the output paths will not include a `locale` property.

#### Returns

[`StaticPath`](../modules/services_graphql_sitemap_service.md#staticpath)[]

#### Defined in

[src/services/disconnected-sitemap-service.ts:17](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/services/disconnected-sitemap-service.ts#L17)
