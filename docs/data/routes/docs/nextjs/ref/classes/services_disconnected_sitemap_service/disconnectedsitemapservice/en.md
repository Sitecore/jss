---
name: disconnectedsitemapservice
routeTemplate: ./data/component-templates/article.yml
title: disconnectedsitemapservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [services/disconnected-sitemap-service](/docs/nextjs/ref/modules/services_disconnected_sitemap_service) / DisconnectedSitemapService

# Class: DisconnectedSitemapService

[services/disconnected-sitemap-service](/docs/nextjs/ref/modules/services_disconnected_sitemap_service).DisconnectedSitemapService

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/services_disconnected_sitemap_service/disconnectedsitemapservice#constructor)

### Methods

- [fetchExportSitemap](/docs/nextjs/ref/classes/services_disconnected_sitemap_service/disconnectedsitemapservice#fetchexportsitemap)

## Constructors

### constructor

• **new DisconnectedSitemapService**(`manifest`)

Provides ability to generate sitemap using manifest.
Sitemap can be used for `next export`
You can use `sitecore/manifest/sitecore-import.json` as manifest

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manifest` | [`ManifestInstance`](/docs/nextjs/ref/interfaces/index/manifestinstance) | manifest instance |

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(): [`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]

Generates sitemap which could be used for generation of static pages during `next export` in disconnected mode.
Since i18n is not supported, the output paths will not include a `locale` property.

#### Returns

[`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]
