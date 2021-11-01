[@sitecore-jss/sitecore-jss-nextjs](../README.md) / EditingDataServiceConfig

# Interface: EditingDataServiceConfig

## Table of contents

### Properties

- [apiRoute](EditingDataServiceConfig.md#apiroute)
- [dataFetcher](EditingDataServiceConfig.md#datafetcher)

## Properties

### apiRoute

• `Optional` **apiRoute**: `string`

The Next.js API route to invoke.
This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
This endpoint should run the `EditingDataMiddleware`.

**`default`** '/api/editing/data/[key]'

**`see`** EditingDataMiddleware

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:16](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L16)

___

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](../classes/AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:22](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L22)
