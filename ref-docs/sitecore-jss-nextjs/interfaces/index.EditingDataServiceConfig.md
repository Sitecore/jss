[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / EditingDataServiceConfig

# Interface: EditingDataServiceConfig

[index](../modules/index.md).EditingDataServiceConfig

## Table of contents

### Properties

- [apiRoute](index.EditingDataServiceConfig.md#apiroute)
- [dataFetcher](index.EditingDataServiceConfig.md#datafetcher)

## Properties

### apiRoute

• `Optional` **apiRoute**: `string`

The Next.js API route to invoke.
This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
This endpoint should run the `EditingDataMiddleware`.

**`default`** '/api/editing/data/[key]'

**`see`** EditingDataMiddleware

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:16](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L16)

___

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](../classes/index.AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:22](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L22)
