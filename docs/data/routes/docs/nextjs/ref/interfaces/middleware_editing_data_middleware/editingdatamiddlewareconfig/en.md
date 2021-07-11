---
name: editingdatamiddlewareconfig
routeTemplate: ./data/component-templates/article.yml
title: editingdatamiddlewareconfig
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [middleware/editing-data-middleware](/docs/nextjs/ref/modules/middleware_editing_data_middleware) / EditingDataMiddlewareConfig

# Interface: EditingDataMiddlewareConfig

[middleware/editing-data-middleware](/docs/nextjs/ref/modules/middleware_editing_data_middleware).EditingDataMiddlewareConfig

## Table of contents

### Properties

- [dynamicRouteKey](/docs/nextjs/ref/interfaces/middleware_editing_data_middleware/editingdatamiddlewareconfig#dynamicroutekey)
- [editingDataCache](/docs/nextjs/ref/interfaces/middleware_editing_data_middleware/editingdatamiddlewareconfig#editingdatacache)

## Properties

### dynamicRouteKey

• `Optional` **dynamicRouteKey**: `string`

The Next.js dynamic API route key name. This is used in the middleware to extract the data
key from the request query parameters. By default this is 'key' (from '/api/editing/data/[key]').

**`default`** 'key'

___

### editingDataCache

• `Optional` **editingDataCache**: [`EditingDataCache`](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache)

An instance of the `EditingDataCache` implementation to use.
Note for Vercel deployment, which uses Serverless Functions for API routes, a disk cache is required.
By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).

**`default`** editingDataDiskCache

**`see`** EditingDataCache

**`see`** EditingDataDiskCache
