---
name: editingdataserviceconfig
routeTemplate: ./data/component-templates/article.yml
title: editingdataserviceconfig
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [services/editing-data-service](/docs/nextjs/ref/modules/services_editing_data_service) / EditingDataServiceConfig

# Interface: EditingDataServiceConfig

[services/editing-data-service](/docs/nextjs/ref/modules/services_editing_data_service).EditingDataServiceConfig

## Table of contents

### Properties

- [apiRoute](/docs/nextjs/ref/interfaces/services_editing_data_service/editingdataserviceconfig#apiroute)
- [dataFetcher](/docs/nextjs/ref/interfaces/services_editing_data_service/editingdataserviceconfig#datafetcher)

## Properties

### apiRoute

• `Optional` **apiRoute**: `string`

The Next.js API route to invoke.
This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
This endpoint should run the `EditingDataMiddleware`.

**`default`** '/api/editing/data/[key]'

**`see`** EditingDataMiddleware

___

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](/docs/nextjs/ref/classes/index/axiosdatafetcher)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher
