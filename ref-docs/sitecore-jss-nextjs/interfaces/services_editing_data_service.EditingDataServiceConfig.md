[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [services/editing-data-service](../modules/services_editing_data_service.md) / EditingDataServiceConfig

# Interface: EditingDataServiceConfig

[services/editing-data-service](../modules/services_editing_data_service.md).EditingDataServiceConfig

## Table of contents

### Properties

- [apiRoute](services_editing_data_service.EditingDataServiceConfig.md#apiroute)
- [dataFetcher](services_editing_data_service.EditingDataServiceConfig.md#datafetcher)

## Properties

### apiRoute

• `Optional` **apiRoute**: `string`

The Next.js API route to invoke.
This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
This endpoint should run the `EditingDataMiddleware`.

**`default`** '/api/editing/data/[key]'

**`see`** EditingDataMiddleware

#### Defined in

[src/services/editing-data-service.ts:15](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L15)

___

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](../classes/index.AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher

#### Defined in

[src/services/editing-data-service.ts:21](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L21)
